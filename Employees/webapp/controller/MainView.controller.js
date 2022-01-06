// @ts-nocheck
// @ts-ignore
sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/ui/model/Filter", 
    "sap/ui/model/FilterOperator" 
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */

    function (Controller, Filter, FilterOperator) {
        "use strict";

        function onInit() {
            var oJSONModel = new sap.ui.model.json.JSONModel();
            var oView = this.getView();
            var i18nBundle = oView.getModel("i18n").getResourceBundle();

            // var oJson = {
            //     employeeId : "123456", 
            //     countryKey : "UK", 
            //     listCountry : [
            //         {   
            //             key : "US", 
            //             text : i18nBundle.getText("countryUS")
            //         },
            //         {   
            //             key : "UK", 
            //             text : i18nBundle.getText("countryUK")
            //         }, 
            //         {   
            //             key : "ES", 
            //             text : i18nBundle.getText("countryES")
            //         }                                                
            //     ] 
            // }; 

            // oJSONModel.setData(oJson);

            oJSONModel.loadData("./localService/mockdata/Employees.json", false);
            oJSONModel.attachRequestCompleted(function (oEventModel) {
                console.log(JSON.stringify(oJSONModel.getData()));

            });
            oView.setModel(oJSONModel);

        }

        function onFilter(){
            //get object JSON
            var oJson = this.getView().getModel().getData();

            //declare var filter 
            var filters = [];

            //Check if the field input 'EmployeeId' is not empty 
            if (oJson.EmployeeId !=="") {
                filters.push(new Filter("EmployeeId", FilterOperator.EQ, oJson.EmployeeId));
            }

            //Check if input: CountryKey is not empty 
            if (oJson.CountryKey !=="") {
                filters.push(new Filter("Country", FilterOperator.EQ, oJson.CountryKey));
            }
            var oList = this.getView().byId("tableEmployee");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters);
        }

        function onClearFilter(){
            var oModel = this.getView().getModel();
            oModel.setProperty("/EmployeeId","");
            oModel.setProperty("/CountryKey","");
        }

        var Main = Controller.extend("logaligroup.Employees.controller.MainView", {});

        // Main.prototype.onLiveChange = function () {
        //     var inputEmployee = this.byId("inputEmployee");
        //     // @ts-ignore
        //     var valueEmployee = inputEmployee.getValue();

        //     if (valueEmployee.length === 6) {
        //         // @ts-ignore
        //         //inputEmployee.setDescription("OK");
        //         this.byId("labelCountry").setVisible(true);
        //         this.byId("slCountry").setVisible(true);
        //     } else {
        //         // @ts-ignore
        //         //inputEmployee.setDescription("Not OK");
        //         this.byId("labelCountry").setVisible(false);
        //         this.byId("slCountry").setVisible(false);
        //     }

        // }

        Main.prototype.onInit        = onInit;
        Main.prototype.onFilter      = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        return Main;
    });
