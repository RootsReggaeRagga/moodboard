function searchUser(e) {
    if (e.keyCode == 13) {
    	document.getElementById('canvas').innerHTML = '<rect id="background-rect" x="0%" y="0%" width="100%" height="100%" fill="#F5F5F5"/>';
        doload(document.getElementById("fixed-header-drawer-exp").value)
        return false;
    }
}
/*
function changeSection(section) {
	var sections = ['myboard', 'friends', 'random', 'customize'];
	for (var s in sections) {
	  document.getElementById(sections[s]).className = document.getElementById(sections[s]).className.replace(' is-active', '');
	}
	// Show requested view
	document.getElementById(section).className += ' is-active';

	switch(section) {
	    case 'myboard':
	        // TODO: Call good function
	        break;
	    case 'friends':
	        // TODO: Call good function
	        break;
	    case 'random':
	    	// TODO: Call good function
	    	break;
	    case 'customize':
	    	loadApparencePanel();
	    	break;
	}

	// Hide left panel
	document.getElementById('left-panel').className = document.getElementById('left-panel').className.replace(' is-visible', '');
}*/

function loadApparencePanel() {
	// Load user data
	var userData = getJSONFile(authentifiedUser);

	if (userData != null) {
		// Display his values
		document.getElementById('backgroundcolor').value = palette.get(userData.apparences[0].colorpalette, '100');
	}
}

function getJSONFile(user) {
	var d = null;
    $.ajax({
        url: 'data/dataset_' + user + '.json',
        dataType: 'json',
        async: false,
        success: function(data) {
            d = data;
        }
    });
    return d;
}

function isHexaColor(sNum) {
	var color = sNum.substring(1, sNum.length);
  	return (typeof color === "string") && color.length === 6 && ! isNaN(parseInt(color, 16));
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

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
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

function showALert() {
	console.log('alerrrt');
}