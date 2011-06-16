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
		var xDiff = to.x - from.x,
			yDiff = to.y - from.y,
			hypot = (!xDiff || !yDiff) ? xDiff || yDiff : Math.sqrt(xDiff * xDiff + yDiff * yDiff),
			theta,
			pos = calcCache[cacheId] = {
				left: Math.min(from.x, to.x),
				top: Math.min(from.y, to.y),
				width: hypot
			};
		
		if (!xDiff) {
			theta = from.y < to.y ? 90 : 270;
		} else if (!yDiff) {
			theta = from.x < to.x ? 0 : 180;
		} else {
			theta = Math.random() * 360;
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
			$elem = $('<div/>', {
				'class': opts.className
			}),
			// TODO: make these options
			css = $.extend({
				position: 'absolute',
				backgroundColor: '#F00',
				height: '1px'
			// Work out position
			}, calcPosition(from, to));
		
		return $elem.css(css).appendTo('body');
	};
	
	$.line.defaults = {
		className: 'jquery-line'
	}
})(jQuery);
