sap.ui.require([
	"sap/ui/test/Opa5",
	"sap/ui/demo/todo/test/integration/pages/Common",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/actions/Press"

], function (Opa5, Common, AggregationLengthEquals, Properties, EnterText, Press) {
	"use strict";

	var sAddToItemInputId = "addTodoItemInput",
		sSearchTodoItemsInputId = "searchTodoItemsInput",
		sClearCompletedId = "clearCompleted",
		sItemsLeftLabelId = "itemsLeftLabel";

	Opa5.createPageObjects({
		onTheAppPage: {
			baseClass: Common,
			actions: {

				iEnterTextForNewItemAndPressEnter: function(sText) {
					return this.waitFor({
						id: sAddToItemInputId,
						actions: [new EnterText({ text: sText })],
						errorMessage: "The text cannot be entered"
					});
				},

				// iEnterTextForSearchAndPressEnter: function(sText) {
				// 	return this.waitFor({
				// 		id: sSearchTodoItemsInputId,
				// 		actions: [new EnterText({ text: sText })],
				// 		errorMessage: "The text cannot be entered"
				// 	});
				// },

				iClearTheCompletedItems: function() {
					return this.waitFor({
						id: sClearCompletedId,
						actions: [new Press()],
						errorMessage: "The 'Clear Completed' button cannot be pressed"
					});
				},

				// iFilterForItems: function(filterKey) {
				// 	return this.waitFor({
				// 		controlType: "sap.m.SegmentedButtonItem",
				// 		matchers: [
				// 			new Properties({ key: filterKey })
				// 		],
				// 		actions: [new Press()],
				// 		errorMessage: "SegmentedButton can not be pressed"
				// 	});
				// }
			},

			assertions: {

				// iShouldSeeTheLastItemBeingCompleted: function(bSelected) {
				// 	return this.waitFor({
				// 		id: sItemListId,
				// 		matchers: [function(oControl) {
				// 			var iLength = oControl.getItems().length;
				// 			var oInput = oControl.getItems()[iLength - 1].getContent()[0];
				// 			return bSelected && !oInput.getEnabled() || !bSelected && oInput.getEnabled();
				// 		}],
				// 		success: function() {
				// 			Opa5.assert.ok(true, "The last item is marked as completed");
				// 		},
				// 		errorMessage: "The last item is not disabled."
				// 	});
				// },
				// iShouldSeeAllButOneItemBeingRemoved: function(sLastItemText) {
				// 	return this.waitFor({
				// 		id: sItemListId,
				// 		matchers: [new AggregationLengthEquals({
				// 			name: "items",
				// 			length: 1
				// 		}), function(oControl) {
				// 			var oInput = oControl.getItems()[0].getContent()[0];
				// 			return new PropertyStrictEquals({
				// 				name: "value",
				// 				value: sLastItemText
				// 			}).isMatching(oInput);
				// 		}],
				// 		success: function() {
				// 			Opa5.assert.ok(true, "The table has 1 item, with '" + sLastItemText + "' as Last item");
				// 		},
				// 		errorMessage: "List does not have expected entry '" + sLastItemText + "'."
				// 	});
				// },
				// iShouldSeeItemLeftCount: function(iNumberItemsLeft) {
				// 	return this.waitFor({
				// 		id: sItemsLeftLabelId,
				// 		matchers: [new PropertyStrictEquals({
				// 			name: "text",
				// 			value: iNumberItemsLeft + (iNumberItemsLeft === 1 ? " item left" : " items left")
				// 		})
				// 		],
				// 		success: function() {
				// 			Opa5.assert.ok(true, "" + iNumberItemsLeft + " items left");
				// 		},
				// 		errorMessage: "Items are not selected."
				// 	});
				// },
				// iShouldSeeItemCount: function(iItemCount) {
				// 	return this.waitFor({
				// 		id: sItemListId,
				// 		matchers: [new AggregationLengthEquals({
				// 			name: "items",
				// 			length: iItemCount
				// 		})],
				// 		success: function() {
				// 			Opa5.assert.ok(true, "The table has " + iItemCount + " item(s)");
				// 		},
				// 		errorMessage: "List does not have expected number of items '" + iItemCount + "'."
				// 	});
				// }

			}
		}
	});

});
