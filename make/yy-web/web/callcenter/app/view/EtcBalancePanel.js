/*
 * File: app/view/EtcBalancePanel.js
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

Ext.define('CallCenterApp.view.EtcBalancePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.etcblpanel',

    requires: [
        'CallCenterApp.view.EtcBalancePanelViewModel',
        'CallCenterApp.view.EtcBalancePanelViewController',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.form.field.Display'
    ],

    controller: 'etcbalancepanel',
    viewModel: {
        type: 'etcbalancepanel'
    },
    id: 'etcBalancePanel',
    itemId: 'etcBalancePanel',
    closable: true,
    title: 'ETC余额查询',

    items: [
        {
            xtype: 'container',
            layout: 'table',
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'plateNumField',
                    margin: 10,
                    width: 200,
                    fieldLabel: '车牌号',
                    labelWidth: 60
                },
                {
                    xtype: 'button',
                    height: 28,
                    itemId: 'etcBalanceBtn',
                    margin: '',
                    width: 100,
                    text: '查询',
                    listeners: {
                        click: 'onEtcBalanceBtnClick'
                    }
                }
            ]
        },
        {
            xtype: 'displayfield',
            itemId: 'balanceField',
            margin: 10,
            fieldLabel: '当前余额',
            value: ''
        }
    ]

});