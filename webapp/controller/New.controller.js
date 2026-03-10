sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/m/Dialog",
    "sap/m/StandardListItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, History, UIComponent, Dialog, List, StandardListItem) {

        "use strict";

        return Controller.extend("project1.controller.New", {
            onInit: function () {
                //creating jsonmodel
                var oModel = new JSONModel(sap.ui.require.toUrl("project1/model/SubaccountDetails.json"));
                //assinging json model to the view
                oModel.attachRequestCompleted(function () {
                    this.getView().setModel(oModel);
                }.bind(this));
                //var router = this.getOwnerComponent().getRouter(this);
                
                
            },

            _onRouteMatched: function (oEvent) {
                // Get the parameter
                var oData = oEvent.getParameter("arguments").data;

                console.log("Received String:", oData);

                // You can now use it to bind the SmartTable, fetch data, etc.
            },
            onNavPress: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteView1", {}, true);
                }
            },
            onSearchFilterbar: function (oEvent) {

                var aFilter1, aFilter2, aFilter3;
                var sDate = oEvent.getParameters('0').selectionSet[0].getDateValue();
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "YYYY-MM-DD" });
                var sFormatedData = dateFormat.format(sDate);
                var eDate = oEvent.getParameters('0').selectionSet[1].getDateValue();
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "YYYY-MM-DD" });
                var eFormatedData = dateFormat.format(eDate);
                var oAccountId = oEvent.getParameters('0').selectionSet[2].getValue();
                // var oAccountId1 = this.getView().byId("input2").getValue();
                // console.log(oAccountId+""+oAccountId1);

                if (sDate !== null && eDate !== null) {
                    aFilter1 = new sap.ui.model.Filter("startIsoDate", sap.ui.model.FilterOperator.Contains, sFormatedData);
                    aFilter2 = new sap.ui.model.Filter("endIsoDate", sap.ui.model.FilterOperator.Contains, eFormatedData);
                    this.getView().byId("idSubaccountTable").getBinding("rows").filter([aFilter1, aFilter2]);
                }

                if (oAccountId !== null) {
                    aFilter3 = new sap.ui.model.Filter("subaccountName", sap.ui.model.FilterOperator.EQ, oAccountId);
                    this.getView().byId("idSubaccountTable").getBinding("rows").filter([aFilter3]);
                }


            },
            onClear: function (oEvent) {
                var sDate = oEvent.getParameters('0').selectionSet[0].getDateValue();
                var eDate = oEvent.getParameters('0').selectionSet[1].getDateValue();
                var oAccountId = oEvent.getParameters('0').selectionSet[2].getValue();

                if (oAccountId) {
                    this.getView().byId("input2").setValue("");
                }
            },
            onPressDialog: function() {
            //alert("Hello you hvae pressed dialog button");

if (!this.pDialog) {
    this.pDialog = this.loadFragment({
        name: "project1.view.fragment.EmployeesAddDetails"
    });
   }
     this.pDialog.then(function(oDialog) {
     oDialog.open();
})
        }
            
        });
    });