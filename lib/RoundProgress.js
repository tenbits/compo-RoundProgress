// source /src/exports.es6
/*!
 * RoundProgress Component v0.5.3
 * MIT license
 * http://opensource.org/licenses/MIT
 */
"use strict";

(function (root, factory) {
	var _global = typeof global !== "undefined" ? global : window,
	    _mask = _global.mask || _global.atma && _global.atma.mask;

	if (_mask == null && typeof require === "function") {
		_mask = require("maskjs");
	}
	if (_mask == null) {
		throw Error("MaskJS was not loaded");
	}
	factory(_global, _mask);
})(undefined, function (global, mask) {

	mask.define("RoundProgress", mask.Compo({
		v: "0.5.3",
		meta: {
			template: "merge",
			attributes: {
				percent: 0,
				width: 200,
				"line-width": 15,
				"line-cap": "round",
				"line-color": "cyan",
				"bg-line-color": "#efefef",
				rotate: 0 },
			mode: "client"
		},
		tagName: "div",
		attr: {
			"class": "round-progress",
			style: "width:~[$.xWidth]px; height: ~[$.xWidth]px;"
		},
		template: "\n\t\t\tstyle {\n\t\t\t\t.round-progress {\n\t\t\t\t\tposition: relative;\n\t\t\t\t\tdisplay: table;\n\t\t\t\t}\n\t\t\t\t.round-progress__canvas {\n\t\t\t\t\tdisplay: block;\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\ttop: 0; left: 0;\n\t\t\t\t\twidth: 100%; height: 100%;\n\t\t\t\t}\n\t\t\t\t.round-progress__title {\n\t\t\t\t\twidth: 100%;\n\t\t\t\t\theight: 100%;\n\t\t\t\t\tdisplay: table-cell;\n\t\t\t\t\tvertical-align: middle;\n\t\t\t\t\ttext-align: center;\n\t\t\t\t\tfont-weight: bold;\n\t\t\t\t\tfont-size: 1.3em;\n\t\t\t\t}\n\t\t\t}\n\t\t\tcanvas .round-progress__canvas;\n\t\t\tspan .round-progress__title >\n\t\t\t\t@title;\n\t\t",
		compos: {
			canvas: "canvas",
			span: "span"
		},
		onRenderEnd: function onRenderEnd(els) {
			this.canvasCtx = this.compos.canvas.getContext("2d");
		},
		onEnterFrame: function onEnterFrame() {
			this.clear_();
			this.drawBgLine_();
			this.drawFgLine_();
		},
		onAttributeSet: function onAttributeSet(key, val) {
			if (key === "width") {
				var el = this.$[0];
				el.style.width = val + "px";
				el.style.height = val + "px";
			}
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
			var lineWidth = this.xLineWidth,
			    ctx = this.canvasCtx,
			    w = this.xWidth,
			    radius = (w - lineWidth) / 2;

			ctx.beginPath();
			ctx.arc(0, 0, radius, 0, Math.PI * 2 * (percent / 100), false);
			ctx.strokeStyle = color;
			ctx.lineCap = this.xLineCap;
			ctx.lineWidth = lineWidth;
			ctx.stroke();
		}
	}));
});
//# sourceMappingURL=exports.es6.map
// end:source /src/exports.es6