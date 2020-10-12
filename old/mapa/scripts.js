window.addEventListener('load', function() {

  // parentOffset
  var map = document.querySelector('#map');
  map.addEventListener('click', function(event) {
    // e = Mouse click event.
    var rect = event.target.getBoundingClientRect();
    var x = event.clientX - rect.left - 6; //x position within the element.
    var y = event.clientY - rect.top - 6;  //y position within the element.
    console.log('left: ' + x, 'top: ' + y);
  });

  var zoom = document.querySelectorAll('.zoom');
  zoom.forEach(function(e) {
    e.addEventListener('click', function() {
      var myImg = document.getElementById("map");
      var currWidth = myImg.clientWidth;
      var currHeight = myImg.clientHeight;
      var markers = document.querySelectorAll('.marker');
      var percent = 0.8;
      if (e.id == 'zoom-in') {
        if (currWidth == 500) {
          return false;
        } else {
          myImg.style.width = Math.round(currWidth / percent) + "px";
          myImg.style.height = Math.round(currHeight / percent) + 'px';
          markers.forEach(function(marker) {
            var actualTop = parseInt(marker.style.top, 10);
            var actualLeft = parseInt(marker.style.left, 10);
            marker.style.top = (actualTop / percent) + "px";
            marker.style.left = (actualLeft / percent) + "px";
          });
        }

      } else if (e.id == 'zoom-out') {
        if (currWidth == 6000) {
          return false;
        } else {
          myImg.style.width = Math.round(currWidth * percent ) + "px";
          myImg.style.height = Math.round(currHeight * percent ) + 'px';
          markers.forEach(function(marker) {
            var actualTop = parseInt(marker.style.top, 10);
            var actualLeft = parseInt(marker.style.left, 10);
            marker.style.top = (actualTop * percent) + "px";
            marker.style.left = (actualLeft * percent) + "px";
          });
        }

      } else if (e.id == 'reset') {
        var windowWidth = (window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth) - 17;

        var windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        myImg.style.width = '100%';
        myImg.style.height = '100%';

        percent = currWidth / windowWidth;

        markers.forEach(function(marker) {
          var actualTop = parseInt(marker.style.top, 10);
          var actualLeft = parseInt(marker.style.left, 10);
          marker.style.top = actualTop / percent  + "px";
          marker.style.left = actualLeft / percent  + "px";
        });
      }
    });
  });

  // markers render
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


  // marker
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


    function startDrag(e) {
      // determine event object
      if (!e) {
        var e = window.event;
      }

      // IE uses srcElement, others use target
      var targ = e.target ? e.target : e.srcElement;

      if (targ.className != 'dragme') {return};
      // calculate event X, Y coordinates
      offsetX = e.clientX;
      offsetY = e.clientY;

      // assign default values for top and left properties
      if(!targ.style.left) { targ.style.left='0px'};
      if (!targ.style.top) { targ.style.top='0px'};

      // calculate integer values for top and left
      // properties
      coordX = parseInt(targ.style.left);
      coordY = parseInt(targ.style.top);
      drag = true;

      // move div element
      document.onmousemove=dragDiv;
      return false;

    }
    function dragDiv(e) {
      if (!drag) {
        // IE uses srcElement, others use target
        var targ = e.target ? e.target : e.srcElement;
        targ.style.cursor='grab';
        return
      };
      if (!e) { var e= window.event};
      var targ=e.target?e.target:e.srcElement;
      // move div element
      targ.style.left=coordX+e.clientX-offsetX+'px';
      targ.style.top=coordY+e.clientY-offsetY+'px';
      return false;
    }
    function stopDrag() {
      drag=false;
    }

    window.onload = function() {
      document.onmousedown = startDrag;
      document.onmouseup = stopDrag;
    }







  // });



});
