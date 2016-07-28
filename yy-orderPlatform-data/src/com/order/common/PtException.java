package com.order.common;

/**
 * Created by zhenghuasheng on 2016/5/29.
 */
public class PtException extends RuntimeException{

    public PtException(String message, Throwable cause) {
        super(message, cause);
    }

    public PtException(String message) {
        super(message);
    }

    public PtException() {
    }
}
