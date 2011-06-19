(function ($, undefined) {
	function checkPoint(point) {
		if (point.x === undefined && point.y === undefined) {
			return false;
		}
		point.x = parseFloat(point.x) || 0;
		point.y = parseFloat(point.y) || 0;
		return point;
	}
	
	var calcCache = {};
	function calcPosition(from, to) {
		var cacheId = [from.x, from.y, to.x, to.y].join(',');
		if (calcCache[cacheId]) {
			return calcCache[cacheId];
		}
		// Calculate dimensions
		var xDiff = Math.abs(to.x - from.x),
			yDiff = Math.abs(to.y - from.y),
			hypot = (!xDiff || !yDiff) ? xDiff || yDiff : Math.sqrt(xDiff * xDiff + yDiff * yDiff),
			minX = Math.min(from.x, to.x),
			minY = Math.min(from.y, to.y),
			halfX = minX + xDiff / 2,
			halfY = minY + yDiff / 2,
			theta,
			// TODO: left/top needs to account for line thickness
			pos = calcCache[cacheId] = {
				left: halfX - hypot / 2,
				top: halfY,
				width: hypot
			};
		
		// Work out angle
		if (!xDiff) {
			theta = from.y < to.y ? 90 : 270;
		} else if (!yDiff) {
			theta = from.x < to.x ? 0 : 180;
		} else {
			// Angle calculation taken from Raphaël
			theta = (180 + Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI + 360) % 360;
		}
		pos.transform = 'rotate(' + theta + 'deg)';
		console.log('x: %d / y: %d / h: %f / t: %f', xDiff, yDiff, hypot, theta);
		
		return pos;
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
			css = $.extend({
				position: 'absolute',
				backgroundColor: opts.lineColor,
				height: opts.lineWidth
			// Work out position
			}, calcPosition(from, to));
		
		return $elem.css(css).appendTo('body');
	};
	
	$.line.defaults = {
		elem: '',
		className: 'jquery-line',
		lineWidth: 1,
		lineColor: '#000'
	}
})(jQuery);
