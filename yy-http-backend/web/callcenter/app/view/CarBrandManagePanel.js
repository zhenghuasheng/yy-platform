/*
 * File: app/view/CarBrandManagePanel.js
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

Ext.define('CallCenterApp.view.CarBrandManagePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.carbrandmanagepanel',

    requires: [
        'CallCenterApp.view.CarBrandManagePanelViewModel',
        'CallCenterApp.view.CarBrandManagePanelViewController',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox'
    ],

    controller: 'carbrandmanagepanel',
    viewModel: {
        type: 'carbrandmanagepanel'
    },
    id: 'CarBrandManagePanel',
    itemId: 'CarBrandManagePanel',
    layout: 'fit',
    closable: true,
    title: '品牌管理',

    items: [
        {
            xtype: 'tabpanel',
            itemId: 'CarBrandManageTabPanel',
            activeTab: 0,
            items: [
                {
                    xtype: 'panel',
                    itemId: 'onBrandPanel',
                    layout: 'fit',
                    title: '已上架品牌',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'onBrandGridPanel',
                            store: 'CarBrandOnStore',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 50,
                                    align: 'center',
                                    text: '序号'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 300,
                                    align: 'center',
                                    dataIndex: 'name',
                                    text: '品牌名'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                                        var carBrandManagePanel = view.up('#CarBrandManagePanel');
                                        var systemSelector = carBrandManagePanel.down('#systemSelector');
                                        var systemId = systemSelector.getValue();
                                        var url = Ext.getStore('ConfigStore').getAt(0).get('OrderUrl');

                                        Ext.Ajax.request({
                                            url: url + '/biz/app/brand/edit.do',
                                            params: {
                                                appId: systemId,
                                                brandId: record.data.id,
                                                status: false

                                            },
                                            success: function (response) {
                                                var text = response.responseText;
                                                var result = JSON.parse(text);

                                                if (result === null) {
                                                    Ext.Msg.alert('提示', '操作出错');
                                                    return;
                                                }

                                                if (result.succeed === true) {

                                                    var carBrandOnStore = Ext.getStore('CarBrandOnStore');
                                                    var ajaxProxyOn = carBrandOnStore.getProxy();
                                                    ajaxProxyOn.setUrl(url + "/biz/app/brand/get.do?" + "appId=" + systemId + "&status=true");
                                                    carBrandOnStore.load();

                                                    var carBrandOffStore = Ext.getStore('CarBrandOffStore');
                                                    var ajaxProxyOff = carBrandOffStore.getProxy();
                                                    ajaxProxyOff.setUrl(url + "/biz/app/brand/get.do?" + "appId=" + systemId + "&status=false");
                                                    carBrandOffStore.load();

                                                } else {
                                                    Ext.Msg.alert('提示', '保存出错了，错误：' + result.errMsg);
                                                }
                                            }
                                        });

                                    },
                                    text: '操作',
                                    items: [
                                        {
                                            altText: '品牌下架',
                                            iconCls: 'Cardelete'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    itemId: 'offBrandPanel',
                    layout: 'fit',
                    title: '未上架品牌',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'offBrandGridPanel',
                            store: 'CarBrandOffStore',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 50,
                                    align: 'center',
                                    text: '序号'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 300,
                                    align: 'center',
                                    dataIndex: 'name',
                                    text: '品牌名'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                                        var carBrandManagePanel = view.up('#CarBrandManagePanel');
                                        var systemSelector = carBrandManagePanel.down('#systemSelector');
                                        var systemId = systemSelector.getValue();
                                        var url = Ext.getStore('ConfigStore').getAt(0).get('OrderUrl');

                                        Ext.Ajax.request({
                                            url: url + '/biz/app/brand/edit.do',
                                            params: {
                                                appId: systemId,
                                                brandId: record.data.id,
                                                status: true

                                            },
                                            success: function (response) {
                                                var text = response.responseText;
                                                var result = JSON.parse(text);

                                                if (result === null) {
                                                    Ext.Msg.alert('提示', '操作出错');
                                                    return;
                                                }

                                                if (result.succeed === true) {

                                                    var carBrandOnStore = Ext.getStore('CarBrandOnStore');
                                                    var ajaxProxyOn = carBrandOnStore.getProxy();
                                                    ajaxProxyOn.setUrl(url + "/biz/app/brand/get.do?" + "appId=" + systemId + "&status=true");
                                                    carBrandOnStore.load();

                                                    var carBrandOffStore = Ext.getStore('CarBrandOffStore');
                                                    var ajaxProxyOff = carBrandOffStore.getProxy();
                                                    ajaxProxyOff.setUrl(url + "/biz/app/brand/get.do?" + "appId=" + systemId + "&status=false");
                                                    carBrandOffStore.load();

                                                } else {
                                                    Ext.Msg.alert('提示', '保存出错了，错误：' + result.errMsg);
                                                }
                                            }
                                        });
                                    },
                                    text: '操作',
                                    items: [
                                        {
                                            altText: '品牌上架',
                                            iconCls: 'Carstart'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'combobox',
                    itemId: 'systemSelector',
                    width: 300,
                    fieldLabel: '请选择系统',
                    labelWidth: 80,
                    displayField: 'f_stname',
                    store: 'BusinessSystemManagerStore',
                    valueField: 'f_stid',
                    listeners: {
                        select: 'onSystemSelectorSelect',
                        beforerender: 'onSystemSelectorBeforeRender'
                    }
                }
            ]
        }
    ],
    listeners: {
        beforerender: 'onCarBrandManagePanelBeforeRender'
    }

});