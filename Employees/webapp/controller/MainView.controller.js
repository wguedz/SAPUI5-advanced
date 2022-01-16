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

        function showOrders(oEvent){

            var ordersTable = this.getView().byId("ordersTable");
            
            ordersTable.destroyItems(); 

            var itemPressed = oEvent.getSource();
            var oContext = itemPressed.getBindingContext("jsonEmployees");
            var ObjectContext = oContext.getObject();
            var orders = ObjectContext.Orders;
            //debugger;
            var ordersItems = []; 
            for (var i in orders){

                ordersItems.push(new sap.m.ColumnListItem({
                    cells : [
                        new sap.m.Label({text : orders[i].OrderID}),
                        new sap.m.Label({text : orders[i].Freight}),
                        new sap.m.Label({text : orders[i].ShipAddress}) 
                    ]
                }));
                
            }

            var newTable = new sap.m.Table({
                width : "auto", 
                columns : [
                    new sap.m.Column({header : new sap.m.Label({text : "{i18n>OrderID}"})}), 
                    new sap.m.Column({header : new sap.m.Label({text : "{i18n>Freight}"})}), 
                    new sap.m.Column({header : new sap.m.Label({text : "{i18n>ShipAddress}"})})
                ], 
                items : ordersItems
            }).addStyleClass("sapUiSmallMargin");

            ordersTable.addItem(newTable);

            /** */
            var newTableJSON = new sap.m.Table();
            newTableJSON.setWidth("auto");
            newTableJSON.addStyleClass("sapUiSmallMargin");

            var columnOrderID = new sap.m.Column();
            var labelOrderID = new sap.m.Label();
            labelOrderID.bindProperty("text","i18n>OrderID");
            columnOrderID.setHeader(labelOrderID);
            newTableJSON.addColumn(columnOrderID);

            var columnFreight = new sap.m.Column();
            var labelFreight = new sap.m.Label();
            labelFreight.bindProperty("text","i18n>Freight");
            columnFreight.setHeader(labelFreight);
            newTableJSON.addColumn(columnFreight);

            var columnShipAddress = new sap.m.Column();
            var labelShipAddress = new sap.m.Label();
            labelShipAddress.bindProperty("text","i18n>ShipAddress");
            columnShipAddress.setHeader(labelShipAddress);
            newTableJSON.addColumn(columnShipAddress);

            var columnListItem = new sap.m.ColumnListItem();
            
            var cellOrderID = new sap.m.Label();
            cellOrderID.bindProperty("text","jsonEmployees>OrderID");
            columnListItem.addCell(cellOrderID);
            
            var cellFreight = new sap.m.Label();
            cellFreight.bindProperty("text","jsonEmployees>Freight");
            columnListItem.addCell(cellFreight);
             
            var cellShipAddress = new sap.m.Label();
            cellShipAddress.bindProperty("text","jsonEmployees>ShipAddress");
            columnListItem.addCell(cellShipAddress);

            var oBindingInfo = {
                model : "jsonEmployees", 
                path : "Orders", 
                template: columnListItem
            };

            newTableJSON.bindAggregation("items", oBindingInfo);
            newTableJSON.bindElement("jsonEmployees>" + oContext.getPath());

            ordersTable.addItem(newTableJSON);

        }

        var Main = Controller.extend("logaligroup.Employees.controller.MainView", {});

        Main.prototype.btnShowCity    = btnShowCity;
        Main.prototype.btnHideCity    = btnHideCity;
        Main.prototype.onInit         = onInit;
        Main.prototype.onFilter       = onFilter;
        Main.prototype.onClearFilter  = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        Main.prototype.showOrders     = showOrders; 
        return Main;
    });
