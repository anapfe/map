window.addEventListener('load', function() {
  var mapImg = document.querySelector('.mapImg');
  var dragme = document.querySelector('#dragme');

  // inicio corrdenadas -------------------------------------
  mapImg.addEventListener('click', function(event) {
    // e = Mouse click event.
    var rect = event.target.getBoundingClientRect();
    var x = event.clientX - rect.left - 5; //x position within the element.
    var y = event.clientY - rect.top - 5;  //y position within the element.
    console.log('top: ' + y, 'left: ' + x);
  });
  //fin coordenadas --------------------------------------------

  // inicio render ASOCmarkers -------------------------------------
  function createHTML(type, className) {
    var element = document.createElement(type);
    element.className = className;
    return element;
  }
  asocs.forEach(function(asoc){
    var markers = document.querySelector('.markers');

    var dot = createHTML('div', "dot");
    dot.style.backgroundColor = asoc.color;

    var triangle = createHTML('div', 'triangle');
    triangle.style.borderBottom = '5px solid' + asoc.color;

    var markertext = createHTML('div', 'markertext');
    markertext.style.backgroundColor = asoc.color;

    var marker = createHTML('div', 'marker');
    marker.style.top = asoc.top + "px";
    marker.style.left = asoc.left + "px";

    var i = 0;
    var length = Object.keys(asoc).length;
    var last = length - 1;
    var last2 = length - 2;
    var last3 = length - 3;

    for (var property in asoc) {
      if ( i == 0 ) {
        var div1 = createHTML('p', 'text');
        var text1 = document.createTextNode( asoc[property] );
        div1.appendChild(text1);
        markertext.appendChild(div1);
        i++;
      } else if ( i != last && i != last2 && i != last3) {
        var strong = createHTML('span', 'strong');
        var titText = document.createTextNode(property + ': ');
        strong.appendChild(titText);
        var paragraph = createHTML('p', 'text');
        var text = document.createTextNode( asoc[property] );
        paragraph.appendChild(strong);
        paragraph.appendChild(text);
        markertext.appendChild(paragraph);
        i++;
      } else {
      }
    }
    markers.appendChild(marker);
    marker.appendChild(dot);
    marker.appendChild(triangle);
    marker.appendChild(markertext);
  });
  // fin render markers -----------------------------------------------

  // inicio render instimarkers -------------------------------------
  insti.forEach(function(insti){
    var markers = document.querySelector('.markers');

    var dot = createHTML('div', "dot");
    dot.style.backgroundColor = insti.color;

    var triangle = createHTML('div', 'triangle');
    triangle.style.borderBottom = '5px solid' + insti.color;

    var markertext = createHTML('div', 'markertext');
    markertext.style.backgroundColor = insti.color;

    var marker = createHTML('div', 'marker');
    marker.style.top = insti.top + "px";
    marker.style.left = insti.left + "px";

    var i = 0;
    var length = Object.keys(insti).length;
    var last = length - 1;
    var last2 = length - 2;
    var last3 = length - 3;

    for (var property in insti) {
      if ( i == 0 ) {
        var div1 = createHTML('p', 'text');
        var text1 = document.createTextNode( insti[property] );
        div1.appendChild(text1);
        markertext.appendChild(div1);
        i++;
      } else if ( i != last && i != last2 && i != last3) {
        var tit = createHTML('span', 'strong');
        var titText = document.createTextNode(property + ': ');
        var div = createHTML('p', 'text');
        var text = document.createTextNode( insti[property] );
        tit.appendChild(titText);
        div.appendChild(tit);
        div.appendChild(text);
        markertext.appendChild(div);
        i++;
      } else {
      }
    }
    markers.appendChild(marker);
    marker.appendChild(dot);
    marker.appendChild(triangle);
    marker.appendChild(markertext);
  });
  // fin render instimarkers -------------------------------------

  // inicio marker tooltip -----------------------------------
  var markers = document.querySelectorAll('.dot');
  markers.forEach(function(dot) {
    dot.addEventListener('mouseover', function() {
      var parent = dot.parentNode;
      parent.children[1].style.transform = "translateX(-50%) scale(1)";
      parent.children[2].style.transform = "translateX(-50%) scale(1)";
    });
  });
  markers.forEach(function(dot) {
    dot.addEventListener('mouseout', function() {
      var parent = dot.parentNode;
      parent.children[1].style.transform = "translateX(-50%) scale(0)";
      parent.children[2].style.transform = "translateX(-50%) scale(0)";
    });
  });
  // fin marker tooltip -------------------------------------

  // inicio drag-------------------------------------
  // Make the DIV element draggable:
  dragElement(dragme);
  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      // elmnt.style.cursor = 'grabbing';
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
      // elmnt.style.cursor = 'grab';
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  // fin drag-------------------------------------





  //inicio zoom ---------------------------------------------
  function resizeMarkersZoomIn(percent, error) {
    var markers = document.querySelectorAll('.marker');
    markers.forEach(function(marker) {
      var actualTop = parseInt(marker.style.top, 10);
      var actualLeft = parseInt(marker.style.left, 10);
      marker.style.top = (actualTop + error) / percent  + "px";
      marker.style.left = (actualLeft + error) / percent  + "px";
    });
  }
  function resizeMarkersZoomOut(percent, error) {
    var markers = document.querySelectorAll('.marker');
    markers.forEach(function(marker) {
      var actualTop = parseInt(marker.style.top, 10);
      var actualLeft = parseInt(marker.style.left, 10);
      var newTop = (actualTop - error) * percent;
      var newLeft = (actualLeft - error) * percent;
      marker.style.top = newTop + "px";
      marker.style.left = newLeft + "px";
    });
  }
  function zoomin(element, percent, error) {
    var currWidth = element.clientWidth;
    var currHeight = element.clientHeight;
    if (currWidth >= 14000) return false;
    else {
      var windowWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 17;
      var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var x = Math.abs(dragme.offsetLeft) + windowWidth / 2;
      var y = Math.abs(dragme.offsetTop) + windowHeight / 2;

      var newX = x * percent;
      var newY = y * percent;

      var newLeft = parseInt(dragme.style.left, 10) - (newX - x);
      var newTop = parseInt(dragme.style.top, 10) - (newY - y);

      var newWidth = currWidth / percent;
      var newHeight = currHeight / percent;
      element.style.width = newWidth + 'px';
      element.style.height = newHeight + 'px';

      // dragme.style.top = newTop + 'px';
      // dragme.style.left = newLeft + 'px';

      resizeMarkersZoomIn(percent, error);
    }
  }
  function zoomout(element, percent, error) {
    var currWidth = element.clientWidth;
    var currHeight = element.clientHeight;
    if (currWidth <= 1000) return false;
    else {
      var windowWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 17;
      var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var x = Math.abs(dragme.offsetLeft) + windowWidth / 2;
      var y = Math.abs(dragme.offsetTop) + windowHeight / 2;

      var newX = x * percent;
      var newY = y * percent;

      var newLeft = parseInt(dragme.style.left, 10) - (newX - x);
      var newTop = parseInt(dragme.style.top, 10) - (newY - y);

      var newWidth = (currWidth * percent) + "px";
      var newHeight = (currHeight * percent) + 'px';
      element.style.width = newWidth;
      element.style.height = newHeight;

      // dragme.style.top = newTop + 'px';
      // dragme.style.left = newLeft + 'px';

      resizeMarkersZoomOut(percent, error);
    }
  }

  function fit(element, error) {
    var currWidth = element.getBoundingClientRect().width;
    var windowWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 17;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (currWidth < 1530 && currWidth > 1528) {
      return ;
    } else if (currWidth > windowWidth) {
      var j = 1529.437 / currWidth;
      zoomout(element, j, error);
    } else if (currWidth < windowWidth) {
      var k = currWidth / 1529.437;
      zoomin(element, k, ererror);
    } else {
      return;
    }
  }

  percent = 0.7;
  var error = 2.5;

  var zoom = document.querySelectorAll('.zoom');
  zoom.forEach(function(e) {
    e.addEventListener('click', function() {
      if (e.id == 'zoomin') {
        zoomin(mapImg, percent, error);
      } else if (e.id == 'zoomout') {
        zoomout(mapImg, percent, error);
      } else {
        fit(mapImg, error);
      }
    });
  });
  //fin zoom-------------------------------------------------









// initial marker position-----------------------------
  var newError = 0;
  for (var i = 0; i < 6; i++) {
    error = error * 0.7;
    newError += error;
  }
  // initial fit map ----------------------------------
  fit(mapImg, newError);
  // initial center map -----------------------------
  dragme.style.top = '-820px';
  dragme.style.left = '-30px';



});
