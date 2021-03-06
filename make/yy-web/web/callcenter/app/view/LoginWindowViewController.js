/*
 * File: app/view/LoginWindowViewController.js
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

Ext.define('CallCenterApp.view.LoginWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginwindow',

    onUserFieldBlur: function(component, event, eOpts) {

        var successCallback = function(resp, ops) {
            //alert(resp.responseText);
            var result = JSON.parse(resp.responseText);

            if(result.errno==="PT_ERROR_USER_NOTEXIST"){


                Ext.Msg.alert("登录提示","用户名不存在");

                component.reset();
                component.focus(component,100);

                return;
            }
            var PrelogonStore = Ext.getStore('PreloginStore');
            PrelogonStore.removeAll();
            PrelogonStore.add(result.data);


        };

        // Failure
        var failureCallback = function(resp, ops) {
            Ext.Msg.alert('Login Failure', "用户名校验错误，请稍后重试!");
        };
        var phone=component.getValue();
        var url = Ext.getStore('ConfigStore').getAt(1).get('UserServerUrl');
        Ext.Ajax.request({
            url: url+"/user/prelogon.do",
            params:{

                phone:phone,
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    onUserFieldRender: function(component, eOpts) {
        var phone=Ext.util.Cookies.get("userName");
        if(phone!==null&&phone!==undefined){
            component.setValue(phone);
        }
        component.focus();
    },

    onLoginBtnClick: function(button, e, eOpts) {
        var loginWnd = button.up('#loginWindow');
        var userField = loginWnd.down('#userField');
        var pwdField = loginWnd.down('#pwdField');

        if (!userField.validate() || !userField.validate()) {
            Ext.Msg.alert('警告', '请正确填写信息.');
            return;
        }
        // Success
        var successCallback = function(resp, ops) {
            Ext.util.Cookies.set("userName", userField.getValue());

            var result = JSON.parse(resp.responseText);
            if(result.flag==="0"){
                /**登录成功，将返回参数存储LoginSuccessJsonStore中*/
                var LoginSuccessStore = Ext.getStore('LoginSuccessJsonStore');
                LoginSuccessStore.removeAll();
                LoginSuccessStore.add(result.data);
                /**--------------------------------------------------------------*/

                /**--------------------------登录成功注册消息中心-----------------------------------*/
                var userId=result.data.userId;

                var ws=new WebSocket('ws://' + window.location.host+'/api/messagesalertHandler?userId='+userId);


                ws.onopen = function () {
                    //CONNECTING (0)：表示还没建立连接；
                    //OPEN (1)： 已经建立连接，可以进行通讯；
                    //CLOSING (2)：通过关闭握手，正在关闭连接；
                    //CLOSED (3)：连接已经关闭或无法打开；
                    if(this.readyState===3){
                        Ext.Msg.alert('消息中心提示', '连接出错了：连接已经关闭或无法打开！');
                    }

                };
                ws.onmessage = function (event) {

                    var win= new Ext.window.Toast({
                        html: event.data,
                        title: '订单消息提醒',
                        width: 400,
                        height:200,
                        autoCloseDelay:30000,
                        border:true,
                        frame:true,
                        frameHeader:true,
                        align: 'br',
                        bodyStyle: {
                            background:'#ffc',
                            padding: '10px'
                        }
                    });

                    win.show();

                };
                ws.onclose=function(event){

                };



                /**登录成功，页面转向**/
                loginWnd.close();
                var mainView = new CallCenterApp.view.MainView({ws:ws});
                mainView.show();
            }else{

                alert("登录失败!"+result.msg);
            }

        };

        // Failure
        var failureCallback = function(resp, ops) {

            Ext.Msg.alert('Login Failure', resp);

        };

        /**获取PreloginStore中的data----------------------------------*/
        var PrelogonStore = Ext.getStore('PreloginStore');
        if(PrelogonStore.getData().length<1){//未预登录或者预登录失败情况

            this.onUserFieldBlur(userField,null,null);
            return;

        }
        var extraKey=PrelogonStore.getData().items[0].data.extraKey;
        var salt=PrelogonStore.getData().items[0].data.salt;
        /**----------------------------------------------------------*/
        var password1=Ext.MD5(pwdField.getValue()+salt);

        var url = Ext.getStore('ConfigStore').getAt(1).get('UserServerUrl');
        Ext.Ajax.request({
            url: url+"/user/logon.do",
            params:{
                phone:userField.getValue(),
                pwd:Ext.MD5(password1+extraKey),
                //verify:verifyField.getValue
            },
            success: successCallback,
            failure: failureCallback
        });


    },

    onLoginWindowRender: function(component, eOpts) {
        var userField=component.down('#userField');
        userField.isFocusable(true);

    }

});
