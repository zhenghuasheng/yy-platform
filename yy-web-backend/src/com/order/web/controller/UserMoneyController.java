package com.order.web.controller;

import com.etong.pt.utility.PtCommonError;
import com.etong.pt.utility.PtResult;
import com.order.data.model.UserMoney;
import com.order.web.service.UserMoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by zhenghuasheng on 2016/6/19.
 */
@Controller
@RequestMapping("/money")
public class UserMoneyController {
    @Autowired
    private UserMoneyService userMoneyService;

    /**
     * 充值
     * @param userMoney
     * @return
     */
    @RequestMapping("/recharge")
    @ResponseBody
    public PtResult recharge(UserMoney userMoney){
        if (userMoney.getUserId() == null || userMoney.getMoney() == null || userMoney.getCreatorId() == null){
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER,PtCommonError.PT_ERROR_PARAMETER.getMessage(),null);
        }
        return userMoneyService.recharge(userMoney);
    }

    /***
     * 返款
     * @param userMoney
     * @return
     */
    @RequestMapping("/charge")
    @ResponseBody
    public PtResult charge(UserMoney userMoney){
        if (userMoney.getUserId() == null || userMoney.getMoney() == null || userMoney.getCreatorId() == null){
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER,PtCommonError.PT_ERROR_PARAMETER.getMessage(),null);
        }
        return userMoneyService.charge(userMoney);
    }


}
