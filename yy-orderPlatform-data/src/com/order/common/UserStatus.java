package com.order.common;

/**
 * Created by zhenghuasheng on 2016/5/28.
 */
public enum UserStatus {
    AVAILABLE("正常使用", 0),
    FORBIDDEN("禁用", 1);




    private String message;
    private Integer status;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    UserStatus(String message, Integer status) {
        this.message = message;
        this.status = status;
    }

    UserStatus() {
    }
}
