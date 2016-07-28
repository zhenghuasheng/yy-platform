package com.order.server.impl;

import com.etong.pt.utility.PtCommonError;
import com.etong.pt.utility.PtResult;
import com.google.code.ssm.Cache;
import com.google.code.ssm.api.format.SerializationType;
import com.google.code.ssm.providers.CacheException;
import com.order.data.model.TokenParam;
import com.order.server.AuthServer;
import org.apache.commons.lang.StringUtils;
import org.jose4j.jwk.JsonWebKey;
import org.jose4j.jwk.RsaJsonWebKey;
import org.jose4j.jwk.RsaJwkGenerator;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.jwt.consumer.JwtContext;
import org.jose4j.lang.JoseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeoutException;

/**
 * Created by zhenghuasheng on 2016/5/28.
 */
@Service("authServer")
public class AuthServerImpl implements AuthServer {
    public static final String CLAIMS_EXTRA_DATA = "extraData";
    public static final String CLAIMS_USER_ID = "userId";
    public static final String CLAIMS_SYSTEM_ID = "systemId";
    public static final String CLAIMS_ISSUER  = "issuer";
    public static final String CATEGORY_RESOURCE = "RESOURCE";
    public static final String CATEGORY_ROLE = "ROLE";
    public static final String CATEGORY_USERROLE = "USERROLE";
    public static final String CATEGORY_ROLERESOURCE = "ROLERESOURCE";
    public static final String CATEGORY_AUTH = "AUTH";
    private static Logger logger = LoggerFactory.getLogger(AuthServerImpl.class);
    @Autowired
    private Cache defaultMemcachedClient;

    @Override
    public PtResult createToken(TokenParam tokenParam) {
        String issuer = tokenParam.getIssuer();
        PtResult ptResult = createJsonWebKey(issuer);

        if (!ptResult.isSucceed()) {
            logger.error("创建令牌密钥失败, param:{}, result:{}", tokenParam.toString(), ptResult.toString());
            return ptResult;
        }

        RsaJsonWebKey rsaJsonWebKey = ptResult.getObject();
        // Create the Claims, which will be the content of the JWT
        JwtClaims claims = new JwtClaims();
        claims.setIssuer(issuer);  // who creates the token and signs it
        claims.setAudience(tokenParam.getAudience()); // to whom the token is intended to be sent
        claims.setExpirationTimeMinutesInTheFuture(tokenParam.getExpireTime()); // time when the token will expire (10 minutes from now)
        claims.setGeneratedJwtId(); // a unique identifier for the token
        claims.setIssuedAtToNow();  // when the token was issued/created (now)
//        claims.setNotBeforeMinutesInThePast(2); // time before which the token is not yet valid (2 minutes ago)
        claims.setSubject(tokenParam.getSubject()); // the subject/principal is whom the token is about
        claims.setClaim(CLAIMS_EXTRA_DATA, tokenParam.getExtraData());
        claims.setClaim(CLAIMS_USER_ID, tokenParam.getUserId());
        claims.setClaim(CLAIMS_SYSTEM_ID, tokenParam.getSystem());
        claims.setClaim(CLAIMS_ISSUER,tokenParam.getIssuer());
        claims.setGeneratedJwtId();

        JsonWebSignature jws = new JsonWebSignature();
        jws.setPayload(claims.toJson());
        jws.setKey(rsaJsonWebKey.getPrivateKey());
        jws.setKeyIdHeaderValue(rsaJsonWebKey.getKeyId());
        jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.RSA_USING_SHA256);

        try {
            String jwt = jws.getCompactSerialization();
            return new PtResult(PtCommonError.PT_ERROR_SUCCESS, null, jwt);
        } catch (JoseException e) {
            logger.error("创建令牌失败：{}", e.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_GEN_TOKEN, "生成令牌错误", null);
        }
    }

    @Override
    public PtResult parseToken(String token) {
        PtResult ptResult = parseJwt(token);

        if (!ptResult.isSucceed()) {
            logger.warn("令牌解析失败:{}", token);
            return ptResult;
        }

        JwtClaims jwtClaims = ptResult.getObject();
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("userId",jwtClaims.getClaimValue(CLAIMS_USER_ID));
        resultMap.put("systemId",jwtClaims.getClaimValue(CLAIMS_SYSTEM_ID));
        resultMap.put("phone",jwtClaims.getClaimValue(CLAIMS_ISSUER));
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS, null, resultMap);
    }

    private PtResult createJsonWebKey(String issuer) {
        if (StringUtils.isEmpty(issuer)) {
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER, null, null);
        }

        try {
            String jwkjson = defaultMemcachedClient.get(issuer, SerializationType.PROVIDER);
            if (StringUtils.isNotEmpty(jwkjson)) {
                RsaJsonWebKey rsaJsonWebKey = (RsaJsonWebKey) JsonWebKey.Factory.newJwk(jwkjson);
                return new PtResult(PtCommonError.PT_ERROR_SUCCESS, null, rsaJsonWebKey);
            } else {
                RsaJsonWebKey rsaJsonWebKey = RsaJwkGenerator.generateJwk(2048);
                rsaJsonWebKey.setKeyId(issuer);
                defaultMemcachedClient.set(issuer, 3600,rsaJsonWebKey.toJson(
                        JsonWebKey.OutputControlLevel.INCLUDE_PRIVATE),SerializationType.PROVIDER);
                return new PtResult(PtCommonError.PT_ERROR_SUCCESS, null, rsaJsonWebKey);
            }
        } catch (TimeoutException e1) {
            logger.error("解析令牌密钥失败:{}", e1.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_JSON_PARSE, "密钥解析失败", null);
        } catch (CacheException e1) {
            logger.error("解析令牌密钥失败:{}", e1.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_JSON_PARSE, "密钥解析失败", null);
        } catch (JoseException e1) {
            logger.error("解析令牌密钥失败:{}", e1.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_JSON_PARSE, "密钥解析失败", null);
        }
    }
    private PtResult parseJwt(String jwt) {
        // Build a JwtConsumer that doesn't check signatures or do any validation.
        JwtConsumer firstPassJwtConsumer = new JwtConsumerBuilder()
                .setSkipAllValidators()
                .setDisableRequireSignature()
                .setSkipSignatureVerification()
                .build();

        try {
            JwtContext jwtContext = firstPassJwtConsumer.process(jwt);
            JwtClaims jwtClaims = jwtContext.getJwtClaims();
            jwtClaims.setExpirationTimeMinutesInTheFuture(10);//TODO
            String issuer = jwtClaims.getIssuer();

            String jwkjson = defaultMemcachedClient.get(issuer,SerializationType.PROVIDER);
            if (StringUtils.isEmpty(jwkjson)){
                logger.warn("令牌验证失败");
                return new PtResult(PtCommonError.PT_ERROR_VERIFY_TOKEN, "令牌验证失败", null);
            }
            JsonWebKey jwk = JsonWebKey.Factory.newJwk(jwkjson);
            JwtConsumerBuilder consumerBuilder = new JwtConsumerBuilder()
                    .setExpectedIssuer(jwtClaims.getIssuer())
                    .setVerificationKey(jwk.getKey())
                    .setRequireExpirationTime()
                    .setAllowedClockSkewInSeconds(30);
            List<String> audienceList = jwtClaims.getAudience();

            if ((audienceList != null) && !audienceList.isEmpty()) {
                consumerBuilder.setExpectedAudience(audienceList.get(0));
            }

            JwtConsumer jwtConsumer = consumerBuilder.build();
            // Finally using the second JwtConsumer to actually validate the JWT. This operates on
            // the JwtContext from the first processing pass, which avoids redundant parsing/processing.
            jwtConsumer.processContext(jwtContext);
            return new PtResult(PtCommonError.PT_ERROR_SUCCESS, null, jwtClaims);
        } catch (InvalidJwtException e) {
            logger.warn("令牌验证失败：{}", e.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_VERIFY_TOKEN, "令牌验证失败", null);
        } catch (MalformedClaimException e) {
            logger.error("令牌数据异常：{}", e.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_VERIFY_TOKEN, "令牌数据解析错误", null);
        } catch (JoseException e) {
            logger.error("令牌验证异常：{}", e.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_VERIFY_TOKEN, "令牌无法解析", null);
        } catch (TimeoutException e) {
            logger.error("令牌验证异常：{}", e.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_VERIFY_TOKEN, "令牌无法解析", null);
        } catch (CacheException e) {
            logger.error("令牌验证异常：{}", e.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_VERIFY_TOKEN, "令牌无法解析", null);
        }
    }
}
