/*
 * File: app/view/HgCarDirectsalePanelViewController.js
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

Ext.define('CallCenterApp.view.HgCarDirectsalePanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hgcardirectsalepanel',

    onCarBrandSelect: function (combo, records, eOpts) {
        var brandId = records[0].data.id;

        var carsetStore = Ext.getStore('CarsetStore');

        var ajaxProxy = carsetStore.getProxy();

        var url = Ext.getStore('ConfigStore').getAt(0).get('CarBrandServerUrl');
        ajaxProxy.setUrl(url + "/car/queryCarset?id=" + brandId);
        carsetStore.load();
    },

    onCarsetSelect: function (combo, records, eOpts) {
        var carsetId = records[0].data.id;
        if (carsetId === 0) {
            return;
        }

        var carTypeStore = Ext.getStore('CarTypeStore');

        var ajaxProxy = carTypeStore.getProxy();

        var url = Ext.getStore('ConfigStore').getAt(0).get('CarBrandServerUrl');
        ajaxProxy.setUrl(url + "/car/queryCar?id=" + carsetId);
        carTypeStore.load();
    },

    onCartypeSelect: function (combo, records, eOpts) {
        var carTypeId = records[0].data.id;
        if (carTypeId === null) {
            return;
        }

        /**1,根据carTypeId获取颜色信息**/
        var CarColorStore = Ext.getStore('CarColorStore');
        var ajaxProxy = CarColorStore.getProxy();

        var url = Ext.getStore('ConfigStore').getAt(0).get('OrderServerUrl');
        ajaxProxy.setUrl(url + "/hg/carenquiry/color/get.do?cartypeid=" + carTypeId);
        CarColorStore.load();
    },

    onVehicleSourceFieldSelect: function (combo, records, eOpts) {

        if (records.length < 1) {
            return;
        }
        var HgCarDirectsalePanel = combo.up('#HgCarDirectsalePanel');
        var FinancialpurchaseGroup = HgCarDirectsalePanel.down('#FinancialpurchaseGroup');
        if (records[0].data.id === 0) {
            /**融资车辆**/



            FinancialpurchaseGroup.setValue({FinancialpurchaseRadio: 1});

            FinancialpurchaseGroup.setDisabled(true);

        } else {
            FinancialpurchaseGroup.setDisabled(false);
            FinancialpurchaseGroup.reset();
        }
    },

    onImageUploadFieldRender: function (component, eOpts) {
        var HgCarDirectsalePanel = component.up('#HgCarDirectsalePanel');

        var ImageUrlField = HgCarDirectsalePanel.down('#ImageUrlField');

        var domId = ImageUrlField.inputId;

        var url = 'http://113.247.237.98:10002/upload';

        $('#ImageUploadField-button-fileInputEl').fileupload({
            url: url,
            dataType: 'json',
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            done: function (e, data) {
                $.each(data.result.files, function (index, file) {

                    HgCarDirectsalePanel.imagUrl = file.url;

                    //                 $("#img_logo")[0].src = file.url;
                    $('#' + domId).val(file.url);
                });
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );
            }
        }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
    },

    onRadiogroupChange: function (field, newValue, oldValue, eOpts) {
        var HgCarDirectsalePanel = field.up('#HgCarDirectsalePanel');

        var FinancialContentsField = HgCarDirectsalePanel.down('#FinancialContentsField');

        var DayPaymentField = HgCarDirectsalePanel.down('#DayPaymentField');


        var GuidepriceField = HgCarDirectsalePanel.down('#GuidepriceField');

        var CarColorField = HgCarDirectsalePanel.down('#CarColorField');

        if (newValue.FinancialpurchaseRadio === '1') {
            FinancialContentsField.show();
            DayPaymentField.show();

            GuidepriceField.hide();
            CarColorField.hide();

        } else {

            FinancialContentsField.hide();
            DayPaymentField.hide();

            GuidepriceField.show();
            CarColorField.show();

        }
    },

    onSubmitBtnClick: function (button, e, eOpts) {
        var HgCarDirectsalePanel = button.up('#HgCarDirectsalePanel');

        var FinancialpurchaseGroup = HgCarDirectsalePanel.down('#FinancialpurchaseGroup');

        var ImageUrlField = HgCarDirectsalePanel.down('#ImageUrlField');
        if (ImageUrlField.getValue() === null || ImageUrlField.getValue() === '') {
            Ext.Msg.alert('提示', '请上传车型图！');
            return;
        }

        var CarBrandField = HgCarDirectsalePanel.down('#CarBrand');

        var CarsetField = HgCarDirectsalePanel.down('#Carset');

        var CartypeField = HgCarDirectsalePanel.down('#Cartype');

        var VehicleSourceField = HgCarDirectsalePanel.down('#VehicleSourceField');

        var CarBrand = CarBrandField.getValue();
        var carsetId = CarsetField.getValue();
        var carId = CartypeField.getValue();
        var type = VehicleSourceField.getValue();

        if (CarBrand === null || CarBrand === '' || carsetId === null || carsetId === '' || carId === null || carId === '' || type === null || type === '') {
            Ext.Msg.alert('提示', '请输入必要的车辆信息！');
            return;
        }


        var FinancialContentsField = HgCarDirectsalePanel.down('#FinancialContentsField');
        var dayPaymentField = HgCarDirectsalePanel.down('#DayPaymentField');
        var GuidepriceField = HgCarDirectsalePanel.down('#GuidepriceField');
        var CarColorField = HgCarDirectsalePanel.down('#CarColorField');

        var financialPlan = FinancialContentsField.getValue();
        var directPrice = GuidepriceField.getValue();
        var dayPay = dayPaymentField.getValue();
        var color = CarColorField.getValue();

        var Financialpurchase = FinancialpurchaseGroup.getValue().FinancialpurchaseRadio;

        if (Financialpurchase === undefined) {
            Ext.Msg.alert('提示', '请选择是否为金融购车！');
            return;
        }

        if (Financialpurchase === '1') {
            if (financialPlan === null || financialPlan === '' || dayPay === null || dayPay === '') {
                Ext.Msg.alert('提示', '请输入必要信息！');
                return;
            }
        } else {
            if (directPrice === null || directPrice === '' || color === null || color === '') {
                Ext.Msg.alert('提示', '请输入必要信息！');
                return;
            }

        }


        /**获取LoginSuccessJsonStore中的data**/
        var LoginSuccessStore = Ext.getStore('LoginSuccessJsonStore');
        var userId = LoginSuccessStore.data.items[0].data.userId;

        var url = Ext.getStore('ConfigStore').getAt(0).get('OrderServerUrl');
        Ext.Ajax.request({
            url: url + '/hg/car/direct/add.do',
            params: {

                carsetId: carsetId,
                carId: carId,
                color: color,
                directPrice: directPrice * 10000,
                financialPlan: financialPlan,
                dayPay: dayPay,
                image: ImageUrlField.getValue(),
                type: type,
                operatorId: userId

            },
            success: function (response) {
                var text = response.responseText;
                var result = JSON.parse(text);

                if (result === null) {
                    Ext.Msg.alert('提示', '保存出错了，结果：' + text);
                    return;
                }

                if (result.succeed === true) {
                    Ext.Msg.alert('提示', '保存成功');

                    CarBrandField.reset();
                    CarsetField.reset();
                    ImageUrlField.reset();
                    CartypeField.reset();
                    VehicleSourceField.reset();
                    FinancialContentsField.reset();
                    dayPaymentField.reset();
                    GuidepriceField.reset();
                    CarColorField.reset();

                } else {
                    Ext.Msg.alert('提示', '保存出错了，错误：' + result.errMsg);
                }
            }
        });

    },

    onHgCarDirectsaleFormRender: function (component, eOpts) {
        var carBrandStore = Ext.getStore('CarBrandStord');

        if (carBrandStore.data.length > 0) {
            return;
        }
        var ajaxProxy = carBrandStore.getProxy();
        var url = Ext.getStore('ConfigStore').getAt(0).get('CarBrandServerUrl');
        ajaxProxy.setUrl(url + "/car/queryBrand");
        carBrandStore.load();
    }

});
