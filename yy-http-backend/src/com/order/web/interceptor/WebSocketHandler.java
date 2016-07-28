package com.order.web.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.etong.pt.utility.PtResult;
import com.order.data.model.User;
import com.order.web.service.UserService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by zhenghuasheng on 2016/6/19.
 */
@Component
public class WebSocketHandler extends TextWebSocketHandler {
    @Autowired
    private UserService userService;
    private List<WebSocketSession> socketSessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        socketSessions.add(session);
        super.afterConnectionEstablished(session);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String content = (String) message.getPayload();
        String userId = (String) session.getAttributes().get("userId");
        if (StringUtils.isEmpty(content) || StringUtils.isEmpty(userId)) {
            return;
        }
        PtResult ptResult = userService.getUserById(Long.valueOf(userId));
        if (!ptResult.isSucceed()) {
            return;
        }
        User user = ptResult.getObject();
        String userName = user.getUserName();
        String userChat = user.getUserWchat();
        /**封装消息体**/
        JSONObject messageBody = new JSONObject();
        messageBody.put("userName",userName);
        messageBody.put("userChat",userChat);
        messageBody.put("userId",userId);
        messageBody.put("content",content);
        this.sendMessageToUser(new TextMessage(messageBody.toJSONString()));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        socketSessions.remove(session);
        super.afterConnectionClosed(session, status);
    }

    public void sendMessageToUser(TextMessage message) throws IOException {
        Iterator iterator = socketSessions.iterator();
        while(iterator.hasNext()) {
            WebSocketSession session = (WebSocketSession) iterator.next();
            if (session.isOpen()) {
                session.sendMessage(message);
            }
        }
    }
}
