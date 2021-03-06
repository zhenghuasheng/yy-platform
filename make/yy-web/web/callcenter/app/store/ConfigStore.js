/*
 * File: app/store/ConfigStore.js
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

Ext.define('CallCenterApp.store.ConfigStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ConfigStore',
            data: [
                {
                    WebServerUrl: 'http://192.168.10.27:8080',
                    CarBrandServerUrl: 'http://58.20.41.200:8384',
                    OrderServerUrl: 'http://192.168.10.38:8084',
                    OrderUrl: 'http://192.168.10.27:8389',
                    NewCarshopServerUrl: 'http://192.168.10.250:8480'
                },
                {
                    UserServerUrl: 'http://192.168.10.38:8388'
                }
            ],
            fields: [
                {
                    name: 'WebServerUrl'
                },
                {
                    name: 'UserServerUrl'
                },
                {
                    name: 'CarBrandServerUrl'
                },
                {
                    name: 'OrderServerUrl'
                },
                {
                    name: 'OrderUrl'
                },
                {
                    name: 'NewCarshopServerUrl'
                }
            ]
        }, cfg)]);
    }
});