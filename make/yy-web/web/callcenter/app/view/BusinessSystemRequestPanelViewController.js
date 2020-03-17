/*
 * File: app/view/BusinessSystemRequestPanelViewController.js
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

Ext.define('CallCenterApp.view.BusinessSystemRequestPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.businesssystemrequestpanel',

    onSaveButtonClick: function (button, e, eOpts) {
        var businessSystemRequestPanel = button.up('#BusinessSystemRequestPanel');
        //根据itemid获取值
        var systemId = businessSystemRequestPanel.down('#systemIdField');
        var systemName = businessSystemRequestPanel.down('#systemNameField');
        var fatherSystem = businessSystemRequestPanel.down('#fatherSystemField');
        var authorizationSystem = businessSystemRequestPanel.down('#authorizationSystemField');
        var defaultUrl = businessSystemRequestPanel.down('#defaultUrlField');


        if (systemName.getValue() === "") {
            Ext.Msg.alert('提示', '请必要信息不能为空!');
            return;
        }

        var url = Ext.getStore('ConfigStore').getAt(0).get('OrderUrl');

        Ext.Ajax.request({
            url: url + '/biz/app/edit.do',
            params: {
                'f_stid': systemId.getValue(),
                'f_stname': systemName.getValue(),
                'f_pstid': fatherSystem.getValue(),
                'f_accredit': authorizationSystem.getValue(),
                'f_url': defaultUrl.getValue()
            },
            success: function (response) {
                var text = response.responseText;
                var result = JSON.parse(text);
                if (result === null) {
                    Ext.Msg.alert('提示', '修改出错了，结果：' + text);
                    return;
                }

                if (result.succeed === true) {
                    Ext.getStore('BusinessSystemManagerStore').reload();
                    Ext.Msg.alert('提示', '修改成功');
                } else {
                    Ext.Msg.alert('提示', '修改出错了，错误：' + result.errMsg);
                }
            }
        });
    },

    onResetButtonClick: function (button, e, eOpts) {
        this.onBusinessSystemRequestPanelBeforeRender();
    },

    onBusinessSystemRequestPanelBeforeRender: function (component, eOpts) {
        var businessSystemRequestPanel = Ext.getCmp('BusinessSystemRequestPanel');
        businessSystemRequestPanel.down('#systemIdField').setValue(businessSystemRequestPanel.date.f_stid);
        businessSystemRequestPanel.down('#systemNameField').setValue(businessSystemRequestPanel.date.f_stname);
        businessSystemRequestPanel.down('#fatherSystemField').setValue(businessSystemRequestPanel.date.f_pstid);
        businessSystemRequestPanel.down('#authorizationSystemField').setValue(businessSystemRequestPanel.date.f_accredit);
        businessSystemRequestPanel.down('#defaultUrlField').setValue(businessSystemRequestPanel.date.f_url);
    }

});
