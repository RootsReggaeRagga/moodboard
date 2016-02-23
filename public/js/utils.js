function isHexaColor(sNum) {
	var color = sNum.substring(1, sNum.length);
  	return (typeof color === "string") && color.length === 6 && ! isNaN(parseInt(color, 16));
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function applyUserInterfaceStyle(color) {
    try { document.querySelector(".mdl-layout__content").style.background = palette.get(color, '100'); } catch (e) {}
  	try { document.querySelector(".md-toolbar-tools").style.background = palette.get(color, '500'); } catch (e) {}
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

function hideLeftPanel(event) {
   var target = event.target;
   if (target !== null) {
       if (hasClass(target, 'mdl-navigation__link') || hasClass(target, 'txt-menu-left') || hasClass(target, 'icon-menu-left')) {
           // It's a link that was just clicked, then, hide the left panel
           var obfuscator = document.getElementsByClassName('mdl-layout__obfuscator');
           eventFire(obfuscator[0], 'click');
       }
   }
}

function searchUser(event) {
    if (event.keyCode==13) {
        var searchedUser = event.target.value;
        window.location.href = '/#!/' + searchedUser;
        event.target.value = '';
        event.target.click();
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}