package com.order.data.mapper;

import com.order.data.model.UserMoney;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMoneyMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_user_money_log
     *
     * @mbggenerated Sun Jun 19 11:29:15 CST 2016
     */
    int countByExample(UserMoneyExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_user_money_log
     *
     * @mbggenerated Sun Jun 19 11:29:15 CST 2016
     */
    int deleteByExample(UserMoneyExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_user_money_log
     *
     * @mbggenerated Sun Jun 19 11:29:15 CST 2016
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_user_money_log
     *
     * @mbggenerated Sun Jun 19 11:29:15 CST 2016
     */
    int insert(UserMoney record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_user_money_log
     *
     * @mbggenerated Sun Jun 19 11:29:15 CST 2016
     */
    int insertSelective(UserMoney record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_user_money_log
     *
     * @mbggenerated Sun Jun 19 11:29:15 CST 2016
     */
    List<UserMoney> selectByExample(UserMoneyExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_user_money_log
     *
     * @mbggenerated Sun Jun 19 11:29:15 CST 2016
     */
    UserMoney selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_user_money_log
     *
     * @mbggenerated Sun Jun 19 11:29:15 CST 2016
     */
    int updateByExampleSelective(@Param("record") UserMoney record, @Param("example") UserMoneyExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_user_money_log
     *
     * @mbggenerated Sun Jun 19 11:29:15 CST 2016
     */
    int updateByExample(@Param("record") UserMoney record, @Param("example") UserMoneyExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_user_money_log
     *
     * @mbggenerated Sun Jun 19 11:29:15 CST 2016
     */
    int updateByPrimaryKeySelective(UserMoney record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_user_money_log
     *
     * @mbggenerated Sun Jun 19 11:29:15 CST 2016
     */
    int updateByPrimaryKey(UserMoney record);
}