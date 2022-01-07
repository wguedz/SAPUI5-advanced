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

            var oView = this.getView(); 

            var oJSONModelEmployees = new sap.ui.model.json.JSONModel();
            oJSONModelEmployees.loadData("./localService/mockdata/Employees.json", false);
            oView.setModel(oJSONModelEmployees, "jsonEmployees");

            var oJSONModelCountries = new sap.ui.model.json.JSONModel();            
            oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false);            
            oView.setModel(oJSONModelCountries,"jsonCountries");

            var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                visibleID : true, 
                visibleName : true, 
                visibleCountry: true, 
                visibleCity: false, 
                visibleBtnShowCity : true, 
                visibleBtnHideCity : false 
            });  
            
            oView.setModel(oJSONModelConfig, "oJSONModelConfig");

        }

        function onFilter(){
            //get object JSON
            var oJsonCountries = this.getView().getModel("jsonCountries").getData();

            //declare var filter 
            var filters = [];

            //Check if the field input 'EmployeeId' is not empty 
            if (oJsonCountries.EmployeeId !=="") {
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJsonCountries.EmployeeId));
            }

            //Check if input: CountryKey is not empty 
            if (oJsonCountries.CountryKey !=="") {
                filters.push(new Filter("Country", FilterOperator.EQ, oJsonCountries.CountryKey));
            }
            var oList = this.getView().byId("tableEmployee");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters);
        }

        function onClearFilter(){
            var oModel = this.getView().getModel("jsonCountries");
            oModel.setProperty("/EmployeeId","");
            oModel.setProperty("/CountryKey","");
        }

        function showPostalCode(oEvent){
            var itemPressed = oEvent.getSource();
            var oContext = itemPressed.getBindingContext();
            var ObjectContext = oContext.getObject();

            sap.m.MessageToast.show(ObjectContext.PostalCode);
        }

        function btnShowCity(){
            var oJSONModelConfig = this.getView().getModel("oJSONModelConfig");
            oJSONModelConfig.setProperty("/visibleCity",true);
            oJSONModelConfig.setProperty("/visibleBtnShowCity",false);
            oJSONModelConfig.setProperty("/visibleBtnHideCity",true);
        }

        function btnHideCity(){
            var oJSONModelConfig = this.getView().getModel("oJSONModelConfig");
            oJSONModelConfig.setProperty("/visibleCity",false);
            oJSONModelConfig.setProperty("/visibleBtnShowCity",true);
            oJSONModelConfig.setProperty("/visibleBtnHideCity",false);
        }

        var Main = Controller.extend("logaligroup.Employees.controller.MainView", {});

        Main.prototype.btnShowCity    = btnShowCity;
        Main.prototype.btnHideCity    = btnHideCity;
        Main.prototype.onInit         = onInit;
        Main.prototype.onFilter       = onFilter;
        Main.prototype.onClearFilter  = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        return Main;
    });
