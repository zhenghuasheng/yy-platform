package com.order.web.controller;

import com.alibaba.dubbo.rpc.RpcException;
import com.alibaba.fastjson.JSONException;
import com.etong.pt.utility.PtCommonError;
import com.etong.pt.utility.PtResult;
import com.order.common.PtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Administrator on 2015/4/29.
 */
@ControllerAdvice
public class SystemHandlerExceptionResolver {

    private Logger logger = LoggerFactory.getLogger(SystemHandlerExceptionResolver.class);

    @ExceptionHandler
    @ResponseBody
    public PtResult ptExceptionRequest(HttpServletResponse response, Exception exception) {
        PtResult ptResult = null;
        if (exception instanceof PtException) {
            ptResult = new PtResult(PtCommonError.PT_ERROR_GEN_TOKEN, exception.getMessage(), null);
        } else if (exception instanceof SQLException) {
            ptResult = new PtResult(PtCommonError.PT_ERROR_DB, PtCommonError.PT_ERROR_DB.getMessage(), null);
        } else if (exception instanceof JSONException) {
            ptResult = new PtResult(PtCommonError.PT_ERROR_JSON_PARSE, PtCommonError.PT_ERROR_JSON_PARSE.getMessage(), null);
        } else if (exception instanceof RpcException) {
            ptResult = new PtResult(PtCommonError.PT_ERROR_RPC, PtCommonError.PT_ERROR_RPC.getMessage(), null);
        } else {
            ptResult = new PtResult(PtCommonError.PT_ERROR_UNKOWN, PtCommonError.PT_ERROR_UNKOWN.getMessage() + "---" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS").format(new Date()), null);
        }
        logger.error("error:{}", exception.getMessage());
        response.setStatus(HttpStatus.EXPECTATION_FAILED.value());
        return ptResult;
    }
}
