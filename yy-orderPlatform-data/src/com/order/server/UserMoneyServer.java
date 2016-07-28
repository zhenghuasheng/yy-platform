package com.order.server;

import com.etong.pt.utility.PtResult;
import com.order.data.model.UserMoney;

import java.util.Date;

/**
 * Created by zhenghuasheng on 2016/6/19.
 */
public interface UserMoneyServer {
    PtResult addUserMoneyInfo(UserMoney userMoney);
    PtResult getUserMoneyList(Long userId, Integer busiType, Date startDate,Date endDate, Integer pageIndex, Integer pageCount);
}
