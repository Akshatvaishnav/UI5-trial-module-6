sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/resource/ResourceModel"
], (Controller, JSONModel,MessageBox, MessageToast, ResourceModel) => {
    var oModel;
    var oResourceModel;
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
            oModel = new JSONModel();//object creation for json model
            oResourceModel = this.getView().getModel("i18n"); // declaring the resource model
            var personalInfoJson = [{
                "Name": "Jacob",
                "Tel": "+1212121212",
                "Email": "jacob@email.com",
                "address": {
                    "street": "700 oak Street",
                    "city": "Brockton",
                    "country": "US"
                }
            }, {
                "Name": "Mathew",
                "Tel": "+1212122221212",
                "Email": "mathew@email.com",
                "address": {
                    "street": "591 Memorial Dr",
                    "city": "Chicopee",
                    "country": "US"
            }
            }];
            oModel.setData(personalInfoJson);
            this.getView().setModel(oModel, "Items");

            var oComboBoxModel = new sap.ui.model.json.JSONModel({
                Countries: [
                    { key:"DE", text:"Germany" },
                    { key:"US", text:"United States" },
                    { key:"IN", text:"India" }
                ]
            });
            this.getView().setModel(oComboBoxModel,"countries");
        },
        onConfirmationMessageBoxPress: function () {
			MessageBox.confirm("Password Changed");
		},
        onClearBoxPress: function () {
			MessageBox.confirm("Clear value!");
        },
        handleLinkPress: function (evt) {
			alert("Link was clicked!");
		},
        onPressSuccess: function () {
            oResourceModel = this.getView().getModel("i18n").getResourceBundle();
            MessageBox.show(oResourceModel.getText("btnSuccess"));
            //alert("Success Button is clicked");
        },
        onPressReject: function () {
            alert("Reject Button is clicked");
        },
        onjavascriptfilterMethod: function () {
            var customers = [
                {
                    Address: "Udaipur",
                    Zipcode: "313205",
                },
                {
                    Address: "Mumbai",
                    Zipcode: "30005"
                },
                {
                    Address: "Banglore",
                    Zipcode: "30001"
                }
            ];
            let response = customers.filter(function(Zipcode){
                return Zipcode.Zipcode == "30001";
            });
            oModel.setData(response[0]);
            this.getView().setModel(oModel,"filterModel")
        },
    		handleMessageToastPress: function(oEvent) {
			var msg = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\r\n eirmod.';
			MessageToast.show(msg);
		},
        onConfirmationPress: function(){
            var username = this.getView().byId("input-a").getValue();
            var Password = this.getView().byId("input-b").getValue();
            var CoinfirmPassword = this.getView().byId("input-c").getValue();

            MessageBox.show(username+" , "+Password+" , "+CoinfirmPassword)
        }
    });
});