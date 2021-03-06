/*
 * File: app/view/userDefinedUI.js
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

Ext.define('CallCenterApp.view.userDefinedUI', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userDefinedUI',

    requires: [
        'CallCenterApp.view.userDefinedUIViewModel',
        'CallCenterApp.view.userDefinedUIViewController',
        'Ext.menu.Menu',
        'Ext.menu.Item'
    ],

    controller: 'userdefinedui',
    viewModel: {
        type: 'userdefinedui'
    },
    id: 'userDefinedUI',
    itemId: 'userDefinedUI',
    layout: 'fit',
    title: 'UI自定义',

    items: [
        {
            xtype: 'menu',
            floating: false,
            itemId: 'userDefinedUIMenu',
            items: [
                {
                    xtype: 'menuitem',
                    hidden: true,
                    itemId: 'columnManageItem',
                    text: '栏目管理'
                },
                {
                    xtype: 'menuitem',
                    itemId: 'carBrandManageItem',
                    text: '品牌管理'
                },
                {
                    xtype: 'menuitem',
                    itemId: 'bannerManageItem',
                    text: 'Banner管理'
                },
                {
                    xtype: 'menuitem',
                    itemId: 'activityManageItem',
                    text: '活动管理'
                },
                {
                    xtype: 'menuitem',
                    itemId: 'hotBrandManageItem',
                    text: '热门品牌管理'
                },
                {
                    xtype: 'menuitem',
                    itemId: 'hotCarsetManageItem',
                    text: '热门车型管理'
                }
            ],
            listeners: {
                click: 'onUserDefinedUIMenuClick'
            }
        }
    ]

});