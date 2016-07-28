package com.order.web.controller;

import com.etong.pt.utility.PtCommonError;
import com.etong.pt.utility.PtResult;
import com.order.data.model.TaskInfo;
import com.order.web.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

/**
 * Created by zhenghuasheng on 2016/7/2.
 */
@Controller
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @RequestMapping("/add.do")
    @ResponseBody
    public PtResult addTaskInfo(TaskInfo taskInfo) throws TimeoutException, IOException {
        if (taskInfo.getCreatorId() == null || taskInfo.getTaskNum() == null ||taskInfo.getTaskPrice() == null) {
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER, PtCommonError.PT_ERROR_PARAMETER.getMessage(), null);
        }
        if (taskInfo.getTaskPrice().doubleValue() * 100 < taskInfo.getTaskNum()) {
            return new PtResult(PtCommonError.PT_ERROR_SUBMIT,"金额错误",null);
        }
        return taskService.addTaskInfo(taskInfo);
    }

    @RequestMapping("/click.do")
    @ResponseBody
    public PtResult clickTaskInfo(Long userId,Long taskId) {
        if (userId == null || taskId == null){
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER, PtCommonError.PT_ERROR_PARAMETER.getMessage(), null);
        }
        return taskService.clickTaskInfo(userId,taskId);

    }

    @ResponseBody
    @RequestMapping("/list.do")
    public PtResult getClickedTaskInfo(Long taskId){
        if (taskId == null){
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER, PtCommonError.PT_ERROR_PARAMETER.getMessage(), null);
        }
        return taskService.getClickedTaskDetailInfo(taskId);
    }

}
