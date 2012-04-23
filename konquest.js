var svgNS = "http://www.w3.org/2000/svg";

var sunNode;
var sunSize;
var sunCoords;

var gridNode = new Array(4);
var gridSize = new Array(4);
var gridCoords = new Array(4);

var planetNode = new Array(10);
var planetSize = new Array(10);
var planetCoords = new Array(10);
var planetRotation = new Array(10);

var screenSize, screenSizeHalf;

var selectedPlanets = new Array();

function initialize() {
    screenSize = new Vector2D(window.innerWidth, window.innerHeight);
    screenSizeHalf = new Vector2D(screenSize.x/2, screenSize.y/2);
    
    var outerCircle = (screenSize.x > screenSize.y) ? screenSize.y/2 : screenSize.x/2;
    var innerCircle = outerCircle / 100 * 20;

    for(var i=0; i!=gridNode.length; i++) {
        gridCoords[i] = new Vector2D(screenSizeHalf.x, screenSizeHalf.y);
        gridSize[i] = outerCircle / 100 * (25 * (4-i));

        gridNode[i] = document.createElementNS(svgNS, 'circle');
        gridNode[i].setAttribute('cx', gridCoords[i].x);
        gridNode[i].setAttribute('cy', gridCoords[i].y);
        gridNode[i].setAttribute('r', gridSize[i]);
        gridNode[i].setAttribute('stroke', 'green');
        document.documentElement.appendChild(gridNode[i]);
    }

    sunCoords = new Vector2D(screenSizeHalf.x, screenSizeHalf.y);
    sunSize = outerCircle / 100 * 10;

    sunNode = document.createElementNS(svgNS, 'circle');
    sunNode.setAttribute('cx', sunCoords.x);
    sunNode.setAttribute('cy', sunCoords.y);
    sunNode.setAttribute('r', sunSize);
    sunNode.setAttribute('style', 'fill:url(#gradient_yellow_red)');
    document.documentElement.appendChild(sunNode);

    for(var i=0; i!=planetNode.length; i++) {
        var tmpX = Math.random() * (outerCircle - innerCircle) + innerCircle;
        var tmpRot = Math.random()*360;
        
        planetCoords[i] = new Vector2D(tmpX, 0);
        planetCoords[i].rotate(tmpRot);
        planetCoords[i].translate(screenSizeHalf);
        
        planetSize[i] = Math.random() * (outerCircle / 80) + (outerCircle / 80);
        planetRotation[i] = Math.random() / 3;

        planetNode[i] = document.createElementNS(svgNS, 'circle');
        planetNode[i].setAttribute('cx', planetCoords[i].x);
        planetNode[i].setAttribute('cy', planetCoords[i].y);
        planetNode[i].setAttribute('r', planetSize[i]);
        planetNode[i].setAttribute('style', 'fill:url(#gradient_white_grey)');
        document.documentElement.appendChild(planetNode[i]);
    }

    window.setInterval('update()', 1000 / 25);
}

window.onresize = function() {
    var oldScreenSize = new Vector2D(screenSize.x, screenSize.y);
    var oldScreenSizeHalf = new Vector2D(screenSizeHalf.x, screenSizeHalf.y);
    screenSize.x = window.innerWidth;
    screenSize.y = window.innerHeight;
    screenSizeHalf = new Vector2D(screenSize.x/2, screenSize.y/2);
    
    var scale = new Vector2D(window.innerWidth, window.innerHeight);
    scale.div(oldScreenSize);
    var maxScale = (window.innerWidth > window.innerHeight) ? scale.y : scale.x;
    
    for(var i=0; i!=gridNode.length; i++) {
        gridCoords[i].scale(scale);
        gridSize[i] *= maxScale;

        gridNode[i].setAttribute('cx', gridCoords[i].x);
        gridNode[i].setAttribute('cy', gridCoords[i].y);
        gridNode[i].setAttribute('r', gridSize[i]);
    }

    sunCoords.scale(scale);
    sunSize *= maxScale;

    sunNode.setAttribute('cx', sunCoords.x);
    sunNode.setAttribute('cy', sunCoords.y);
    sunNode.setAttribute('r', sunSize);

    for(var i=0; i!=planetNode.length; i++) {
        planetCoords[i].itranslate(oldScreenSizeHalf);
        planetCoords[i].x *= maxScale;
        planetCoords[i].y *= maxScale;
        planetSize[i] *= maxScale;
        planetCoords[i].translate(screenSizeHalf);

        planetNode[i].setAttribute('cx', planetCoords[i].x);
        planetNode[i].setAttribute('cy', planetCoords[i].y);
        planetNode[i].setAttribute('r', planetSize[i]);
    }
}

function update() {
    for(var i=0; i!=planetNode.length; i++) {
        planetCoords[i].itranslate(screenSizeHalf);
        planetCoords[i].rotate(planetRotation[i]);
        planetCoords[i].translate(screenSizeHalf);

        planetNode[i].setAttribute('cx', planetCoords[i].x);
        planetNode[i].setAttribute('cy', planetCoords[i].y);
    }
}

onclick = function(event) {
    for(var i=0; i!=planetCoords.length; i++) {
        if(event.x > planetCoords[i][0] - planetSize[i]) {
            if(planetCoords[i][0] + planetSize[i] > event.x) {
                if(event.y > planetCoords[i][1] - planetSize[i]) {
                    if(planetCoords[i][1] + planetSize[i] > event.y) {
                        selectedPlanets.length = 0;
                        selectedPlanets.push(i);
                        break;
                    }
                }
            }
        }
    }
}

ondblclick = function() {
    console.debug('double click')
}
