/*!
 * jQuery DOM Line plugin v0.1.1
 * Copyright (c) 2011 Gilmore Davidson
 * https://gilmoreorless.github.com/jquery-dom-line/
 * Licensed under the MIT licence
 */
;(function ($, undefined) {
	function checkPoint(point) {
		if (point.x === undefined && point.y === undefined) {
			return false;
		}
		point.x = parseFloat(point.x) || 0;
		point.y = parseFloat(point.y) || 0;
		return point;
	}
	
	var calcCache = {};
	function calcPosition(from, to, calc) {
		var cacheId = [from.x, from.y, to.x, to.y, calc.w, calc.h].join(',');
		if (calcCache[cacheId]) {
			return calcCache[cacheId];
		}
		// Calculate dimensions
		var xDiff = Math.abs(to.x - from.x),
			yDiff = Math.abs(to.y - from.y),
			hypot = (!xDiff || !yDiff) ? xDiff || yDiff : Math.sqrt(xDiff * xDiff + yDiff * yDiff),
			minX  = Math.min(from.x, to.x),
			minY  = Math.min(from.y, to.y),
			halfX = minX + xDiff / 2,
			halfY = minY + yDiff / 2,
			theta,
			left  = halfX - hypot / 2,
			top   = halfY,
			pos = calcCache[cacheId] = {
				width: hypot
			};
		
		// Account for width/height/margin offsets
		(calc.w > 1) && (pos.width -= (calc.w - 1));
		(calc.h > 1) && (top -= calc.h / 2);
		left = Math.round(left - calc.l);
		top  = Math.round(top - calc.t);
		pos.width = Math.round(pos.width);
		
		// Work out angle
		if (!xDiff) {
			theta = from.y < to.y ? 90 : 270;
		} else if (!yDiff) {
			theta = from.x < to.x ? 0 : 180;
		} else {
			// Angle calculation taken from Raphaël
			theta = (180 + Math.atan2(from.y - to.y, from.x - to.x) * 180 / Math.PI + 360) % 360;
		}
		pos.transform = 'translate(' + left + 'px,' + top + 'px) rotate(' + theta + 'deg)';
		
		// Add calculated properties for later manipulation
		pos.extra = {
			center: {
				x: halfX,
				y: halfY
			},
			rotation: {
				deg: theta,
				rad: theta % 360 * Math.PI / 180
			}
		};
		
		// New object so later manipulation outside this function doesn't affect the cache
		return $.extend({}, pos);
	}
	
	$.line = function (from, to, options) {
		from = checkPoint(from);
		to = checkPoint(to);
		if (!from || !to) {
			return false;
		}
		
		// Create div element
		var opts = $.extend({}, $.line.defaults, options || {}),
			$elem = opts.elem ? $(opts.elem) : $('<div/>', {
				'class': opts.className
			}),
			css = {
				position: 'absolute',
				backgroundColor: opts.lineColor,
				width: 1,
				height: opts.lineWidth
			},
			pos,
			extra,
			returnVal = $elem;
		$elem.css(css);
		$elem[0].parentNode || $elem.appendTo('body');
		
		// Work out position, accounting for element dimensions
		pos = calcPosition(from, to, {
			w: $elem.outerWidth(),
			h: $elem.outerHeight(),
			l: parseFloat($elem.css('marginLeft')) || 0,
			t: parseFloat($elem.css('marginTop')) || 0
		});
		extra = pos.extra;
		delete pos.extra;
		$elem.css(pos);
		
		// Build object if returnValues option is true
		if (opts.returnValues) {
			returnVal = {
				from: from,
				to: to,
				center: extra.center,
				rotation: extra.rotation
			};
		}
		
		return returnVal;
	};
	
	$.line.defaults = {
		elem: '',
		className: 'jquery-line',
		lineWidth: 1,
		lineColor: '#000',
		returnValues: false
	}
})(jQuery);
