/*
 * File: app/view/EticketGiverulesPanelViewController.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CallCenterApp.view.EticketGiverulesPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eticketgiverulespanel',

    onSaveButtonClick: function (button, e, eOpts) {
        var EticketGiverulesPanel = button.up('#EticketGiverulesPanel');

        var RuleName = EticketGiverulesPanel.down('#RuleName');
        var RuleIntroduce = EticketGiverulesPanel.down('#RuleIntroduce');

        var giveStartDate = EticketGiverulesPanel.down('#giveStartDate');
        var giveEndDate = EticketGiverulesPanel.down('#giveEndDate');

        var startDate = (giveStartDate.getValue() === null) ? null : giveStartDate.getValue().getTime() / 1000;
        var endDate = (giveEndDate.getValue() === null) ? null : giveEndDate.getValue().getTime() / 1000;
        var ruleDetail = {
            giveStartDate: startDate,
            giveEndDate: endDate
        };

        /**获取LoginSuccessJsonStore中的data**/
        var LoginSuccessStore = Ext.getStore('LoginSuccessJsonStore');
        var userId = LoginSuccessStore.data.items[0].data.userId;


        var url = Ext.getStore('ConfigStore').getAt(0).get('WebServerUrl');
        var data = {
            'f_name': RuleName.getValue(),
            'f_details': ruleDetail,
            'f_desc': RuleIntroduce.getValue(),
            'f_mid': userId

        };

        Ext.Ajax.request({
            headers: {'Content-Type': 'application/json'},
            url: url + '/action/eticketRule/submit.do',
            params: JSON.stringify(data),

            success: function (response) {
                //var text=Ext.util.JSON.decode(response.responseText);
                var text = response.responseText;
                var result = JSON.parse(text);


                if (result === null) {
                    Ext.Msg.alert('提示', '保存出错了，结果：' + result);
                    return;
                }

                if (result.succeed === true) {
                    Ext.Msg.alert('提示', '保存成功');
                } else {
                    Ext.Msg.alert('提示', '保存出错了，错误：' + result.ptError);
                    return;
                }

            }
        });


    }

});