// inicio drag-------------------------------------

// Make the DIV element draggable:
dragElement(document.getElementById("dragme"));
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
    elmnt.style.cursor = 'grabbing';
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
    elmnt.style.cursor = 'grab';
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// fin drag-------------------------------------

window.addEventListener('load', function() {

  // inicio corrdenadas -------------------------------------
  var mapImg = document.querySelector('.mapImg');
  mapImg.addEventListener('click', function(event) {
    // e = Mouse click event.
    var rect = event.target.getBoundingClientRect();
    var x = event.clientX - rect.left - 6; //x position within the element.
    var y = event.clientY - rect.top - 6;  //y position within the element.
    console.log('left: ' + x, 'top: ' + y);
  });
  //fin coordenadas -------------------------------------

  // inicio render markers -------------------------------------
  function createHTML(type, className) {
    var element = document.createElement(type);
    element.className = className;
    return element;
  }

  asocs.forEach(function(asoc){
    var markers = document.querySelector('.markers');
    var dot = createHTML('div', "dot");
    dot.style.backgroundColor = asoc.color;
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

    for (const property in asoc) {
      if ( i == 0 ) {
        var div = createHTML('p', 'text');
        var text = document.createTextNode( asoc[property] );
        div.appendChild(text);
        markertext.appendChild(div);
        i++;
      } else if ( i != last && i != last2 && i != last3) {
          var tit = createHTML('span', 'strong');
          var titText = document.createTextNode(property + ': ');
          var div = createHTML('p', 'text');
          var text = document.createTextNode( asoc[property] );
          console.log(titText);
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
      marker.appendChild(markertext);
    });
  // fin render markers -------------------------------------

  // inicio marker tooltip -----------------------------------
  var markers = document.querySelectorAll('.dot');
  markers.forEach(function(dot) {
    dot.addEventListener('mouseover', function() {
      var parent = dot.parentNode;
      parent.children[1].style.transform = "translateX(-50%) scale(1)";
    });
  });
  markers.forEach(function(dot) {
    dot.addEventListener('mouseout', function() {
      var parent = dot.parentNode;
      parent.children[1].style.transform = "translateX(-50%) scale(0)";
    });
  });
  // fin marker tooltip -------------------------------------

  //inicio zoom ---------------------------------------------


  //fin zoom-------------------------------------------------



});
