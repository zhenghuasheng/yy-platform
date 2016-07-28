package com.order.data.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class TaskInfo implements Serializable{
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_task.id
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    private Long id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_task.task_name
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    private String taskName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_task.task_price
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    private BigDecimal taskPrice;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_task.task_num
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    private Integer taskNum;

    private Integer remainNum;
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_task.task_status
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    private String taskStatus;
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_task.creator_id
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    private Long creatorId;
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_task.create_time
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    private Date createTime;
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_task.remark
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    private String remark;
    private List<TaskDetail> details;

    public Integer getRemainNum() {
        return remainNum;
    }

    public void setRemainNum(Integer remainNum) {
        this.remainNum = remainNum;
    }

    public List<TaskDetail> getDetails() {
        return details;
    }

    public void setDetails(List<TaskDetail> details) {
        this.details = details;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_task.id
     *
     * @return the value of tb_task.id
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public Long getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_task.id
     *
     * @param id the value for tb_task.id
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_task.task_name
     *
     * @return the value of tb_task.task_name
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public String getTaskName() {
        return taskName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_task.task_name
     *
     * @param taskName the value for tb_task.task_name
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public void setTaskName(String taskName) {
        this.taskName = taskName == null ? null : taskName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_task.task_price
     *
     * @return the value of tb_task.task_price
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public BigDecimal getTaskPrice() {
        return taskPrice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_task.task_price
     *
     * @param taskPrice the value for tb_task.task_price
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public void setTaskPrice(BigDecimal taskPrice) {
        this.taskPrice = taskPrice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_task.task_num
     *
     * @return the value of tb_task.task_num
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public Integer getTaskNum() {
        return taskNum;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_task.task_num
     *
     * @param taskNum the value for tb_task.task_num
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public void setTaskNum(Integer taskNum) {
        this.taskNum = taskNum;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_task.task_status
     *
     * @return the value of tb_task.task_status
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public String getTaskStatus() {
        return taskStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_task.task_status
     *
     * @param taskStatus the value for tb_task.task_status
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus == null ? null : taskStatus.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_task.creator_id
     *
     * @return the value of tb_task.creator_id
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public Long getCreatorId() {
        return creatorId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_task.creator_id
     *
     * @param creatorId the value for tb_task.creator_id
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_task.create_time
     *
     * @return the value of tb_task.create_time
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_task.create_time
     *
     * @param createTime the value for tb_task.create_time
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_task.remark
     *
     * @return the value of tb_task.remark
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public String getRemark() {
        return remark;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_task.remark
     *
     * @param remark the value for tb_task.remark
     *
     * @mbggenerated Fri Jul 01 20:42:28 CST 2016
     */
    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}