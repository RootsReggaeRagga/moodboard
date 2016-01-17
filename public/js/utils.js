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
	var backgroundRect = document.getElementById('background-rect');
	if (backgroundRect !== null) {
		backgroundRect.setAttribute("fill", palette.get(color, '100'));
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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