package com.order.server;

import com.etong.pt.utility.PtResult;
import com.order.data.model.UserIntegrate;

/**
 * Created by zhenghuasheng on 2016/6/19.
 */
public interface UserIntegrateServer {
    PtResult addUserIntegrate(UserIntegrate record);
    PtResult getUserIntegrateByUserId(Long userId);
    PtResult updateIntegrate(UserIntegrate record);
}
