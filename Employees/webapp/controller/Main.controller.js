// @ts-nocheck
// @ts-ignore
sap.ui.define([
    "sap/ui/core/mvc/Controller",  
],
function(Controller) {

    return Controller.extend("logaligroup.Employees.controller.Main", {

        onInit : function(){

            var oView = this.getView(); 

            var oJSONModelEmployees = new sap.ui.model.json.JSONModel();
            oJSONModelEmployees.loadData("./localService/mockdata/Employees.json", false);
            oView.setModel(oJSONModelEmployees, "jsonEmployees");

            var oJSONModelCountries = new sap.ui.model.json.JSONModel();            
            oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false);            
            oView.setModel(oJSONModelCountries,"jsonCountries");

            var oJSONModelCountries = new sap.ui.model.json.JSONModel();            
            oJSONModelCountries.loadData("./localService/mockdata/Layouts.json", false);            
            oView.setModel(oJSONModelCountries,"jsonLayouts");

            var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                visibleID : true, 
                visibleName : true, 
                visibleCountry: true, 
                visibleCity: false, 
                visibleBtnShowCity : true, 
                visibleBtnHideCity : false 
            });  
            
            oView.setModel(oJSONModelConfig, "oJSONModelConfig");
            
            this._bus = sap.ui.getCore().getEventBus();

            this._bus.subscribe("flexible","showEmployee", this.showEmployeeDetails,this);

        }, 

        showEmployeeDetails : function(category, nameEvent, path){
            var detailView = this.getView().byId("detailsEmployeesView");
            detailView.bindElement("jsonEmployees>" + path);

            this.getView().getModel("jsonLayouts").setProperty("/ActivateKey","TwoColumnsMidExpanded");
        }

    });

});