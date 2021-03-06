/*
 * File: app/view/EtcBalancePanelViewController.js
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

Ext.define('CallCenterApp.view.EtcBalancePanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.etcbalancepanel',

    onEtcBalanceBtnClick: function(button, e, eOpts) {
        var etcBalancePanel = Ext.getCmp('etcBalancePanel');
        var plateNumField = etcBalancePanel.down('#plateNumField');
        var balanceField = etcBalancePanel.down('#balanceField');
        var url = Ext.getStore('ConfigStore').getAt(0).get('WebServerUrl');

        Ext.Ajax.request({
            url: url + '/action/etc/balance.do',
            params: {
                plateNum: plateNumField.getValue()
            },

            success: function (response) {

                var result = JSON.parse(response.responseText);
                balanceField.reset();

                //alert(result.object.etcBalanceListStr[0].balance);
                if (result.object.etcBalanceListStr.length < 1) {
                    balanceField.setValue('未查到相关记录');
                    return;
                }

                balanceField.setValue(result.object.etcBalanceListStr[0].balance+ "元");
            }
        });

    }

});
