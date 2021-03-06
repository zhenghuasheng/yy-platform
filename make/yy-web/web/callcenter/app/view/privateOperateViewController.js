/*
 * File: app/view/privateOperateViewController.js
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

Ext.define('CallCenterApp.view.privateOperateViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.privateoperate',

    onMenuSystemClick: function (menu, item, e, eOpts) {
        var mainView = Ext.getCmp('mainView');
        var contentPanel = mainView.getComponent('contentPanel');

        if (item.itemId == 'editprofileItem') {
            var editprofilewin = contentPanel.getComponent('editprofilePanel');

            if (editprofilewin === undefined) {
                editprofilewin = new CallCenterApp.view.EditProfilePanel({});

                contentPanel.add(editprofilewin);
            }

            contentPanel.setActiveTab(editprofilewin);
        } else if (item.itemId == 'passwordmodifyItem') {
            var PasswordModifyForm = contentPanel.getComponent('PasswordModifyForm');

            if (PasswordModifyForm === undefined) {
                PasswordModifyForm = new CallCenterApp.view.PasswordModifyForm({});

                contentPanel.add(PasswordModifyForm);
            }

            contentPanel.setActiveTab(PasswordModifyForm);
        } else if (item.itemId == 'privateinfoItem') {
            var privateInfoPanel = contentPanel.getComponent('privateInfoPanel');

            if (privateInfoPanel === undefined) {
                privateInfoPanel = new CallCenterApp.view.PrivateInfoPanel({});

                contentPanel.add(privateInfoPanel);
            }

            contentPanel.setActiveTab(privateInfoPanel);
        } else if (item.itemId == 'restpasswordItem') {
            var resetpwd = contentPanel.getComponent('resetpwd');

            if (resetpwd === undefined) {
                resetpwd = new CallCenterApp.view.RestPasswordPanel({});

                contentPanel.add(resetpwd);
            }

            contentPanel.setActiveTab(resetpwd);
        }

    }

});
