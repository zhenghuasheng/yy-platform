/*
 * File: app/view/AdviceMagPanel.js
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

Ext.define('CallCenterApp.view.AdviceMagPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.adviceMagPanel',

    requires: [
        'CallCenterApp.view.AdviceMagPanelViewModel',
        'CallCenterApp.view.AdviceMagPanelViewController',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Boolean',
        'Ext.grid.column.Date',
        'Ext.grid.View',
        'Ext.toolbar.Paging'
    ],

    controller: 'advicemagpanel',
    viewModel: {
        type: 'advicemagpanel'
    },
    height: 527,
    id: 'adviceMagPanel',
    itemId: 'adviceMagPanel',
    width: 739,
    layout: 'fit',
    closable: true,
    title: '反馈意见管理',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    id: 'refreshBtn',
                    itemId: 'refreshBtn',
                    width: 64,
                    text: '刷新',
                    listeners: {
                        click: 'onRefreshBtnClick'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'gridpanel',
            height: 316,
            itemId: 'advicemagGridPanel',
            allowDeselect: true,
            columnLines: true,
            store: 'AdviceStore',
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 90,
                    align: 'center',
                    dataIndex: 'string',
                    text: '序号'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'username',
                    align: 'center',
                    dataIndex: 'f_name',
                    text: '姓名'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'userphone',
                    width: 165,
                    align: 'center',
                    dataIndex: 'f_phone',
                    text: '电话号码'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'readed',
                    align: 'center',
                    dataIndex: 'f_read',
                    text: '是否已阅',
                    falseText: '未阅',
                    trueText: '已阅'
                },
                {
                    xtype: 'datecolumn',
                    itemId: 'restime',
                    width: 165,
                    align: 'center',
                    dataIndex: 'f_createtime',
                    text: '反馈时间',
                    format: 'Y-m-d H:i:s'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'rescontent',
                    width: 165,
                    align: 'center',
                    dataIndex: 'f_content',
                    text: '反馈内容'
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    frame: true,
                    width: 360,
                    displayInfo: true,
                    firstText: '首页',
                    lastText: '最后一页',
                    nextText: '下一页',
                    prevText: '上一页',
                    refreshText: '刷新',
                    store: 'AdviceStore'
                }
            ],
            listeners: {
                render: 'onAdvicemagGridPanelRend',
                rowdblclick: 'onAdvicemagGridPanelRowDblClick'
            }
        }
    ]

});