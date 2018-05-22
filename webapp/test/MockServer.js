sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/ui/demo/todo/const"

], function (MockServer, CONST) {
	"use strict";

	var _lastTodoItemId = 0;

	function _getNewItemGuid() {
		var sNewId = (++_lastTodoItemId).toString();
		return 	"0MOCKSVR-TODO-MKII-DYNK-00000000".substr(0, 32 - sNewId.length) + sNewId;
	}

	return {

		init: function() {
			var oUriParameters = jQuery.sap.getUriParameters(),
				sJsonFilesUrl = jQuery.sap.getModulePath("sap/ui/demo/todo/model"),
				sManifestUrl = jQuery.sap.getModulePath("sap/ui/demo/todo/manifest", ".json"),
				oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
				oMainDataSource = oManifest["sap.app"].dataSources.mainService,
				// ensure there is a trailing slash
				sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/",
				sMetadataUrl = jQuery.sap.getModulePath("sap/ui/demo/todo/model/metadata", ".xml"),
				oMockServer;

			// init the inner mockserver
			oMockServer = new MockServer({
				rootUri: sMockServerUrl
			});

			// configure mock server with a delay of 1s
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: (oUriParameters.get("serverDelay") || 1000)
			});

			// load local mock data
			oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl: sJsonFilesUrl,
			});

			if (oUriParameters.get("sap-ui-debug") === "true") {
				// Trace requests
				Object.keys(MockServer.HTTPMETHOD).forEach(function(sMethodName) {
					var sMethod = MockServer.HTTPMETHOD[sMethodName];
					oMockServer.attachBefore(sMethod, function(oEvent) {
						var oXhr = oEvent.getParameters().oXhr;
						console.log("MockServer::before", sMethod, oXhr.url, oXhr);
					});
					oMockServer.attachAfter(sMethod, function(oEvent) {
						var oXhr = oEvent.getParameters().oXhr;
						console.log("MockServer::after", sMethod, oXhr.url, oXhr);
					});
				});
			}

			// Generate random items
			var aTodoItemSet = oMockServer.getEntitySetData(CONST.OData.entityNames.todoItemSet);
			for (var idx = 0; idx < 100; ++idx) {
				var oNewTodoItemSet = {},
					sGuid = _getNewItemGuid();
				oNewTodoItemSet[CONST.OData.entityProperties.todoItem.guid] = sGuid;
				oNewTodoItemSet[CONST.OData.entityProperties.todoItem.title] = "Random stuff " + idx;
				oNewTodoItemSet[CONST.OData.entityProperties.todoItem.completionDate] = null;
				oNewTodoItemSet.__metadata = {
					id: "/odata/TODO_SRV/TodoItemSet(guid'" + sGuid + "')",
					uri: "/odata/TODO_SRV/TodoItemSet(guid'" + sGuid + "')",
					type: "TODO_SRV.TodoItem"
				}
				aTodoItemSet.push(oNewTodoItemSet);
			}
			oMockServer.setEntitySetData(CONST.OData.entityNames.todoItemSet, aTodoItemSet);

			oMockServer.start();
		},

		/**
		 * @public returns the mockserver of the app, should be used in integration tests
		 * @returns {sap.ui.core.util.MockServer} the mockserver instance
		 */
		getMockServer: function() {
			return oMockServer;
		}
	};

});
