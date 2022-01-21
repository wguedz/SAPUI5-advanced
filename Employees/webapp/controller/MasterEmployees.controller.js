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
            this._bus = sap.ui.getCore().getEventBus();
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

        function showOrders(oEvent){
       
            var iconPressed = oEvent.getSource();

            var oContext = iconPressed.getBindingContext("jsonEmployees");

            if (!this._oDialogOrders){
                this._oDialogOrders = sap.ui.xmlfragment("logaligroup.Employees.fragment.DialogOrders",this);
                this.getView().addDependent(this._oDialogOrders);
            }   

            this._oDialogOrders.bindElement("jsonEmployees>" + oContext.getPath());
            this._oDialogOrders.open();
        }

        function onCloseOrders(){
            this._oDialogOrders.close();
        }

        function showEmployee(oEvent) {
            var path = oEvent.getSource().getBindingContext("jsonEmployees").getPath();
            this._bus.publish("flexible","showEmployee",path);
        }

        var Main = Controller.extend("logaligroup.Employees.controller.MasterEmployees", {});

        Main.prototype.btnShowCity    = btnShowCity;
        Main.prototype.btnHideCity    = btnHideCity;
        Main.prototype.onInit         = onInit;
        Main.prototype.onFilter       = onFilter;
        Main.prototype.onClearFilter  = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        Main.prototype.showOrders     = showOrders;  
        Main.prototype.onCloseOrders  = onCloseOrders;
        Main.prototype.showEmployee   = showEmployee;
        return Main;
    });
