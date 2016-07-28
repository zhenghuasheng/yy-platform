package com.order.server.impl;

import com.etong.pt.utility.PtCommonError;
import com.etong.pt.utility.PtResult;
import com.google.code.ssm.Cache;
import com.google.code.ssm.api.format.SerializationType;
import com.google.code.ssm.providers.CacheException;
import com.order.common.TaskStatusConstant;
import com.order.data.mapper.*;
import com.order.data.model.TaskDetail;
import com.order.data.model.TaskInfo;
import com.order.data.model.User;
import com.order.data.model.UserIntegrate;
import com.order.server.TaskServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.TimeoutException;

/**
 * Created by zhenghuasheng on 2016/7/1.
 */
@Service("taskServer")
public class TaskServerImpl implements TaskServer {
    @Autowired
    private TaskInfoMapper taskInfoMapper;
    @Autowired
    private TaskDetailMapper taskDetailMapper;
    @Autowired
    private Cache defaultMemcachedClient;
    @Autowired
    private UserIntegrateMapper userIntegrateMapper;
    @Autowired
    private UserMapper userMapper;

    private Logger logger  = LoggerFactory.getLogger(TaskServerImpl.class);
    @Override
    @Transactional
    public PtResult addTaskInfo(TaskInfo taskInfo){
        /**检查积分是否足够产生task**/
        UserIntegrateExample userIntegrateExample = new UserIntegrateExample();
        userIntegrateExample.or().andUserIdEqualTo(taskInfo.getCreatorId());
        List<UserIntegrate> integrates = userIntegrateMapper.selectByExample(userIntegrateExample);
        if (CollectionUtils.isEmpty(integrates)) {
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER,"积分不足，请确认",null);
        }
        UserIntegrate userIntegrate = integrates.get(0);
        if (userIntegrate.getUserIntegrate() < taskInfo.getTaskPrice().doubleValue()) {
            return new PtResult(PtCommonError.PT_ERROR_PARAMETER,"积分不足，请确认",null);
        }
        /**扣除积分**/
        Double tt = userIntegrate.getUserIntegrate()  - taskInfo.getTaskPrice().doubleValue();
        userIntegrate.setUserIntegrate(tt);
        userIntegrateMapper.updateByPrimaryKeySelective(userIntegrate);
        /**生成任务记录**/
        taskInfo.setCreateTime(new Date());
        taskInfo.setTaskStatus(TaskStatusConstant.TASK_INIT);
        taskInfo.setRemainNum(taskInfo.getTaskNum());
        taskInfoMapper.insertSelective(taskInfo);
        /**生成任务明细记录**/
        Double totalPrice = taskInfo.getTaskPrice().doubleValue() * 100;
        Integer totalNum = taskInfo.getTaskNum();

        TaskDetail taskDetail = new TaskDetail();
        taskDetail.setTaskId(taskInfo.getId());
        int temp = 0;
        Random random = new Random();
        for (int i = 1;i<totalNum;i++ ){
            int price = 0;
            if (totalNum == totalPrice.intValue()) {
                price = (int) (totalPrice/totalNum);
                taskDetail.setPrice(new BigDecimal(new Double(price)/100).setScale(2,BigDecimal.ROUND_HALF_UP));
            }else {
                price = random.nextInt(totalPrice.intValue()- totalNum - temp);
                temp = temp + price;
                taskDetail.setPrice(new BigDecimal(new Double(price + 1)/100).setScale(2,BigDecimal.ROUND_HALF_UP));
            }

            taskDetailMapper.insertSelective(taskDetail);
        }
        taskDetail.setPrice(new BigDecimal((totalPrice -totalNum -temp + 1)/100).setScale(2,BigDecimal.ROUND_HALF_UP) );
        taskDetailMapper.insertSelective(taskDetail);
        /**获取任务明细列表**/
        TaskDetailExample example = new TaskDetailExample();
        example.or().andTaskIdEqualTo(taskInfo.getId());
        List<TaskDetail> details = taskDetailMapper.selectByExample(example);
        if (CollectionUtils.isEmpty(details)){
            return new PtResult(PtCommonError.PT_ERROR_NODATA,null,null);
        }
        taskInfo.setDetails(details);
        /**将任务包含任务明细放入缓存**/
        try {
            defaultMemcachedClient.set("task:"+taskInfo.getId(),24 * 3600, taskInfo,SerializationType.PROVIDER);
        } catch (TimeoutException e) {
            logger.error("cache error,errorMessage:{}",e.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_DB,e.getMessage(),null);
        } catch (CacheException e) {
            logger.error("cache error,errorMessage:{}",e.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_DB,e.getMessage(),null);
        }
        taskInfo.setDetails(null);
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,PtCommonError.PT_ERROR_SUCCESS.getMessage(),taskInfo);
    }

    @Override
    @Transactional
    public PtResult clickTaskInfo(Long userId,Long taskId) {
        TaskDetail taskDetail = null;
        try {
            TaskInfo taskInfo = defaultMemcachedClient.get("task:"+taskId, SerializationType.PROVIDER);
            if (taskInfo == null) {
                taskInfo = taskInfoMapper.selectByPrimaryKey(taskId);
                TaskDetailExample example = new TaskDetailExample();
                example.or().andTaskIdEqualTo(taskId);
                List<TaskDetail> details = taskDetailMapper.selectByExample(example);
                taskInfo.setDetails(details);
            }
            List<TaskDetail> details = taskInfo.getDetails();

            for (TaskDetail detail : details){
                if (detail.getUserId() == null && detail.getCreateTime() == null){
                    detail.setCreateTime(new Date());
                    detail.setUserId(userId);

                    User user = userMapper.selectByPrimaryKey(userId);
                    detail.setUserName(user.getUserName());
                    taskDetail = detail;
                    break;
                }else {
                    if (detail.getUserId().equals(userId)) {
                        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,taskInfo.getTaskStatus(),detail);
                    }
                }
            }
            if (taskDetail == null || taskInfo.getRemainNum() == 0){
                /**task被执行完毕**/
                taskInfo.setTaskStatus(TaskStatusConstant.TASK_OVER);
                taskInfoMapper.updateByPrimaryKeySelective(taskInfo);
                return new PtResult(PtCommonError.PT_ERROR_SUBMIT,TaskStatusConstant.TASK_OVER,taskId);
            }

            /**更新task为执行中**/
            taskInfo.setTaskStatus(TaskStatusConstant.TASK_RUN);
            taskInfo.setRemainNum(taskInfo.getRemainNum() -1);
            taskInfoMapper.updateByPrimaryKeySelective(taskInfo);
            taskDetailMapper.updateByPrimaryKeySelective(taskDetail);
            taskInfo.setDetails(details);
            defaultMemcachedClient.set("task:"+taskId,24 * 3600, taskInfo,SerializationType.PROVIDER);

            /**存入用户剩余积分**/
            UserIntegrateExample example = new UserIntegrateExample();
            example.or().andUserIdEqualTo(userId);
            List<UserIntegrate> integrates = userIntegrateMapper.selectByExample(example);
            if (CollectionUtils.isEmpty(integrates)) {
                UserIntegrate userIntegrate = new UserIntegrate();
                userIntegrate.setUserId(userId);
                userIntegrate.setUserIntegrate(taskDetail.getPrice().doubleValue());
            }else {
                UserIntegrate userIntegrate = integrates.get(0);
                userIntegrate.setUserIntegrate(userIntegrate.getUserIntegrate() + taskDetail.getPrice().doubleValue());
                userIntegrateMapper.updateByPrimaryKeySelective(userIntegrate);
            }

        } catch (TimeoutException e) {
            logger.error("cache error,errorMessage:{}",e.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_DB,e.getMessage(),null);
        } catch (CacheException e) {
            logger.error("cache error,errorMessage:{}",e.getMessage());
            return new PtResult(PtCommonError.PT_ERROR_DB,e.getMessage(),null);
        }
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,null,taskDetail);
    }

    @Override
    @Transactional
    public PtResult getClickedTaskInfo(Long taskId) {
        TaskInfo taskInfo = taskInfoMapper.selectByPrimaryKey(taskId);
       Map<String,Object> params = new HashMap<>();
        params.put("taskId",taskId);
        List<TaskDetail> list = taskDetailMapper.getClickedTaskDetailInfo(params);
        taskInfo.setDetails(list);
        return new PtResult(PtCommonError.PT_ERROR_SUCCESS,null,taskInfo);
    }
}
