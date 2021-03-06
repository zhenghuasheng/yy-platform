/*
 * File: app/view/EditProfilePanelViewController.js
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

Ext.define('CallCenterApp.view.EditProfilePanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.editprofilepanel',

    onSubmitbtnClick: function (button, e, eOpts) {
        var view = this.getView(),
            editprofilePanel = button.up('#editprofilePanel');
        var nameField = editprofilePanel.down('#name');
        var idcardFild = editprofilePanel.down('#idcard');

        if (nameField.getValue() === '' || idcardFild.getValue() === '') {
            Ext.Msg.alert('提示', '请填写正确信息后提交');
            return;
        }


        // Success
        var successCallback = function (resp, ops) {
            var result = JSON.parse(resp.responseText);
            if (result.flag === "0") {
                Ext.Msg.alert("修改提示", "修改成功！");
            } else {
                Ext.Msg.alert("修改提示", "修改失败！");
            }


        };

        // Failure
        var failureCallback = function (resp, ops) {

            Ext.Msg.alert('Registration Failure', resp);

        };


        // TODO: Register using server-side authentication service
        var url = Ext.getStore('ConfigStore').getAt(1).get('UserServerUrl');
        var LoginSuccessStore = Ext.getStore('LoginSuccessJsonStore');
        var token = LoginSuccessStore.data.items[0].data.token;
        Ext.Ajax.request({
            method: "POST",
            url: url + "/user/info/modify.do",
            params: {
                name: nameField.getValue(),
                idcard: idcardFild.getValue(),
                token: token,


            },
            success: successCallback,
            failure: failureCallback
        });
    },

    onResetbtnClick: function (button, e, eOpts) {
        var editprofilePanel = button.up('#editprofilePanel');
        editprofilePanel.reset();
    }

});
