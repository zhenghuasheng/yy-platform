/*
 * File: app/view/CustomerStatusPanelViewController.js
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

Ext.define('CallCenterApp.view.CustomerStatusPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customerstatuspanel',

    onFindBtnClick: function (button, e, eOpts) {
        var ctStatusPanel = button.up('#customerStatusPanel');
        var phoneField = ctStatusPanel.down('#phoneField');
        var etcPropGrid = ctStatusPanel.down('#etcPropGrid');
        var hgPropGrid = ctStatusPanel.down('#hgPropGrid');

        if (!phoneField.validate()) {
            Ext.Msg.alert('Status', '请正确填写信息.');
            return;
        }


        var url = Ext.getStore('ConfigStore').getAt(0).get('WebServerUrl');
        etcPropGrid.setSource(null);
        hgPropGrid.setSource(null);


        Ext.Ajax.request({
            url: url + '/action/etc/customer.do',
            params: {
                phone: phoneField.getValue()
            },

            success: function (response) {
                var result = JSON.parse(response.responseText);

                if (result.errCode !== 0) {
                    return;
                }


                etcPropGrid.setSource(result.records[0]);
            }
        });

        Ext.Ajax.request({
            url: url + '/action/hg/customer.do',
            params: {
                phone: phoneField.getValue()
            },

            success: function (response) {
                var result = JSON.parse(response.responseText);

                if (!result.succeed) {
                    return;
                }


                hgPropGrid.setSource(result.object.hgCustomerInfo);
            }
        });


    }

});