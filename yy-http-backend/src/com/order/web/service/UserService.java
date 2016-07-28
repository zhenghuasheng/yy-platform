package com.order.web.service;

import com.etong.pt.utility.PtCommonError;
import com.etong.pt.utility.PtResult;
import com.order.data.model.TokenParam;
import com.order.data.model.User;
import com.order.server.AuthServer;
import com.order.server.UserServer;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by zhenghuasheng on 2016/5/29.
 */

@Service
public class UserService {

    @Autowired
    private UserServer userServer;
    @Autowired
    private AuthServer authServer;


    public PtResult addUser(User user){
        String phone = user.getPhone();
        Integer system = user.getSystem();
        if (StringUtils.isEmpty(phone)) {
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER,PtCommonError.PT_ERROR_PARAMETER.getMessage(),null);
        }
        PtResult ptResult = userServer.getUserByPhone(phone,system);
        if (ptResult.isSucceed()){
            return new PtResult(PtCommonError.PT_ERROR_REG_REDUPLICATED,"用户已存在",null);
        }
        return userServer.addUser(user);
    }

    public PtResult getUserById(Long userId){
        return userServer.getUserBykey(userId);
    }

    public PtResult getUserToken(String phone,Integer system){
        if (StringUtils.isEmpty(phone)){
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER,PtCommonError.PT_ERROR_PARAMETER.getMessage(),null);
        }
        PtResult ptResult = userServer.getUserByPhone(phone,system);
        if (!ptResult.isSucceed()) {
            return ptResult;
        }
        List<User> users = ptResult.getObject();
        User user = users.get(0);
        ptResult = authServer.createToken(new TokenParam(user.getPhone(),user.getUserId(),user.getSystem().toString()));
        return ptResult;
    }

    public PtResult userLogin(String phone,String password,Integer system){

        PtResult ptResult = userServer.getUserByPhone(phone,system);
        if (!ptResult.isSucceed()) {
            return ptResult;
        }
        List<User> users = ptResult.getObject();
        User user = users.get(0);

        if (!user.getPassword().equalsIgnoreCase(password)) {
            return new PtResult(PtCommonError.PT_ERROR_PASSWORD,"密码错误",null);
        }
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,null,user);
    }

    public PtResult parseToken(String token){
        PtResult ptResult =  authServer.parseToken(token);
        if (!ptResult.isSucceed()){
            return ptResult;
        }
        Map<String,Object> resultMap = ptResult.getObject();
        ptResult = getUserById((Long) resultMap.get("userId"));
        if (!ptResult.isSucceed()){
            return ptResult;
        }
        User user = ptResult.getObject();
        if (!user.getPhone().equals(resultMap.get("phone")) || !String.valueOf(user.getSystem()).equals(resultMap.get("systemId")) ){
            return new PtResult(PtCommonError.PT_ERROR_VERIFY_TOKEN, PtCommonError.PT_ERROR_VERIFY_TOKEN.getMessage(),null);
        }
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,PtCommonError.PT_ERROR_SUCCESS.getMessage(),user);
    }

    public PtResult getUserList(String phone, String idcard, Integer status, Integer system,Integer pageIndex, Integer pageCount){
        return userServer.getUserList(phone,idcard,status,system,pageIndex,pageCount);
    }

    public PtResult getUserByPhone(String phone, Integer system){
        return userServer.getUserByPhone(phone, system);
    }
    public PtResult updateUser(User user){
        return userServer.updateUser(user);
    }
}
