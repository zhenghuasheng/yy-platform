package com.order.server;

import com.etong.pt.utility.PtResult;
import com.google.code.ssm.providers.CacheException;
import com.order.data.model.TaskInfo;

import java.util.concurrent.TimeoutException;

/**
 * Created by zhenghuasheng on 2016/7/1.
 */
public interface TaskServer {
    PtResult addTaskInfo(TaskInfo taskInfo);
    PtResult clickTaskInfo(Long userId,Long taskId);
    PtResult getClickedTaskInfo(Long taskId);
}
