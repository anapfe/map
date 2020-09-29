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
  var map = document.querySelector('#map');
  map.addEventListener('click', function(event) {
    // e = Mouse click event.
    var rect = event.target.getBoundingClientRect();
    var x = event.clientX - rect.left - 6; //x position within the element.
    var y = event.clientY - rect.top - 6;  //y position within the element.
    console.log('left: ' + x, 'top: ' + y);
  });
  //fin coordenadas -------------------------------------
  
  // inicio render markers -------------------------------------
  for (var i = 0; i < asocs.length; i++) {
    function createHTML(type, className) {
      var element = document.createElement(type);
      element.className = className;
      return element;
    }
    var marker = createHTML('div', 'marker');
    marker.style.top = asocs[i].top + "px";
    marker.style.left = asocs[i].left + "px";

    var dot = createHTML('div', "dot");

    var markertext = createHTML('div', 'markertext');

    var tipTitle = createHTML('p', 'tip-title');
    var name = document.createTextNode(asocs[i].name);
    tipTitle.appendChild(name);

    var tipDir = createHTML('p', 'tip-dir');
    var address = document.createTextNode(asocs[i].address);
    tipDir.appendChild(address);

    var tipYear = createHTML('p', 'tip-year')
    var year = document.createTextNode(asocs[i].year);
    tipYear.appendChild(year);

    var tipAct = createHTML("p", 'tip-act');
    var activity = document.createTextNode(asocs[i].activity);
    tipAct.appendChild(activity);

    var tipFact = createHTML("p", 'tip-fact');
    var money = document.createTextNode(asocs[i].money);
    tipFact.appendChild(money);

    var tipEmploy = createHTML("p", 'tip-cant');
    var employees = document.createTextNode(asocs[i].employees);
    tipEmploy.appendChild(employees);

    var markers = document.querySelector('.markers');
    markers.appendChild(marker);
    marker.appendChild(dot);
    marker.appendChild(markertext);
    markertext.appendChild(tipTitle);
    markertext.appendChild(tipDir);
    markertext.appendChild(tipYear);
    markertext.appendChild(tipAct);
    markertext.appendChild(tipFact);
    markertext.appendChild(tipEmploy);
  }

  // fin render markers -------------------------------------

  // inicio marker tooltip -------------------------------------
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




});
