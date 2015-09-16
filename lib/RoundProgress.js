// source /src/exports.es6
/*!
 * RoundProgress Component v0.5.0
 *
 * MIT license
 * http://opensource.org/licenses/MIT
 *
 * (c) 2012, 2015
 */
"use strict";

(function (root, factory) {
	var _global = typeof global !== "undefined" ? global : window,
	    _mask = _global.mask || _global.atma && _global.atma.mask;

	if (_mask == null) {
		if (typeof require === "function") {
			mask = require("maskjs");
		} else {
			throw Error("MaskJS was not loaded");
		}
	}

	factory(_global, _mask, _mask.Compo.config.getDOMLibrary());
})(undefined, function (global, mask, $) {

	var Ctor = Compo({
		meta: {
			template: "merge",
			attributes: {
				percent: {
					"default": 50,
					easing: "100ms linear"
				},
				width: 200,
				"line-width": 15,
				"line-cap": "round",
				"line-color": "cyan",
				"bg-line-color": "#efefef",
				"bg-color": "red",
				rotate: 0,
				"?title": null },
			mode: "client"
		},
		tagName: "div",
		attr: {
			"class": "RoundProgress"
		},
		template: " div {\n\t\t\t\tstyle scoped {\n\t\t\t\t\t:host {\n\t\t\t\t\t\twidth: 200px;\n\t\t\t\t\t\theight: 200px;\n\t\t\t\t\t\tposition: relative;\n\t\t\t\t\t}\n\t\t\t\t\tcanvas {\n\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\theight: 100%;\n\t\t\t\t\t\tdisplay: block;\n\t\t\t\t\t}\n\t\t\t\t\tspan {\n\t\t\t\t\t\tdisplay: block;\n\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\tmargin: auto;\n\t\t\t\t\t\ttext-align: center;\n\t\t\t\t\t\tleft: 0; right: 0; bottom: 0; top: 0;\n\t\t\t\t\t\theight: 1.3em;\n\t\t\t\t\t\tfont-weight: bold;\n\t\t\t\t\t\tfont-size: 1.3em;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tcanvas;\n\t\t\t\tspan > '~[bind: $.xTitle || (($.xPercent | 0) + \"%\")]'\n\t\t\t}\n\t\t",
		compos: {
			canvas: "canvas",
			span: "span"
		},
		onRenderEnd: function onRenderEnd(model, ctx, container) {
			this.canvasCtx = this.compos.canvas.getContext("2d");
		},
		onEnterFrame: function onEnterFrame() {
			this.clear_();
			this.drawBgLine_();
			this.drawFgLine_();
		},
		clear_: function clear_() {
			var w = this.xWidth;
			var rotate = this.xRotate;
			this.compos.canvas.width = this.compos.canvas.height = w;
			this.canvasCtx.translate(w / 2, w / 2);
			this.canvasCtx.rotate((-1 / 2 + rotate / 180) * Math.PI);
		},
		drawBgLine_: function drawBgLine_() {
			this.drawLine_(this.xBgLineColor, 100);
		},
		drawFgLine_: function drawFgLine_() {
			this.drawLine_(this.xLineColor, this.xPercent);
		},
		drawLine_: function drawLine_(color, percent) {
			var w = this.xWidth;

			var lineWidth = this.xLineWidth;
			var radius = (w - lineWidth) / 2;
			var ctx = this.canvasCtx;
			ctx.beginPath();
			ctx.arc(0, 0, radius, 0, Math.PI * 2 * (percent / 100), false);
			ctx.strokeStyle = color;
			ctx.lineCap = this.xLineCap;
			ctx.lineWidth = lineWidth;
			ctx.stroke();
		}
	});

	mask.define("RoundProgress", Ctor);
});
//# sourceMappingURL=exports.es6.map
// end:source /src/exports.es6