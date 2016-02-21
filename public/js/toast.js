'use strict';

var lastPosition = {
	bottom: true,
	top: false,
	left: true,
	right: false
};

var toastPosition = $.extend({},lastPosition);

function getToastPosition() {
	sanitizePosition();
	return Object.keys(toastPosition)
	.filter(function(pos) { return toastPosition[pos]; })
	.join(' ');
};

function sanitizePosition() {
	var current = toastPosition;
	if ( current.bottom && lastPosition.top ) current.top = false;
	if ( current.top && lastPosition.bottom ) current.bottom = false;
	if ( current.right && lastPosition.left ) current.left = false;
	if ( current.left && lastPosition.right ) current.right = false;
	lastPosition = $.extend({},current);
}