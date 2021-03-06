/*
 * File: app/view/SubmitWindow.js
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

Ext.define('CallCenterApp.view.SubmitWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.submitwin',

    requires: [
        'CallCenterApp.view.SubmitWindowViewModel',
        'CallCenterApp.view.SubmitWindowViewController',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.form.field.TextArea',
        'Ext.button.Button'
    ],

    controller: 'submitwindow',
    viewModel: {
        type: 'submitwindow'
    },
    id: 'hgSubmitWindow',
    title: '融资申请提交',
    modal: true,

    items: [
        {
            xtype: 'container',
            itemId: 'submitContainer',
            items: [
                {
                    xtype: 'container',
                    margin: 10,
                    items: [
                        {
                            xtype: 'container',
                            margin: '',
                            layout: {
                                type: 'table',
                                columns: 2
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    frame: true,
                                    height: 400,
                                    itemId: 'deptGridPanel',
                                    width: 237,
                                    title: '部门',
                                    store: 'DeptStore',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            hidden: true,
                                            width: '',
                                            dataIndex: 'id',
                                            text: '部门ID'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 200,
                                            dataIndex: 'name',
                                            text: '部门名称'
                                        }
                                    ],
                                    viewConfig: {
                                        xtype: 'tableview'
                                    },
                                    listeners: {
                                        selectionchange: 'onDeptGridPanelSelectionChange'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    frame: true,
                                    height: 400,
                                    itemId: 'bizManGridPanel',
                                    width: 295,
                                    title: '人员',
                                    store: 'BizManStore',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'name',
                                            text: '姓名'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 150,
                                            dataIndex: 'phone',
                                            text: '电话'
                                        }
                                    ],
                                    viewConfig: {
                                        xtype: 'tableview'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'textareafield',
                            margin: '20 0 0 0',
                            width: 530,
                            fieldLabel: '备注',
                            labelWidth: 60
                        },
                        {
                            xtype: 'container',
                            margin: '20 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    width: 200,
                                    fieldLabel: '介绍人',
                                    labelWidth: 60
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'submitBtn',
                                    margin: '0 0 0 200',
                                    width: 129,
                                    text: '提交申请',
                                    listeners: {
                                        click: 'onSubmitBtnClick'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

});