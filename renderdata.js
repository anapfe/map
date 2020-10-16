// inicio render ASOCmarkers -------------------------------------
function createHTML(type, className) {
  var element = document.createElement(type);
  element.className = className;
  return element;
}

// inicio render instimarkers -------------------------------------
insti.forEach(function(insti){
  var markers = document.querySelector('.markers');

  var marker = createHTML('div', 'marker');
  marker.style.top = insti.top + "px";
  marker.style.left = insti.left + "px";
  markers.appendChild(marker);

  var dot = createHTML('img', 'dot');
  // dot.style.backgroundColor = insti.color;
  dot.src = 'images/marker.png';
  marker.appendChild(dot);

  // esto no anda y no sé por qué
  var triangle = createHTML('div', 'triangle');
  triangle.style.borderBottom = '5px solid' + insti.color;
  marker.appendChild(triangle);

  var markertext = createHTML('div', 'markertext');
  markertext.style.backgroundColor = insti.color;
  marker.appendChild(markertext);

  var length = Object.keys(insti).length;
  for (var property in insti) {
    if ( property == 'Ciudad') {
      var cityDiv = createHTML('p', 'city');
      var cityName = document.createTextNode( insti[property] );
      cityDiv.appendChild(cityName);
      markertext.appendChild(cityDiv);
    } else if ( property == 'Nombre' ) {
      var nameDiv = createHTML('p', 'insti');
      var name = document.createTextNode( insti[property] );
      nameDiv.appendChild(name);
      markertext.appendChild(nameDiv);
    } else if ( property != 'color' && property != 'left' && property != 'top') {
      var tit = createHTML('span', 'strong');
      var titText = document.createTextNode(property + ': ');
      var div = createHTML('p', 'text');
      var text = document.createTextNode( insti[property] );
      tit.appendChild(titText);
      div.appendChild(tit);
      div.appendChild(text);
      markertext.appendChild(div);
    } else {
    }
  }
});
// fin render instimarkers -------------------------------------

asocs.forEach(function(asoc){
  var markers = document.querySelector('.markers');
  var marker = createHTML('div', 'marker');
  marker.style.top = asoc.top + "px";
  marker.style.left = asoc.left + "px";
  markers.appendChild(marker);

  var dot = createHTML('img', 'dot');
  // dot.style.backgroundColor = asoc.color;
  dot.src = 'images/marker_ne.png';
  marker.appendChild(dot);

  var triangle = createHTML('div', 'triangle');
  triangle.style.borderBottom = '5px solid' + asoc.color;
  marker.appendChild(triangle);

  var markertext = createHTML('div', 'markertext');
  markertext.style.backgroundColor = asoc.color;
  marker.appendChild(markertext);

  var i = 0;
  var length = Object.keys(asoc).length;
  var last = length - 1;
  var last2 = length - 2;
  var last3 = length - 3;

  for (var property in asoc) {
    if ( property == 'Nombre' ) {
      var div1 = createHTML('p', 'asoc');
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
});
// fin render markers asocs -----------------------------------------------

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
