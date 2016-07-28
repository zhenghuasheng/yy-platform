package com.order.server.impl;

import com.etong.pt.utility.PtCommonError;
import com.etong.pt.utility.PtResult;
import com.google.code.ssm.api.ParameterDataUpdateContent;
import com.google.code.ssm.api.ParameterValueKeyProvider;
import com.google.code.ssm.api.ReadThroughSingleCache;
import com.google.code.ssm.api.UpdateSingleCache;
import com.order.data.mapper.UserIntegrateExample;
import com.order.data.mapper.UserIntegrateMapper;
import com.order.data.model.UserIntegrate;
import com.order.server.UserIntegrateServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

/**
 * Created by zhenghuasheng on 2016/6/19.
 */
@Service("userIntegrateServer")
public class UserIntegrateServerImpl implements UserIntegrateServer {
    private static final String USERINTEGRATE_CACHE_NAMESPACE = "user_integrate_cache";

    @Autowired
    private UserIntegrateMapper userIntegrateMapper;
    @Override
    public PtResult addUserIntegrate(UserIntegrate record) {
        int result =  userIntegrateMapper.insertSelective(record);
        if (result < 1){
            return new PtResult(PtCommonError.PT_ERROR_SUBMIT,PtCommonError.PT_ERROR_SUBMIT.getMessage(),null);
        }
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,null,result);
    }

    @Override
//    @ReadThroughSingleCache(namespace = USERINTEGRATE_CACHE_NAMESPACE,expiration = 3600)
    public PtResult getUserIntegrateByUserId( Long userId) {
        UserIntegrateExample example = new UserIntegrateExample();
        example.or().andUserIdEqualTo(userId);
        List<UserIntegrate> result = userIntegrateMapper.selectByExample(example);
        if (CollectionUtils.isEmpty(result)) {
            return new PtResult(PtCommonError.PT_ERROR_NODATA, PtCommonError.PT_ERROR_NODATA.getMessage(),userId);
        }
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,null,result.get(0));
    }

    @Override
    public PtResult updateIntegrate( UserIntegrate record) {
        int result = userIntegrateMapper.updateByPrimaryKeySelective(record);
        if (result < 1){
            return new PtResult(PtCommonError.PT_ERROR_SUBMIT,PtCommonError.PT_ERROR_SUBMIT.getMessage(),null);
        }
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,null,result);
    }
}
