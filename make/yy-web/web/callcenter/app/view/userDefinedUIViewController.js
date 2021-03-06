/*
 * File: app/view/userDefinedUIViewController.js
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

Ext.define('CallCenterApp.view.userDefinedUIViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userdefinedui',

    onUserDefinedUIMenuClick: function (menu, item, e, eOpts) {
        var mainView = Ext.getCmp('mainView');
        var contentPanel = mainView.getComponent('contentPanel');

        if (item.itemId == 'columnManageItem') {
            var columnManagePanel = contentPanel.getComponent('ColumnManagePanel');

            if (columnManagePanel === undefined) {
                columnManagePanel = new CallCenterApp.view.ColumnManagePanel({});

                contentPanel.add(columnManagePanel);
            }

            contentPanel.setActiveTab(columnManagePanel);

        } else if (item.itemId == 'carBrandManageItem') {
            var carBrandManagePanel = contentPanel.getComponent('CarBrandManagePanel');

            if (carBrandManagePanel === undefined) {
                carBrandManagePanel = new CallCenterApp.view.CarBrandManagePanel({});

                contentPanel.add(carBrandManagePanel);
            }

            contentPanel.setActiveTab(carBrandManagePanel);

        } else if (item.itemId == 'bannerManageItem') {
            var bannerManagePanel = contentPanel.getComponent('BannerManagePanel');

            if (bannerManagePanel === undefined) {
                bannerManagePanel = new CallCenterApp.view.BannerManagePanel({});

                contentPanel.add(bannerManagePanel);
            }

            contentPanel.setActiveTab(bannerManagePanel);

        } else if (item.itemId == 'activityManageItem') {
            var activityManagePanel = contentPanel.getComponent('ActivityManagePanel');

            if (activityManagePanel === undefined) {
                activityManagePanel = new CallCenterApp.view.ActivityManagePanel({});

                contentPanel.add(activityManagePanel);
            }

            contentPanel.setActiveTab(activityManagePanel);

        } else if (item.itemId == 'hotBrandManageItem') {
            var hotBrandManagePanel = contentPanel.getComponent('HotBrandManagePanel');

            if (hotBrandManagePanel === undefined) {
                hotBrandManagePanel = new CallCenterApp.view.HotBrandManagePanel({});

                contentPanel.add(hotBrandManagePanel);
            }

            contentPanel.setActiveTab(hotBrandManagePanel);

        } else if (item.itemId == 'hotCarsetManageItem') {
            var hotCarsetManagePanel = contentPanel.getComponent('HotCarsetManagePanel');

            if (hotCarsetManagePanel === undefined) {
                hotCarsetManagePanel = new CallCenterApp.view.HotCarsetManagePanel({});

                contentPanel.add(hotCarsetManagePanel);
            }

            contentPanel.setActiveTab(hotCarsetManagePanel);

        }
    }

});
