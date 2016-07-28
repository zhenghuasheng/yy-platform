package com.order.server.impl;

import com.etong.pt.utility.PtCommonError;
import com.etong.pt.utility.PtResult;
import com.google.code.ssm.Cache;
import com.google.code.ssm.api.*;
import com.google.code.ssm.providers.CacheException;
import com.order.common.UserStatus;
import com.order.data.mapper.UserExample;
import com.order.data.mapper.UserMapper;
import com.order.data.model.User;
import com.order.server.UserServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeoutException;

/**
 * Created by zhenghuasheng on 2016/5/28.
 */
@Service("userServer")
public class UserServerImpl implements UserServer {
    private static final String USER_CACHE_NAMESPACE = "user_cache";
    @Autowired
    private UserMapper userMapper;


    @Override
    public PtResult addUser(User user) {
        user.setCreateTime(new Date());
        /**用户初始化状态为可用**/
        user.setStatus(UserStatus.AVAILABLE.getStatus());
        int result = userMapper.insertSelective(user);
        if (result < 1) {
            return new PtResult(PtCommonError.PT_ERROR_SUBMIT, null, null);
        }
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS, null, result);
    }

    @Override
    @InvalidateSingleCache(namespace = USER_CACHE_NAMESPACE)
    public PtResult updateUser(User user) {
        int result = userMapper.updateByPrimaryKeySelective(user);
        if (result < 1) {
            return new PtResult(PtCommonError.PT_ERROR_SUBMIT, null, null);
        }

        return new PtResult(PtCommonError.PT_ERROR_SUCCESS, null, result);
    }

    @Override
    @ReadThroughSingleCache(namespace = USER_CACHE_NAMESPACE, expiration = 3000)
    public PtResult getUserBykey(@ParameterValueKeyProvider Long userId) {
        User user = userMapper.selectByPrimaryKey(userId);
        if (user == null){
            return new PtResult(PtCommonError.PT_ERROR_NODATA,null,userId);
        }
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,null,user);
    }

    @Override
    @ReadThroughSingleCache(namespace = USER_CACHE_NAMESPACE, expiration = 3000)
    public PtResult getUserByPhone(@ParameterValueKeyProvider(order = 0) String phone,@ParameterValueKeyProvider(order = 1) Integer system) {
        UserExample example = new UserExample();
        UserExample.Criteria criteria = example.createCriteria();
        criteria.andPhoneEqualTo(phone);
        criteria.andSystemEqualTo(system);
        List<User> users = userMapper.selectByExample(example);
        if (CollectionUtils.isEmpty(users)) {
            return new PtResult(PtCommonError.PT_ERROR_USER_NOTEXIST,null,phone);
        }

        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,null,users);
    }

    @Override
    public PtResult getUserList(String phone, String idcard, Integer status, Integer system, Integer pageIndex, Integer pageCount) {
        UserExample example = new UserExample();
        example.setOrderByClause("create_time desc");
        example.setPageIndex((pageIndex -1) * pageCount);
        example.setPageCount(pageCount);
        UserExample.Criteria criteria = example.createCriteria();
        criteria.andPhoneEqualTo(phone);
        criteria.andIdcardEqualTo(idcard);
        criteria.andStatusEqualTo(status);
        criteria.andSystemEqualTo(system);

        List<User> users = userMapper.selectByExample(example);
        if (CollectionUtils.isEmpty(users)) {
            return new PtResult(PtCommonError.PT_ERROR_USER_NOTEXIST,null,phone);
        }
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,null,users);
    }
}
