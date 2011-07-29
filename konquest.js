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

var sizeX, sizeY, sizeXHalf, sizeYHalf;

var selectedPlanets = new Array();

function initialize() {
    sizeX = window.innerWidth;
    sizeY = window.innerHeight;

    sizeXHalf = sizeX / 2;
    sizeYHalf = sizeY / 2;

    var outerCircle = (sizeXHalf > sizeYHalf) ? sizeYHalf : sizeXHalf;
    var innerCircle = outerCircle / 100 * 20;

    for(var i=0; i!=gridNode.length; i++) {
        gridCoords[i] = new Array(2);
        gridCoords[i][0] = sizeXHalf;
        gridCoords[i][1] = sizeYHalf;
        gridSize[i] = outerCircle / 100 * (25 * (4-i));

        gridNode[i] = document.createElementNS(svgNS, 'circle');
        gridNode[i].setAttribute('cx', gridCoords[i][0]);
        gridNode[i].setAttribute('cy', gridCoords[i][1]);
        gridNode[i].setAttribute('r', gridSize[i]);
        gridNode[i].setAttribute('stroke', 'green');
        document.documentElement.appendChild(gridNode[i]);
    }

    sunCoords = new Array(2);
    sunCoords[0] = sizeXHalf;
    sunCoords[1] = sizeYHalf;
    sunSize = outerCircle / 100 * 10;

    sunNode = document.createElementNS(svgNS, 'circle');
    sunNode.setAttribute('cx', sunCoords[0]);
    sunNode.setAttribute('cy', sunCoords[1]);
    sunNode.setAttribute('r', sunSize);
    sunNode.setAttribute('style', 'fill:url(#gradient_yellow_red)');
    document.documentElement.appendChild(sunNode);

    for(var i=0; i!=planetNode.length; i++) {
        planetCoords[i] = new Array(2);

        var tmpX = Math.random() * (outerCircle - innerCircle) + innerCircle
        var tmpRot = Math.random()*360;

        planetCoords[i][0] = tmpX * Math.cos(tmpRot) + sizeXHalf;
        planetCoords[i][1] = tmpX * Math.sin(tmpRot) + sizeYHalf;

        planetSize[i] = Math.random() * (outerCircle / 80) + (outerCircle / 80);
        planetRotation[i] = Math.random() / 25;

        planetNode[i] = document.createElementNS(svgNS, 'circle');
        planetNode[i].setAttribute('cx', planetCoords[i][0]);
        planetNode[i].setAttribute('cy', planetCoords[i][1]);
        planetNode[i].setAttribute('r', planetSize[i]);
        planetNode[i].setAttribute('style', 'fill:url(#gradient_white_grey)');
        document.documentElement.appendChild(planetNode[i]);

        window.setInterval('update()', 1000 / 25);
    }
}

window.onresize = function() {
    var scaleX = window.innerWidth / sizeX;
    var scaleY = window.innerHeight / sizeY;

    var maxScale = (window.innerWidth > window.innerHeight) ? scaleY : scaleX;

    for(var i=0; i!=gridNode.length; i++) {
        gridCoords[i][0] *= scaleX;
        gridCoords[i][1] *= scaleY;
        gridSize[i] *= maxScale;

        gridNode[i].setAttribute('cx', gridCoords[i][0]);
        gridNode[i].setAttribute('cy', gridCoords[i][1]);
        gridNode[i].setAttribute('r', gridSize[i]);
    }

    sunCoords[0] *= scaleX;
    sunCoords[1] *= scaleY;
    sunSize *= maxScale;

    sunNode.setAttribute('cx', sunCoords[0]);
    sunNode.setAttribute('cy', sunCoords[1]);
    sunNode.setAttribute('r', sunSize);

    for(var i=0; i!=planetNode.length; i++) {
        planetCoords[i][0] -= sizeXHalf;
        planetCoords[i][1] -= sizeYHalf;
        planetCoords[i][0] *= maxScale;
        planetCoords[i][1] *= maxScale;
        planetSize[i] *= maxScale;
        planetCoords[i][0] += window.innerWidth/2;
        planetCoords[i][1] += window.innerHeight/2;

        planetNode[i].setAttribute('cx', planetCoords[i][0]);
        planetNode[i].setAttribute('cy', planetCoords[i][1]);
        planetNode[i].setAttribute('r', planetSize[i]);
    }

    sizeX = window.innerWidth;
    sizeY = window.innerHeight;

    sizeXHalf = sizeX / 2;
    sizeYHalf = sizeY / 2;
}

function update() {
    var g = Math.PI/180;

    for(var i=0; i!=planetNode.length; i++) {
        planetCoords[i][0] -= sizeXHalf;
        planetCoords[i][1] -= sizeYHalf;

        planetCoords[i][0] = planetCoords[i][0]*Math.cos(g*planetRotation[i]) - planetCoords[i][1]*Math.sin(g*planetRotation[i]);
        planetCoords[i][1] = planetCoords[i][0]*Math.sin(g*planetRotation[i]) + planetCoords[i][1]*Math.cos(g*planetRotation[i]);

        planetCoords[i][0] += sizeXHalf;
        planetCoords[i][1] += sizeYHalf;

        planetNode[i].setAttribute('cx', planetCoords[i][0]);
        planetNode[i].setAttribute('cy', planetCoords[i][1]);
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