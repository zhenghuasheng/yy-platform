/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({
    models: [
        'EtcRecordModel',
        'DeptModel',
        'HgStatusModel',
        'EtcStatusModel',
        'InsStatusModel',
        'BizStatusModel',
        'SqdStatusModel',
        'SqdCallbackModel',
        'SqdOrderModel',
        'DeptBizmanModel',
        'PrelogonModel',
        'LoginSuccessModel',
        'EticketManagerModel',
        'AuthorStatusModel',
        'PrivateInfoModel',
        'AuthorityInfoModel',
        'LimitUseShopModel',
        'LimitUseServerModel',
        'EticketMemberStore',
        'EticketDestoryModel',
        'PtCustomerInfo',
        'EticketConsumerModel',
        'EticketInitDetailModel',
        'EticketGiveMagModel',
        'EticketRuleModel',
        'CarReportPriceModel',
        'CarOrderModel',
        'HgCarDirectModel',
        'CarTypeConfigModel',
        'CarsetModel',
        'BusinessSystemManagerModel',
        'ColumnManageModel',
        'BannerManageModel',
        'ActivityModel',
        'ActivityCarModel',
        'HotBrandModel',
        'HotCarsetModel',
        'adviceModel'
    ],
    stores: [
        'SexArrayStore',
        'MarryArrayStore',
        'HouseArrayStore',
        'EtcRecordStore',
        'ConfigStore',
        'DeptStore',
        'BizManStore',
        'HgStatusStore',
        'ProvinceStore',
        'CityStore',
        'DistrictStore',
        'EtcStatusStore',
        'InsStatusStore',
        'BizStatusStore',
        'SqdStatusStore',
        'SqdCallbackStore',
        'SqdOrderStore',
        'PreloginStore',
        'LoginSuccessJsonStore',
        'EticketTypeStore',
        'EticketManagerStore',
        'InsuranceCompany',
        'AuthorStatusStore',
        'StatusStore',
        'PrivateInfoStore',
        'AuthorityTreeStore',
        'limitUseShopStore',
        'limitUseServerStore',
        'EticketDestoryStore',
        'PtCustomerInfoStore',
        'EticketConsumerStore',
        'EticketInitDetailStore',
        'EticketGiveMagStore',
        'EticketRuleStore',
        'CarBrandStord',
        'CarsetStore',
        'CarTypeStore',
        'CarReportPriceStore',
        'CarOrderStore',
        'CarColorStore',
        'QuestionCustStore',
        'QuestionDetailStore',
        'VehicleSourceStore',
        'HgCarDrictStatusStore',
        'HgCarDirectStore',
        'CarOrdertypeStore',
        'CarOrderStatusStore',
        'CarTypeConfigStore',
        'CarMenuStore',
        'NewCarsetStore',
        'SystemConfigStore',
        'ColumnManageStore',
        'CarBrandOnStore',
        'BannerManageStore',
        'CarBrandOffStore',
        'ActivityStore',
        'BusinessSystemManagerStore',
        'ActivityCarStore',
        'ActivityTypeStore',
        'HotBrandStore',
        'HotCarsetStore',
        'AdviceStore'
    ],
    views: [
        'MainView',
        'HgRequestPanel',
        'HgStatusPanel',
        'EtcRecordPanel',
        'EtcBalancePanel',
        'SubmitWindow',
        'EtcRequestPanel',
        'EtcStatusPanel',
        'InsRequestPanel',
        'InsStatusPanel',
        'CustomerStatusPanel',
        'LoginWindow',
        'BizStatusPanel',
        'SqdStatusPanel',
        'SqdCallbackPanel',
        'eticketRequestPanel',
        'EticketManagerPanel',
        'InsuranceRequestPanel',
        'AuthorStatusPanel',
        'EditProfilePanel',
        'PasswordModifyForm',
        'PrivateInfoPanel',
        'RestPasswordPanel',
        'RightClickMenu',
        'AuthorityManagerPanel',
        'customerInfo',
        'hgBusiness',
        'xcBusiness',
        'insBusiness',
        'sqdBusiness',
        'syRentBusiness',
        'carShopBusiness',
        'IntegratedVehicle',
        'eticketBusiness',
        'privateOperate',
        'systemOprateAdmin',
        'messageBusiness',
        'MessageTabPanel',
        'EticketGivePanel',
        'EticketConsumePanel',
        'EticketGiveMagPanel',
        'EticketGiverulesPanel',
        'HgCarEnquiryRequestPanel',
        'HgCarOrderReuqestPanel',
        'BottomPriceSubmitPanel',
        'CarsetConfigPanel',
        'HgQuestionMagPanel',
        'HgCarDirectsalePanel',
        'HgCarDirectMagPanel',
        'Dscarbusiness',
        'SmsConsumerManagePanel',
        'CarsetImagAddPanel',
        'userDefinedUI',
        'BusinessSystemManagerPanel',
        'BusinessSystemRequestPanel',
        'ColumnManagePanel',
        'ColumnRequestPanel',
        'CarBrandManagePanel',
        'BannerManagePanel',
        'ActivityManagePanel',
        'ActivityRequestPanel',
        'ActivityCarRequestPanel',
        'HotBrandManagePanel',
        'HotCarsetManagePanel',
        'AdviceMagPanel',
        'AdviceReadWindow'
    ],
    name: 'CallCenterApp',

    launch: function() {
        Ext.create('CallCenterApp.view.CarsetImagAddPanel', {renderTo: Ext.getBody()});
    }

});
