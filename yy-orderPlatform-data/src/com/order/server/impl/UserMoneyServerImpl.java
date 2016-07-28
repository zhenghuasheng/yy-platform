package com.order.server.impl;

import com.etong.pt.utility.PtCommonError;
import com.etong.pt.utility.PtResult;
import com.order.common.UserMoneyBusiType;
import com.order.data.mapper.*;
import com.order.data.model.UserIntegrate;
import com.order.data.model.UserMoney;
import com.order.server.UserIntegrateServer;
import com.order.server.UserMoneyServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.Date;
import java.util.List;

/**
 * Created by zhenghuasheng on 2016/6/19.
 */
@Service("userMoneyServer")
public class UserMoneyServerImpl implements UserMoneyServer {
    private static final Logger logger = LoggerFactory.getLogger(UserServerImpl.class);

    @Autowired
    private UserMoneyMapper userMoneyMapper;
    @Autowired
    private UserIntegrateMapper userIntegrateMapper;

    @Override
    @Transactional
    public PtResult addUserMoneyInfo(UserMoney userMoney) {
        /**插入充值记录*/
        userMoney.setCreateTime(new Date());
        try {
            userMoneyMapper.insertSelective(userMoney);
            /**生成积分**/
            Long userId = userMoney.getUserId();
            UserIntegrateExample userIntegrateExample = new UserIntegrateExample();
            userIntegrateExample.or().andUserIdEqualTo(userId);
            List<UserIntegrate> integrates = userIntegrateMapper.selectByExample(userIntegrateExample);
            if (CollectionUtils.isEmpty(integrates)) {

                UserIntegrate userIntegrate = new UserIntegrate(userId, userMoney.getMoney());
                userIntegrateMapper.insertSelective(userIntegrate);
            } else {
                UserIntegrate userIntegrate = integrates.get(0);
                Double integrate = userIntegrate.getUserIntegrate();
                if (UserMoneyBusiType.BUSITYPE_RECHARGE == userMoney.getBusiType()) {
                    userIntegrate.setUserIntegrate(integrate + userMoney.getMoney());
                }else {
                    integrate = integrate - userMoney.getMoney();
                    if (integrate < 0) {
                        return new PtResult(PtCommonError.PT_ERROR_UNKOWN,"积分操作有误",integrate);
                    }
                    userIntegrate.setUserIntegrate(integrate);
                }
                userIntegrateMapper.updateByPrimaryKeySelective(userIntegrate);
            }
            return new PtResult(PtCommonError.PT_ERROR_SUCCESS,null,null);
        } catch (Exception e) {
            logger.error("addUserMoneyInfo error!errorMessage:{}",e.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_DB,e.getMessage(),null);
        }


    }

    @Override
    public PtResult getUserMoneyList(Long userId, Integer busiType, Date startDate, Date endDate, Integer pageIndex, Integer pageCount) {
        UserMoneyExample example = new UserMoneyExample();
        example.setPageIndex((pageIndex - 1) * pageCount);
        example.setPageCount(pageCount);
        UserMoneyExample.Criteria criteria = example.createCriteria();
        criteria.andUserIdEqualTo(userId);
        criteria.andBusiTypeEqualTo(busiType);
        criteria.andCreateTimeBetween(startDate, endDate);
        List<UserMoney> result = userMoneyMapper.selectByExample(example);
        if (CollectionUtils.isEmpty(result)) {
            return new PtResult(PtCommonError.PT_ERROR_NODATA, PtCommonError.PT_ERROR_NODATA.getMessage(), null);
        }
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS, PtCommonError.PT_ERROR_SUCCESS.getMessage(), result);
    }
}
