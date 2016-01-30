'use strict';

const SVG = "http://www.w3.org/2000/svg";
const XLINK = "http://www.w3.org/1999/xlink";
const hotspot = "rgba(110,100,100,0.15)";
var r2d = 360.0 / (2.0 * Math.PI);
var gCanvas = null;
var currentTransform = null;
var gCanvasWidth = null;
var gCanvasHeight = null;
var images = [];
var videos = [];
var links = [];
var invalid_img = 'img/invalid_img.png';
var backgroundcolor;
var edgeColor;
var db;
var clicks = 0;

function doload(userData) {

    // Check if Chrome or Safari browser
    // if (!isBrowserSupported()) return;

    var u = userData._username.toUpperCase();
    edgeColor = userData.apparences[0].edgeofpictures;
    images = getImagesFromUserJsonData(userData);
    videos = getVideosFromUserJsonData(userData);
    links = getLinksFromUserJsonData(userData);
    applyUserInterfaceStyle(userData.apparences[0].colorpalette);

    // Get main canvas & retrieve width/height
    gCanvas = document.getElementById("canvas");

    gCanvasWidth = gCanvas.offsetWidth;
    gCanvasHeight = gCanvas.offsetHeight;

    // Load the images in the background, and only add them once they're
    // loaded (and, presumably, cached by the broser)
    for (var k = 0; k < images.length; k++) {
        var img = new Image();

        // If image is not accessible or link broken, use a default image :/
        //simages[k] = isImageAccessible(images[k]) ? images[k] : invalid_img;

        // do some hackyness here to get the correct variables to the function
        img.onload = function(k, url) {
            return function() {
                var g = addImage(url, 1.0, this);
                g.style.opacity = 1.0;
                g.vTranslate = [
                    Math.floor((Math.random() * gCanvasWidth * 0.4) + gCanvasWidth * 0.3),
                    Math.floor((Math.random() * gCanvasHeight * 0.5) + gCanvasHeight * 0.3)
                ];

                var c = 0.25 + (Math.random() * .25);
                g.vScale = c; // 0.25; // 0.001;
                g.vRotate = (Math.random() * 40) - 20;

                g.setAttribute('transform', 
                    'translate(' + g.vTranslate[0] + ',' + g.vTranslate[1] + ') ' +
                    'scale(' + g.vScale + ',' + g.vScale + ') ' +
                    'rotate(' + g.vRotate + ') '
                );
                rampOpacityUp(g, 0.45);
            }
        }(k, images[k]);

        img.src = images[k];
    }

    // Loading videos
    // TODO: To the loading in a different thread.
    /*var vids = [];
    for (var i = 0, iLen = videos.length; i < iLen; i++) {
        vids.push(addVideo(videos[i]));
    }

    for (var j = 0, jLen = vids.length; j < jLen; j++) {
        (function(j) {
            var hideToolsTimeOut;
            var vid = document.getElementById(vids[j]);
            var moveVidButton = vid.firstChild.childNodes[1].firstChild;
            moveVidButton.addEventListener('mousedown', function(evt) {
                onMouseDown(evt, vid);
            }, false);
            moveVidButton.addEventListener('mouseup', onMouseUp, false);
            vid.addEventListener('mouseover', function(evt) {
                var panel = document.getElementById('tools-' + vid.id);
                panel.classList.remove('invisible');
                panel.classList.add('visible');
            }, false);
            vid.addEventListener('mouseout', function(evt) {
                hideToolsTimeOut = setTimeout(function() {
                    var panel = document.getElementById('tools-' + vid.id);
                    panel.classList.remove('visible');
                    panel.classList.add('invisible');
                }, 1500);
            }, false);
        }(j));
    }*/

    gCanvas.addEventListener("mousemove", onMouseMove, false);
    gCanvas.addEventListener("mouseup", onMouseUp, false);
    document.getElementById("background-rect").addEventListener("mousemove", onMouseMove, false);
    document.getElementById("background-rect").addEventListener("mouseup", onMouseUp, false);
}

function getImagesFromUserJsonData(userData) {
    var images = [];
    for (var i = 0; i < userData.images.length; i++) {
        images.push(userData.images[i].url);
    }
    return images;
}

function getVideosFromUserJsonData(userData) {
    var videos = [];
    for (var i = 0; i < userData.videos.length; i++) {
        videos.push(userData.videos[i].url);
    }
    return videos;
}

function getLinksFromUserJsonData(userData) {
    var links = [];
    for (var i = 0; i < userData.images.length; i++) {
        links.push(userData.images[i].link);
    }
    return links;
}

// convenience function to set X, Y, width, and height attributes
function svgSetXYWH(el, x, y, w, h) {
    el.setAttribute("x", x);
    el.setAttribute("y", y);
    el.setAttribute("width", w);
    el.setAttribute("height", h);
}

function startTransform(ev, group, what) {
    // Ignore if something else is already going on
    if (currentTransform !== null) {
        return;
    }

    // Move element
    currentTransform = {
        what: what,
        g: group,
        s: group.vScale,
        r: group.vRotate,
        t: group.vTranslate,
        x: ev.clientX,
        y: ev.clientY
    };

    rampOpacityDown(currentTransform.g);
}

// create a new clickable rect [x,y,w,h] with the givenfill/stroke
// with the given handler on mouse down
function newClickableRect(group, id, x, y, w, h, fill, stroke) {
    var p = document.createElementNS(SVG, "rect");
    p.setAttribute("id", id);
    svgSetXYWH(p, x, y, w, h);
    p.setAttribute("rx", 30);
    p.setAttribute("ry", 30);
    p.setAttribute("fill", fill);

    // Stroke arround the picture
    // p.setAttribute("stroke", stroke);
    // p.setAttribute("stroke-width", 10);

    p.addEventListener('mousedown', function(evt) {
        var g = group;
        return startTransform(evt, g, 1);
    }, false);
    return p;
}

// create all the elements for the given image URL.
// this includes the toplevel group, the image itself,
// and the clickable hotspots used for rotating the image.
var nextImageId = 0;
var nextVideoId = 0;
/*
function addVideo(url) {
    var vidw = 560;
    var vidh = 349;

    var id = nextVideoId++;
    var s = 'video-' + id;

    var video = [];

    var x = Math.floor(Math.random() * (gCanvasWidth - vidw)) + 1;
    var y = Math.floor(Math.random() * (gCanvasHeight - vidh)) + 1;

    // Container
    video += '<g id="' + s + '"><foreignObject width="' + 610 + '" height="' + vidh + '" x="' + x + '" y="' + y + '">';

    // iFrame
    video += '<iframe xmlns="http://www.w3.org/1999/xhtml" width="' + vidw + '" height="' + vidh + '" src="' + url + '" frameborder="0"></iframe>';

    // Side panel to move iframe (video)
    video += '<div id="tools-' + s + '" class="invisible" style="width:48px; height:' + vidh + 'px; float:right; overflow: auto;">';
    video += '<label id="move-' + s + '" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">open_with</i></label>';
    video += '<label id="crop-' + s + '" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">crop</i></label>';
    video += '</div>';

    video += '</foreignObject></g>';

    gCanvas.innerHTML += video;

    return s;
}
*/

function addImage(url, initOpacity, img) {
    var imgw = img.width > 550 && img.height > 500 ? img.width : img.width * 2;
    var imgh = img.width > 550 && img.height > 500 ? img.height : img.height * 2;

    var id = nextImageId++;
    var s = "image" + id;
    var g = document.createElementNS(SVG, 'g');
    g.setAttribute("id", s);

    if (initOpacity !== null) {
        g.style.opacity = initOpacity;
    }

    var image = document.createElementNS(SVG, 'image');
    image.setAttribute("id", s + '-img');
    svgSetXYWH(image, -imgw / 2, -imgh / 2, imgw, imgh);
    image.setAttribute("preserveAspectRatio", "xMinYMin slice");
    image.setAttributeNS(XLINK, "href", url);
    g.appendChild(image);

    var rect = document.createElementNS(SVG, "rect");
    rect.setAttribute("id", s + "-border");
    svgSetXYWH(rect, -imgw / 2, -imgh / 2, imgw, imgh);
    rect.setAttribute("stroke", edgeColor);
    rect.setAttribute("rx", "10");
    rect.setAttribute("ry", "10");
    rect.setAttribute("stroke-width", "10");
    rect.setAttribute("fill", "none");

    g.appendChild(rect);

    var g2 = document.createElementNS(SVG, "g");
    g2.setAttribute("id", s + "-overlay");
    g2.setAttribute("class", "image-overlay");
    g2.setAttribute("style", "visibility: hidden");

    var rsz = 200;

    g2.appendChild(newClickableRect(g, s + "-tl", -imgw / 2, -imgh / 2, rsz, rsz, hotspot, "rgba(100,100,100,0.5)"));
    g2.appendChild(newClickableRect(g, s + "-tr", imgw / 2 - rsz, -imgh / 2, rsz, rsz, hotspot, "rgba(100,100,100,0.5)"));
    g2.appendChild(newClickableRect(g, s + "-br", imgw / 2 - rsz, imgh / 2 - rsz, rsz, rsz, hotspot, "rgba(100,100,100,0.5)"));
    g2.appendChild(newClickableRect(g, s + "-bl", -imgw / 2, imgh / 2 - rsz, rsz, rsz, hotspot, "rgba(100,100,100,0.5)"));

    g.appendChild(g2);
    g.addEventListener('mouseover', function(evt) {
        var o = g2;
        o.style.visibility = 'visible';
    }, false);
    g.addEventListener('mouseout', function(evt) {
        var o = g2;
        o.style.visibility = 'hidden';
    }, false);

    g.addEventListener('mousedown', function(evt) {
        onMouseDown(evt, g);
    }, false);

    gCanvas.appendChild(g);

    return g;
}

function redirectToLink(elementId) {
    var id = parseInt(elementId.replace('image', ''));
    var win = window.open(links[id], '_blank');
    win.focus();
}

function removeElement(element) {
    var toRemove = document.getElementById(element.id);
    var parent = document.getElementById(element.id).parentNode;
    parent.removeChild(toRemove);
}

function zoomElement(evt, element) {
    var headerHeight = 56;
    element.setAttribute('zoom', 'true');

    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight - headerHeight;

    var imageWidth = element.firstChild.width.animVal.value;
    var imageHeight = element.firstChild.height.animVal.value;

    var sc = 1;
    var zoom = 0.8;
    var type = imageWidth > imageHeight ? 'landscape' : 'portrait';

    if (type === 'landscape') {
        // Landscape image
        var expectedWidth = viewportWidth * zoom;
        sc = expectedWidth / imageWidth;

        // Change the type of the image if the height is too important
        if ((imageHeight * sc) > (viewportHeight * zoom)) {
            type = 'portrait';
        }
    }

    if (type === 'portrait') {
        // Portrait image
        var expectedHeight = viewportHeight * zoom;
        sc = expectedHeight / imageHeight;
    }

    // Transform image to zoom mode
    var translateWidth = (((viewportWidth - (imageWidth * sc)) + (imageWidth * sc)) / 2);
    var translateHeight = (((viewportHeight - (imageHeight * sc)) + (imageHeight * sc)) / 2) + headerHeight;

    element.setAttribute('transform', 
        'translate(' + translateWidth + ', ' + translateHeight + ') ' +
        'scale(' + sc + ',' + sc + ') '+
        'rotate(0)'
    );
}

function deplace(evt, g) {
    return startTransform(evt, g, 0);
}

/*
 * Bring an element foreground
 */
function foreground(g) {
    document.getElementById('canvas').appendChild(g);
}

function onMouseDown(evt, g) {
    evt.preventDefault();
    clicks++;
    setTimeout(function() {
        clicks = 0;
    }, 500);

    foreground(g); // Bring element foreground

    if (clicks >= 2) {
        if (g.hasAttribute('zoom')) {
            removeElement(g); // Remove element
        } else {
            zoomElement(evt, g); // Zoom to element
        }
        clicks = 0;
    } else {
        deplace(evt, g); // Move element
    }
}

function onMouseUp(ev) {
    if (currentTransform) {
        rampOpacityUp(currentTransform.g);
    }
    currentTransform = null;
}

function onMouseMove(ev) {
    // Discard treatment if an element is currently moving
    if (!('currentTransform' in window) || currentTransform == null) return;

    var ex = ev.clientX;
    var ey = ev.clientY;
    var g = currentTransform.g;
    var pos = g.vTranslate;
    var xd;
    var yd;

    if (g.id.indexOf('video') > -1) {
        xd = ex - g.firstChild.width.baseVal.value;
        yd = ey/* - currentTransform.y*/;

        g.firstChild.x.baseVal.value = xd;
        g.firstChild.y.baseVal.value = yd;
    } else {
        if (currentTransform.what === 1) {
            var lastAngle = Math.atan2(currentTransform.y - pos[1],
                currentTransform.x - pos[0]) * r2d;
            var curAngle = Math.atan2(ey - pos[1],
                ex - pos[0]) * r2d;

            g.vRotate += (curAngle - lastAngle);

            var lastLen = Math.sqrt(Math.pow(currentTransform.y - pos[1], 2) +
                Math.pow(currentTransform.x - pos[0], 2));
            var curLen = Math.sqrt(Math.pow(ey - pos[1], 2) +
                Math.pow(ex - pos[0], 2));

            g.vScale = g.vScale * (curLen / lastLen);

        } else {
            xd = ev.clientX - currentTransform.x;
            yd = ev.clientY - currentTransform.y;

            g.vTranslate = [pos[0] + xd, pos[1] + yd];
        }

        currentTransform.x = ex;
        currentTransform.y = ey;

        g.setAttribute('transform', 
            'translate(' + g.vTranslate[0] + ',' + g.vTranslate[1] + ') ' +
            'scale(' + g.vScale + ',' + g.vScale + ') ' +
            'rotate(' + g.vRotate + ') '
        );
    }
}

function rampOpacityDown(g) {
    g.style.opacity = 1.0;
    var rampFunc = function () {
        var o = parseFloat(g.style.opacity) - 0.05;
        g.style.opacity = o;
        if (o > 0.7) {
            setTimeout(rampFunc, 10);
        }
    };
    rampFunc();
}

function rampOpacityUp(g, startOpacity) {
    if (startOpacity === undefined) {
        startOpacity = 0.7;
    }
    g.style.opacity = startOpacity;
    var rampFunc = function () {
        var o = parseFloat(g.style.opacity) + 0.05;
        g.style.opacity = o;
        if (o < 1.0) {
            setTimeout(rampFunc, 10);
        }
    };
    rampFunc();
}
