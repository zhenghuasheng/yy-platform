package com.order.web.service;

import com.etong.pt.utility.PtResult;
import com.order.common.UserMoneyBusiType;
import com.order.data.model.UserMoney;
import com.order.server.UserMoneyServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by zhenghuasheng on 2016/6/19.
 */
@Service
public class UserMoneyService {
    @Autowired
    private UserMoneyServer userMoneyServer;


    /**
     * 充值（加积分）
     * @param record
     * @return
     */
    public PtResult recharge(UserMoney record){
        record.setBusiType(UserMoneyBusiType.BUSITYPE_RECHARGE);
        return userMoneyServer.addUserMoneyInfo(record);
    }

    /***
     * 返款
     * @param record
     * @return
     */
    public PtResult charge(UserMoney record){
        record.setBusiType(UserMoneyBusiType.BUSITYPE_CHARGE);
        return userMoneyServer.addUserMoneyInfo(record);
    }
}
