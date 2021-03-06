/*
 * File: app/view/BottomPriceSubmitPanelViewController.js
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

Ext.define('CallCenterApp.view.BottomPriceSubmitPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bottompricesubmitpanel',

    onSubmitBtnClick: function(button, e, eOpts) {
        var BottomPriceSubmitPanel=button.up('#BottomPriceSubmitPanel');
        var bottomPriceField=BottomPriceSubmitPanel.down('#bottomPriceField');

        var orderRecord=BottomPriceSubmitPanel.record;
        var askPriceRecord=BottomPriceSubmitPanel.askPriceRecord;

        if(orderRecord.f_status!==1){
            Ext.Msg.alert('提示','该订单已报价,不能重复提交，请确认！');
            return;
        }

        var bottomPrice=bottomPriceField.getValue();
        if(bottomPrice===0){
            Ext.Msg.alert('提示','请填写报价价格信息！');
            return;
        }



        Ext.MessageBox.confirm('请确认价格正确', '此价格是客户下单购车金额,您确认提交吗？', function(btn){
            if(btn==='no'){
                return;
            }else if(btn==='yes'){


                /**获取LoginSuccessJsonStore中的data**/
                var LoginSuccessStore = Ext.getStore('LoginSuccessJsonStore');
                var userId=LoginSuccessStore.data.items[0].data.userId;
                var userName=LoginSuccessStore.data.items[0].data.userName;

                var url = Ext.getStore('ConfigStore').getAt(0).get('OrderUrl');
                Ext.Ajax.request({
                    url: url + '/biz/order/report.do',
                    params: {
                        f_ofid:orderRecord.f_ofid,

                        f_bottomprice:bottomPrice*10000,

                        f_ncname:askPriceRecord.f_ncname,

                        f_saleman:askPriceRecord.f_saleman,

                        f_salephone:askPriceRecord.f_salephone,

                        f_operatorid:userId,

                        f_operator:userName

                    },
                    success: function (response) {
                        var text = response.responseText;
                        var result = JSON.parse(text);

                        if (result === null) {
                            Ext.Msg.alert('提示', '提交出错了，结果：' + text);
                            return;
                        }

                        if (result.succeed === true) {
                            Ext.Msg.alert('提示', '报价成功');
                        } else {
                            Ext.Msg.alert('提示', '报价出错了，错误：' + result.errMsg);
                        }
                    }
                });

            }
        });


    },

    onBottomPriceSubmitPanelBeforeRender: function(component, eOpts) {
        var orderRecord=component.record;

        var askPriceRecord=component.askPriceRecord;

        var cartypeField=component.down('#cartype');

        var carcolorField=component.down('#carcolor');
        var bottomPriceField=component.down('#bottomPriceField');

        var submitBtn=component.down('#submitBtn');
        var FllowupBtn=component.down('#FllowupBtn');

        if(orderRecord.f_type===1){/**直销车辆**/

            cartypeField.hide();
            carcolorField.hide();
            bottomPriceField.hide();
            submitBtn.hide();
            FllowupBtn.show();

        }else{/**底价车辆**/



            cartypeField.setValue(askPriceRecord.f_carbrand+'-'+askPriceRecord.f_carset+'-'+askPriceRecord.f_cartype);


            carcolorField.setValue(orderRecord.f_color);


            if(orderRecord.f_status!==1){
                var bottomPrice=orderRecord.bottomPrice;
                if(bottomPrice!==undefined){
                    bottomPriceField.setValue(bottomPrice/10000);
                }

                bottomPriceField.setDisabled(true);
            }else{
                bottomPriceField.setValue(askPriceRecord.f_price/10000);
            }


        }


    },

    onFllowupBtnClick: function(button, e, eOpts) {
        var BottomPriceSubmitPanel=button.up('#BottomPriceSubmitPanel');

        var orderRecord=BottomPriceSubmitPanel.record.data;


        /**获取LoginSuccessJsonStore中的data**/
        var LoginSuccessStore = Ext.getStore('LoginSuccessJsonStore');
        var userId=LoginSuccessStore.data.items[0].data.userId;
        var url = Ext.getStore('ConfigStore').getAt(0).get('OrderServerUrl');
        Ext.Ajax.request({
            url: url + '/hg/carorder/inquire.do',
            params: {
                orderId:orderRecord.orderId,
                operatorId:userId

            },
            success: function (response) {
                var text = response.responseText;
                var result = JSON.parse(text);

                if (result === null) {
                    Ext.Msg.alert('提示','跟进失败！');
                    return;
                }

                if (result.succeed === true) {
                    Ext.Msg.alert('提示', '跟进成功');
                } else {
                    Ext.Msg.alert('提示', '跟进出错了，错误：' + result.errMsg);
                }
            }
        });
    }

});
