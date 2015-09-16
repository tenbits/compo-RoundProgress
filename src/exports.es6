/*!
 * RoundProgress Component v%IMPORT(version)%
 *
 * MIT license
 * http://opensource.org/licenses/MIT
 *
 * (c) 2012, %IMPORT(year)%
 */
(function(root, factory){
	var _global = typeof global !== 'undefined' ? global : window,
		_mask = _global.mask || (_global.atma && _global.atma.mask);

	if (_mask == null) {
		if (typeof require === 'function') {
			mask = require('maskjs');
		} else {
			throw Error('MaskJS was not loaded');
		}
	}

	factory(_global, _mask, _mask.Compo.config.getDOMLibrary());

}(this, function(global, mask, $){


	var Ctor = Compo({
		meta: {
			template: 'merge',
			attributes: {
				'percent': {
					'default': 50,
					'easing': '100ms linear'
				},
				'width': 200,
				'line-width': 15,
				'line-cap': 'round',
				'line-color': 'cyan',
				'bg-line-color': '#efefef',
				'bg-color': 'red',
				'rotate': 0,
				'?title': null,
			},
			mode: 'client'
		},
		tagName: 'div',
		attr: {
			'class': 'RoundProgress'
		},
		template: ` div {
				style scoped {
					:host {
						width: 200px;
						height: 200px;
						position: relative;
					}
					canvas {
						width: 100%;
						height: 100%;
						display: block;
					}
					span {
						display: block;
						position: absolute;
						margin: auto;
						text-align: center;
						left: 0; right: 0; bottom: 0; top: 0;
						height: 1.3em;
						font-weight: bold;
						font-size: 1.3em;
					}
				}
				canvas;
				span > '~[bind: $.xTitle || (($.xPercent | 0) + "%")]'
			}
		`,
		compos: {
			canvas: 'canvas',
			span: 'span'
		},
		onRenderEnd (model, ctx, container) {
			this.canvasCtx = this.compos.canvas.getContext('2d');
		},
		onEnterFrame () {
			this.clear_();
			this.drawBgLine_();
			this.drawFgLine_();
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

	mask.define('RoundProgress', Ctor);
}));
