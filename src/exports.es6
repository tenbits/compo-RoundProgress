/*!
 * RoundProgress Component v%IMPORT(version)%
 * MIT license
 * http://opensource.org/licenses/MIT
 */
(function(root, factory){
	var _global = typeof global !== 'undefined' ? global : window,
		_mask = _global.mask || (_global.atma && _global.atma.mask);

	if (_mask == null && typeof require === 'function') {
		_mask = require('maskjs');
	}
	if (_mask == null) {
		throw Error('MaskJS was not loaded');
	}
	factory(
		_global,
		_mask
	);
}(this, function(global, mask){

	mask.define('RoundProgress', mask.Compo({
		v: '%IMPORT(version)%',
		meta: {
			template: 'merge',
			attributes: {
				'percent': 0,
				'width': 200,
				'line-width': 15,
				'line-cap': 'round',
				'line-color': 'cyan',
				'bg-line-color': '#efefef',
				'rotate': 0,
			},
			mode: 'client'
		},
		tagName: 'div',
		attr: {
			'class': 'round-progress',
			'style': 'width:~[$.xWidth]px; height: ~[$.xWidth]px;'
		},
		template: `
			style {
				.round-progress {
					position: relative;
					display: table;
				}
				.round-progress__canvas {
					display: block;
					position: absolute;
					top: 0; left: 0;
					width: 100%; height: 100%;
				}
				.round-progress__title {
					width: 100%;
					height: 100%;
					display: table-cell;
					vertical-align: middle;
					text-align: center;
					font-weight: bold;
					font-size: 1.3em;
				}
			}
			canvas .round-progress__canvas;
			span .round-progress__title >
				@title;
		`,
		compos: {
			canvas: 'canvas',
			span: 'span'
		},
		onRenderEnd (els) {
			this.canvasCtx = this.compos.canvas.getContext('2d');
		},
		onEnterFrame () {
			this.clear_();
			this.drawBgLine_();
			this.drawFgLine_();
		},
		onAttributeSet (key, val) {
			if (key === 'width') {
				var el = this.$[0];
				el.style.width  = val + 'px';
				el.style.height = val + 'px';
			}
		},
		clear_ () {
			var w = this.xWidth;
			var rotate = this.xRotate;
			this.compos.canvas.width = this.compos.canvas.height = w;
			this.canvasCtx.translate(w / 2, w / 2);
			this.canvasCtx.rotate((-1 / 2 + rotate / 180) * Math.PI);
		},
		drawBgLine_ () {
			this.drawLine_(this.xBgLineColor, 100);
		},
		drawFgLine_ () {
			this.drawLine_(this.xLineColor, this.xPercent);
		},
		drawLine_ (color, percent) {
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
}));
