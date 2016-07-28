package com.order.server;

import com.etong.pt.utility.PtResult;
import com.order.data.model.User;

/**
 * Created by zhenghuasheng on 2016/5/28.
 */
public interface UserServer {
    PtResult addUser(User user);
    PtResult updateUser(User user);
    PtResult getUserBykey(Long userId);
    PtResult getUserByPhone(String phone,Integer system);
    PtResult getUserList(String phone, String idcard, Integer status, Integer system, Integer pageIndex, Integer pageCount);
}
