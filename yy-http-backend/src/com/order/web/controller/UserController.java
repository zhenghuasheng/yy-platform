package com.order.web.controller;

import com.etong.pt.utility.PtCommonError;
import com.etong.pt.utility.PtResult;
import com.order.data.model.User;
import com.order.web.service.UserService;
import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by zhenghuasheng on 2016/5/28.
 */

@Controller
@RequestMapping("/user")
public class UserController {
    private static final String regExt = "^((13[0-9])|(15[^4,\\D])|(18[0,1-9]))\\d{8}$";

    @Autowired
    private UserService userService;


    @RequestMapping(value = "/register.do" ,method = RequestMethod.POST)
    @ResponseBody
    public PtResult addUser(User user) {
        if (StringUtils.isEmpty(user.getPassword())|| StringUtils.isEmpty(user.getPhone()) || StringUtils.isEmpty(user.getUserName()) || user.getSystem() == null) {
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER, PtCommonError.PT_ERROR_PARAMETER.getMessage(), null);
        }
        return userService.addUser(user);
    }

    @ResponseBody
    @RequestMapping("/get.do")
    public PtResult getUserbyKey(Long userId) {
        if (userId == null) {
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER, PtCommonError.PT_ERROR_PARAMETER.getMessage(), null);
        }
        return userService.getUserById(userId).getObject();
    }

    @ResponseBody
    @RequestMapping("/getbyPhone.do")
    public PtResult getUserbyPhone(String phone, Integer system){
        if (StringUtils.isEmpty(phone) || system == null){
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER, PtCommonError.PT_ERROR_PARAMETER.getMessage(), null);
        }
        return userService.getUserByPhone(phone, system);
    }

    @ResponseBody
    @RequestMapping("/getToken.do")
    public PtResult getUserToken(String phone,Integer system){
        Pattern p = Pattern.compile(regExt);
        Matcher m = p.matcher(phone);
        if (StringUtils.isEmpty(phone) || system == null|| BooleanUtils.isFalse(m.matches())){
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER, "手机号码不正确", null);
        }
        return userService.getUserToken(phone,system);
    }

    @ResponseBody
    @RequestMapping("/login.do")
    public PtResult userLogin(String phone, String password,Integer system){
        if (StringUtils.isEmpty(phone) || StringUtils.isEmpty(password) || system == null){
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER, PtCommonError.PT_ERROR_PARAMETER.getMessage(), null);
        }
        return userService.userLogin(phone,password,system);
    }

    @RequestMapping("/list.do")
    public PtResult getUserList(String phone,String idcard,Integer status,Integer system, Integer pageIndex,Integer pageCount){
        if (pageIndex == null || pageCount == null || system == null){
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER, PtCommonError.PT_ERROR_PARAMETER.getMessage(), null);
        }
        return userService.getUserList(phone,idcard,status,system,pageIndex,pageCount);
    }

    @RequestMapping("/update.do")
    @ResponseBody
    public PtResult updateUser(User user){
        if (user.getUserId() == null) {
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER, PtCommonError.PT_ERROR_PARAMETER.getMessage(), null);
        }
        return userService.updateUser(user);
    }

}
