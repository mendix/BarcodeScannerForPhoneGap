/*global cordova */
require([
	"mxui/widget/_WidgetBase",
	"mxui/dom",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/_base/declare"
], function (_WidgetBase, mxuiDom, dojoClass, dojoConstruct, declare) {

	// Declare widget.
	return declare("BarcodeScannerForPhoneGap.widget.BarcodeScannerForPhoneGap", [ _WidgetBase ], {

		// Coding guideline, internal variables start with "_".
		// internal variables.
		_wxnode : null,

		_hasStarted : false,
		_contextObj : null,
		_button : null,

		// Externally executed mendix function to create widget.
		startup: function() {
			if (this._hasStarted)
				return;

			this._hasStarted = true;

			// Setup widget
			this._setupWidget();

			// Create childnodes
			this._createChildnodes();

			// Setup events
			this._setupEvents();
		},

		update: function (obj, callback) {
			this._contextObj = obj;

			if (callback)
				callback();
		},

		_setupWidget: function() {
            // Set class for domNode
			dojoClass.add(this.domNode, "wx-barcodescanner-container");

            // Empty domnode of this and appand new input
            dojoConstruct.empty(this.domNode);
        },

		// Internal event setup.
		_setupEvents : function() {
			// Attach only one event to dropdown list.
			dojo.connect(this._button, "click", function(evt){
				// The barcode function has a success, failure and a reference to this.
				if (typeof cordova !== "undefined"){
					cordova.plugins.barcodeScanner.scan(
						this.barcodeSuccess.bind(this),
						this.barcodeFailure.bind(this)
					);
				} else {
					window.alert("Unable to detect camera.");
				}
			}.bind(this));
		},

		barcodeSuccess : function(output) {
			if (output.cancelled === false && output.text && output.text.length > 0) {
				this._contextObj.set(this.attributeName, output.text);
				this._executeMicroflow(this.onchangemf);
			}
		},

		barcodeFailure : function(error) {
			var html = "Scanning failed: " + error;
			dojo.create("div", { innerHTML: html }, this._wxnode);
		},


		_executeMicroflow: function(mf) {
			if (mf && this._contextObj) {
				mx.data.action({
					params: {
						actionname: mf,
						applyto: "selection",
						guids: [ this._contextObj.getGuid() ]
					},
					error: function() {}
				});
			}
		},

		_createChildnodes: function() {

			this._button = mxuiDom.create("div", {
				"class": "wx-mxwxbarcodescanner-button btn btn-primary"
			}, this.buttonLabel || "Scan barcode.");

			if (this.buttonClass){
				dojoClass.add(this._button, this.buttonClass);
			}

			this.domNode.appendChild(this._button);
		}

	});
});

require(["BarcodeScannerForPhoneGap/widget/BarcodeScannerForPhoneGap"], function () {});