/*
 * File: app/view/EticketConsumePanel.js
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

Ext.define('CallCenterApp.view.EticketConsumePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.eticketconsumepanel',

    requires: [
        'CallCenterApp.view.EticketConsumePanelViewModel',
        'CallCenterApp.view.EticketConsumePanelViewController',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel',
        'Ext.grid.column.Date'
    ],

    controller: 'eticketconsumepanel',
    viewModel: {
        type: 'eticketconsumepanel'
    },
    height: 574,
    id: 'EticketConsumePanel',
    itemId: 'EticketConsumePanel',
    width: 715,
    closable: true,
    title: '消费记录查询',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'combobox',
                    id: 'EticketShopInfo',
                    itemId: 'EticketShopInfo',
                    fieldLabel: '店铺名称',
                    labelWidth: 60,
                    displayField: 'shopName',
                    store: 'limitUseShopStore',
                    valueField: 'shopId',
                    listeners: {
                        select: 'onEticketShopInfoSelect'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'gridpanel',
            height: 243,
            id: 'EticketConsumerGridpanel',
            title: '',
            store: 'EticketConsumerStore',
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 50,
                    align: 'center',
                    dataIndex: 'string',
                    text: '序号'
                },
                {
                    xtype: 'gridcolumn',
                    width: 213,
                    align: 'center',
                    dataIndex: 'f_name',
                    text: '优惠券名称'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'eticketCount',
                    text: '消费数量'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'f_id',
                    text: '优惠券编号'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'f_type',
                    text: '优惠券类型'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'f_money',
                    text: '金额'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'f_rebate',
                    text: '折扣'
                }
            ],
            selModel: {
                selType: 'rowmodel',
                ignoreRightMouseSelection: true
            },
            listeners: {
                rowdblclick: 'onEticketConsumerGridpanelRowDblClick'
            }
        },
        {
            xtype: 'gridpanel',
            height: 247,
            width: 719,
            title: '优惠券详情',
            store: 'EticketInitDetailStore',
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 101,
                    align: 'center',
                    dataIndex: 'string',
                    text: '序号'
                },
                {
                    xtype: 'gridcolumn',
                    width: 208,
                    align: 'center',
                    dataIndex: 'f_code',
                    text: '优惠券SN'
                },
                {
                    xtype: 'gridcolumn',
                    align: 'center',
                    dataIndex: 'custName',
                    text: '客户姓名'
                },
                {
                    xtype: 'gridcolumn',
                    width: 137,
                    align: 'center',
                    dataIndex: 'f_phone',
                    text: '客户电话'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'f_ticketid',
                    text: '优惠券类型ID'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'f_useshop',
                    text: '店铺ID'
                },
                {
                    xtype: 'gridcolumn',
                    width: 159,
                    align: 'center',
                    dataIndex: 'f_orderid',
                    text: '关联订单'
                },
                {
                    xtype: 'datecolumn',
                    width: 139,
                    align: 'center',
                    dataIndex: 'f_usetime',
                    text: '使用时间',
                    format: 'Y-m-d H:i:s'
                }
            ]
        }
    ]

});