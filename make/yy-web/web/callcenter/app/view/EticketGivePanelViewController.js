/*
 * File: app/view/EticketGivePanelViewController.js
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

Ext.define('CallCenterApp.view.EticketGivePanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eticketgivepanel',

    onEticketGiveButtonClick: function (button, e, eOpts) {
        var EticketGivePanel = button.up('#EticketGivePanel');

        var EticketInfoGridPanel = EticketGivePanel.down('#EticketInfoGridPanel');

        var eticketRecords = EticketInfoGridPanel.selModel.selected.items;
        if (eticketRecords.length < 1) {
            Ext.Msg.alert('提示', '请至少选择一种优惠券!');
            return;
        }


        var EticketMemberGridpanel = EticketGivePanel.down('#EticketMemberGridpanel');
        var memberRecords = EticketMemberGridpanel.selModel.selected.items;
        if (memberRecords.length < 1) {
            Ext.Msg.alert('提示', '请选择需要赠送优惠券的客户!');
            return;
        }

        var eticketRecordsArray = [];
        Ext.each(eticketRecords, function (item) {
            var f_id = item.data.f_id;
            var f_name = item.data.f_name;
            eticketRecordsArray.push({f_id: f_id, f_name: f_name});
        });

        var memberRecordsArray = [];
        Ext.each(memberRecords, function (item) {
            var f_mid = item.data.f_mid;
            var f_phone = item.data.f_phone;
            memberRecordsArray.push({f_mid: f_mid, f_phone: f_phone});
        });


        var url = Ext.getStore('ConfigStore').getAt(0).get('WebServerUrl');

        Ext.Ajax.request({
            url: url + '/action/etickets/give.do',
            params: {
                etickets: JSON.stringify(eticketRecordsArray),
                members: JSON.stringify(memberRecordsArray),
                system: 101,

            },
            success: function (response) {
                var text = response.responseText;
                var result = JSON.parse(text);

                if (result === null) {
                    Ext.Msg.alert('提示', '出错了，结果：' + text);
                    return;
                }

                if (result.succeed === true) {

                    var msg = result.object;
                    if (msg.length === 0) {
                        Ext.Msg.alert('提示', '保存成功');
                    } else {
                        var str = '';
                        Ext.each(msg, function (item) {
                            str = str + '<br>' + item.msg;
                        });
                        Ext.Msg.alert('赠送提示', '保存成功但部分优惠券未赠送：' + str);
                    }


                    /**1,保存成功后，第一步，刷新优惠券管理Grid***/
                    var EticketManagerStore = Ext.getStore('EticketManagerStore');
                    EticketManagerStore.reload();

                    /***2，第二步,清空客户选择Grid***/
                    EticketMemberGridpanel.getSelectionModel().deselectAll();

                } else {
                    Ext.Msg.alert('提示', '出错了，错误：' + result.errMsg);
                }
            }
        });
    },

    onSetSaveButtonClick: function (button, e, eOpts) {
        var EticketGivePanel = button.up('#EticketGivePanel');

        var EticketInfoGridPanel = EticketGivePanel.down('#EticketInfoGridPanel');
        /**获取优惠券列表页面当前选中记录**/
        var records = EticketInfoGridPanel.selModel.selected.items;
        if (records.length < 1) {
            Ext.Msg.alert('提示', '请选择至少一种优惠券设置');
            return;
        }
        var eticketInfoRecord = records[records.length - 1];
        var eticketId = eticketInfoRecord.data.f_id;

        var AutoRuleGridPanel = EticketGivePanel.down('#AutoRuleGridPanel');
        /**获取优惠券规则页面选中值**/
        var ruleRecords = AutoRuleGridPanel.selModel.selected.items;

        var ruleArray = [];
        if (ruleRecords.length > 0) {
            Ext.each(ruleRecords, function (item) {
                var f_arid = item.data.f_arid;
                ruleArray.push({f_arid: f_arid});
            });

        }


        var url = Ext.getStore('ConfigStore').getAt(0).get('WebServerUrl');

        Ext.Ajax.request({
            url: url + '/action/eticketBindRule/submit.do',
            params: {
                eticketId: eticketId,
                rules: JSON.stringify(ruleArray),
            },
            success: function (response) {
                var text = response.responseText;
                var result = JSON.parse(text);

                if (result === null) {
                    Ext.Msg.alert('提示', '出错了，结果：' + text);
                    return;
                }

                if (result.succeed === true) {

                    Ext.Msg.alert('提示', '保存成功');

                } else {
                    Ext.Msg.alert('提示', '出错了，错误：' + result.errMsg);
                }
            }
        });
    },

    onEticketInfoGridPanelRender: function (component, eOpts) {
        var EticketManagerStore = Ext.getStore('EticketManagerStore');

        var ajaxProxy = EticketManagerStore.getProxy();
        var url = Ext.getStore('ConfigStore').getAt(0).get('WebServerUrl');
        ajaxProxy.setUrl(url + "/action/eticket/list.do?system=ytadmin@7788&status=1");
        EticketManagerStore.load();


    },

    onEticketInfoGridPanelSelect: function (rowmodel, record, index, eOpts) {
        var AutoRuleGridPanel = Ext.getCmp('AutoRuleGridPanel');

        var selModel = AutoRuleGridPanel.getSelectionModel();
        selModel.clearSelections();
        AutoRuleGridPanel.getView().refresh();
        var id = record.data.f_id;

        var url = Ext.getStore('ConfigStore').getAt(0).get('WebServerUrl');
        Ext.Ajax.request({
            url: url + '/action/selectRecords/list.do',
            params: {
                eticketId: id,

            },
            success: function (response) {
                var text = response.responseText;
                var result = JSON.parse(text);
                if (result === null) {
                    Ext.Msg.alert('提示', '出错了，结果：' + text);
                    return;
                }

                if (result.succeed === true) {
                    var records = result.object.eticketRuleList;

                    var rulesRecord = selModel.store.data.items;

                    var arr = [];
                    for (var i = 0; i < rulesRecord.length; i++) {

                        for (var j = 0; j < records.length; j++) {

                            if (rulesRecord[i].data.f_arid === records[j].f_arid) {
                                arr.push(i);
                            }
                        }

                    }
                    selModel.select(arr);

                }
            }
        });

    },

    onAutoRuleGridPanelRend: function (component, eOpts) {
        var EticketRuleStore = Ext.getStore('EticketRuleStore');
        var ajaxProxy = EticketRuleStore.getProxy();
        var url = Ext.getStore('ConfigStore').getAt(0).get('WebServerUrl');
        ajaxProxy.setUrl(url + '/action/eticketRule/list.do');
        EticketRuleStore.load();

    },

    onMemberSelectBtnClick: function (button, e, eOpts) {
        var PtCustomerInfoStore = Ext.getStore('PtCustomerInfoStore');
        var ajaxProxy = PtCustomerInfoStore.getProxy();

        var EticketMemberPanel = button.up('#EticketMemberPanel');

        var phoneField = EticketMemberPanel.down('#phoneField');
        var phone = phoneField.getValue();
        var url = Ext.getStore('ConfigStore').getAt(1).get('UserServerUrl');
        if (phone !== '') {
            if (phone !== null && phone.length !== 11) {
                Ext.Msg.alert('提示', '手机号码为11位，请重新输入！');
                return;
            }


            ajaxProxy.setUrl(url + "/pt/cust/list.do?phone=" + phone);
        } else {
            ajaxProxy.setUrl(url + "/pt/cust/list.do");
        }


        PtCustomerInfoStore.load();

    },

    onEticketMemberGridpanelRender: function (component, eOpts) {
        var PtCustomerInfoStore = Ext.getStore('PtCustomerInfoStore');
        var ajaxProxy = PtCustomerInfoStore.getProxy();
        var url = Ext.getStore('ConfigStore').getAt(1).get('UserServerUrl');
        ajaxProxy.setUrl(url + '/pt/cust/list.do');
        PtCustomerInfoStore.load();
    }

});
