function isHexaColor(sNum) {
	var color = sNum.substring(1, sNum.length);
  	return (typeof color === "string") && color.length === 6 && ! isNaN(parseInt(color, 16));
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function applyUserInterfaceStyle(color) {
    try { document.querySelector(".mdl-layout__content").style.background = palette.get(color, '100'); } catch (e) {}
  	try { document.querySelector(".mdl-layout__header").style.background = palette.get(color, '500'); } catch (e) {}
	  try { document.querySelector(".mdl-switch__thumb").style.background = palette.get(color, '500'); } catch (e) {}
	  try { document.querySelector(".mdl-button--raised").style.background = palette.get(color, '500');	} catch (e) {}
	  
    // If a background rectangle is currenty displayed, fill this element with the user's color
    var backgroundRect = document.getElementById('background-rect');
    if (backgroundRect !== null) {
		    backgroundRect.setAttribute("fill", palette.get(color, '100'));
	  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isImageAccessible(image_url) {
    try {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;
    } catch (e) {
        console.error('Image @' + image_url + ' is not accessible.');
        return false;
    }
}

function isBrowserSupported() {
    var isChromium = window.chrome;
    var vendorName = window.navigator.vendor;
    var isOpera = window.navigator.userAgent.indexOf("OPR") > -1;
    var isSafari = false;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
            // Nothing.
        } else {
            isSafari = true;
        }
    }
    if (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false || isSafari == true) {
        return true;
    } else {
        window.location.href = '/notsupported';
    }
}

function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}