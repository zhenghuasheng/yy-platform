/*
 * File: app/model/EticketDestoryModel.js
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

Ext.define('CallCenterApp.model.EticketDestoryModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date'
    ],

    fields: [
        {
            type: 'int',
            name: 'f_id'
        },
        {
            type: 'string',
            name: 'f_name'
        },
        {
            type: 'string',
            name: 'f_type'
        },
        {
            type: 'date',
            name: 'f_starttime',
            dateFormat: 'timestamp'
        },
        {
            type: 'date',
            name: 'f_endtime',
            dateFormat: 'timestamp'
        },
        {
            type: 'string',
            name: 'f_oneuse'
        },
        {
            type: 'string',
            name: 'f_oneget'
        },
        {
            type: 'string',
            name: 'f_getlimite'
        },
        {
            type: 'string',
            name: 'f_minspending'
        },
        {
            type: 'string',
            name: 'f_money'
        },
        {
            type: 'string',
            name: 'f_rebate'
        },
        {
            type: 'string',
            name: 'f_prenum'
        },
        {
            type: 'string',
            name: 'f_details'
        },
        {
            type: 'string',
            name: 'f_message'
        },
        {
            type: 'string',
            name: 'f_image'
        },
        {
            type: 'string',
            name: 'f_sendway'
        },
        {
            type: 'string',
            name: 'f_remind'
        },
        {
            type: 'string',
            name: 'f_remindmessage'
        },
        {
            type: 'string',
            name: 'f_usetime'
        },
        {
            type: 'string',
            name: 'f_userule'
        },
        {
            type: 'string',
            name: 'f_useshop'
        }
    ]
});