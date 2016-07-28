package com.order.web.service;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.etong.pt.utility.PtCommonError;
import com.etong.pt.utility.PtResult;
import com.order.data.model.TaskInfo;
import com.order.data.model.User;
import com.order.data.model.UserIntegrate;
import com.order.server.TaskServer;
import com.order.server.UserIntegrateServer;
import com.order.server.UserServer;
import com.order.web.interceptor.WebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;

/**
 * Created by zhenghuasheng on 2016/7/2.
 */
@Service
public class TaskService {
    private static final String defaultTaskName = "平台游戏，恭喜发财！";

    @Autowired
    private TaskServer taskServer;
    @Autowired
    private UserServer userServer;
    @Autowired
    private WebSocketHandler webSocketHandler;

    public PtResult addTaskInfo(TaskInfo taskInfo) throws IOException {
        if (StringUtils.isEmpty(taskInfo.getTaskName())) {
            taskInfo.setTaskName(defaultTaskName);
        }
        PtResult ptResult = taskServer.addTaskInfo(taskInfo);
        if (!ptResult.isSucceed()) {
            return ptResult;
        }
        TaskInfo content = ptResult.getObject();
        JSONObject messageBody = new JSONObject();
        messageBody.put("content",content);
        messageBody.put("userId", taskInfo.getCreatorId());
        PtResult userResult = userServer.getUserBykey(taskInfo.getCreatorId());
        if (userResult.isSucceed()){
            User user = userResult.getObject();
            messageBody.put("userName",user.getUserName());
            messageBody.put("userChat",user.getUserWchat());
        }
        webSocketHandler.sendMessageToUser(new TextMessage(messageBody.toJSONString()));
        return ptResult;
    }

    public PtResult clickTaskInfo(Long userId, Long taskId) {
        return taskServer.clickTaskInfo(userId, taskId);
    }

    public PtResult getClickedTaskDetailInfo(Long taskId ){
        return taskServer.getClickedTaskInfo(taskId);
    }
}
