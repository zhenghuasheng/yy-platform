/*
 * File: app/view/HgCarDirectsalePanel.js
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

Ext.define('CallCenterApp.view.HgCarDirectsalePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hgcardirectsalepanel',

    requires: [
        'CallCenterApp.view.HgCarDirectsalePanelViewModel',
        'CallCenterApp.view.HgCarDirectsalePanelViewController',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.File',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.TextArea',
        'Ext.form.field.Number',
        'Ext.button.Button'
    ],

    controller: 'hgcardirectsalepanel',
    viewModel: {
        type: 'hgcardirectsalepanel'
    },
    height: 518,
    itemId: 'HgCarDirectsalePanel',
    width: 697,
    closable: true,
    title: '直销车辆添加',

    items: [
        {
            xtype: 'form',
            frame: true,
            height: 473,
            itemId: 'HgCarDirectsaleForm',
            width: 691,
            layout: 'auto',
            bodyBorder: true,
            bodyPadding: 10,
            title: '',
            items: [
                {
                    xtype: 'combobox',
                    itemId: 'CarBrand',
                    width: 300,
                    fieldLabel: '车辆品牌',
                    labelWidth: 70,
                    editable: false,
                    displayField: 'name',
                    store: 'CarBrandStord',
                    valueField: 'id',
                    listeners: {
                        select: 'onCarBrandSelect'
                    }
                },
                {
                    xtype: 'combobox',
                    itemId: 'Carset',
                    width: 300,
                    fieldLabel: '车系',
                    labelWidth: 70,
                    displayField: 'name',
                    store: 'CarsetStore',
                    valueField: 'id',
                    listeners: {
                        select: 'onCarsetSelect'
                    }
                },
                {
                    xtype: 'combobox',
                    itemId: 'Cartype',
                    width: 300,
                    fieldLabel: '车辆型号',
                    labelWidth: 70,
                    editable: false,
                    displayField: 'name',
                    store: 'CarTypeStore',
                    valueField: 'id',
                    listeners: {
                        select: 'onCartypeSelect'
                    }
                },
                {
                    xtype: 'combobox',
                    itemId: 'VehicleSourceField',
                    width: 300,
                    fieldLabel: '车辆来源',
                    labelWidth: 70,
                    editable: false,
                    displayField: 'name',
                    store: 'VehicleSourceStore',
                    valueField: 'id',
                    listeners: {
                        select: 'onVehicleSourceFieldSelect'
                    }
                },
                {
                    xtype: 'container',
                    itemId: 'CartypeImagContainer',
                    layout: 'column',
                    items: [
                        {
                            xtype: 'filefield',
                            id: 'ImageUploadField',
                            itemId: 'ImageUploadField',
                            width: 298,
                            fieldLabel: '车辆图片',
                            labelWidth: 70,
                            buttonText: '查找...',
                            listeners: {
                                render: 'onImageUploadFieldRender'
                            }
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            itemId: 'ImageUrlField',
                            fieldLabel: '图片url'
                        }
                    ]
                },
                {
                    xtype: 'radiogroup',
                    frame: true,
                    itemId: 'FinancialpurchaseGroup',
                    margin: '10 0 0 0 ',
                    fieldLabel: '金融方案购车',
                    labelWidth: 90,
                    items: [
                        {
                            xtype: 'radiofield',
                            margin: '0 0 0 20',
                            name: 'FinancialpurchaseRadio',
                            boxLabel: '是',
                            inputValue: '1'
                        },
                        {
                            xtype: 'radiofield',
                            margin: '0 0 0 50',
                            name: 'FinancialpurchaseRadio',
                            boxLabel: '否',
                            inputValue: '0'
                        }
                    ],
                    listeners: {
                        change: 'onRadiogroupChange'
                    }
                },
                {
                    xtype: 'textareafield',
                    frame: true,
                    height: 141,
                    itemId: 'FinancialContentsField',
                    margin: '10 0 0 0',
                    width: 450,
                    fieldLabel: '金融方案',
                    labelWidth: 70
                },
                {
                    xtype: 'numberfield',
                    hidden: true,
                    itemId: 'DayPaymentField',
                    width: 300,
                    fieldLabel: '日供(元)',
                    labelWidth: 70,
                    minValue: 0
                },
                {
                    xtype: 'numberfield',
                    hidden: true,
                    itemId: 'GuidepriceField',
                    width: 300,
                    fieldLabel: '指导价(万)',
                    labelWidth: 70,
                    minValue: 0
                },
                {
                    xtype: 'combobox',
                    hidden: true,
                    itemId: 'CarColorField',
                    width: 300,
                    fieldLabel: '车辆颜色',
                    labelWidth: 70,
                    store: 'CarColorStore'
                },
                {
                    xtype: 'button',
                    itemId: 'submitBtn',
                    margin: '10 0 0 60',
                    width: 56,
                    text: '提交',
                    listeners: {
                        click: 'onSubmitBtnClick'
                    }
                }
            ],
            listeners: {
                render: 'onHgCarDirectsaleFormRender'
            }
        }
    ]

});