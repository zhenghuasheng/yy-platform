package com.order.web.interceptor;


import org.apache.http.HttpStatus;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControlleRassist {

    public static void resposeOption(HttpServletResponse res) {
        res.setHeader("access-control-allow-headers"
                , "Content-Type, Content-Range, Content-Disposition, X-Requested-With");
        res.setHeader("access-control-allow-methods"
                , "OPTIONS, HEAD, GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Origin", "*");

        try {
            res.sendError(HttpStatus.SC_OK);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
    public static void responseHelper(HttpServletResponse res) {
        res.setContentType("application/json;charset=utf8");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers"
                , "Content-Type, Content-Range, Content-Disposition, X-Requested-With");
    }
}