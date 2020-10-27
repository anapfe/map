window.addEventListener('load', function() {

  // inicio corrdenadas -------------------------------------
  var mapImg = document.querySelector('#mapImg');
  mapImg.addEventListener('click', function(event) {
    // e = Mouse click event.
    var rect = event.target.getBoundingClientRect();
    var x = event.clientX - rect.left - 5; //x position within the element.
    var y = event.clientY - rect.top - 5;  //y position within the element.
    console.log('top: ' + y, 'left: ' + x);
  });
  //fin coordenadas --------------------------------------------

  window.scrollTo(0, 0);

  $( function() {
    $( "#dragme" ).draggable();
  } );

  // center map --------------------------------------------
  var dragme = document.querySelector('#dragme');

  var mapWidth = dragme.getBoundingClientRect().width;
  var mapHeight = dragme.getBoundingClientRect().height;

  var containerHeight = document.querySelector('#container').clientHeight;
  var containerWidth = document.querySelector('#container').clientWidth;

  // var windowWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 17;
  // var windowHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);

  var newLeft = (containerWidth - mapWidth) / 2;
  var newTop = (containerHeight - mapHeight) / 2;

  dragme.style.left = newLeft + 'px';
  dragme.style.top = newTop + 'px';
  // FIN center map --------------------------------------------

  var markerError = 2.5;

  // var error = 2.5;
  // for (var i = 0; i < 8; i++) {
  // error = error * 0.7;
  // markerError += error;
  // }

  var mapImg = $("#mapImg");
  var dragme = $('#dragme');
  var container = $('#container');
  var currWidth = mapImg.width();
  //
  var imgCss = {};
  var dragCss = {};

  percent = 1071 / 13000;
  imgCss.width = currWidth * percent;
  var x = Math.abs(dragme.position().left) + container.width() / 2;
  var y = Math.abs(dragme.position().top) + container.height() / 2;

  var newX = x * percent;
  var newY = y * percent;

  dragCss.left = dragme.position().left - (newX - x);
  dragCss.top = dragme.position().top - (newY - y);

  mapImg.css(imgCss);
  dragme.css(dragCss);

  var markers = document.querySelectorAll('.marker');
  markers.forEach(function(marker) {

    var actualTop = parseInt(marker.style.top, 10);
    var actualLeft = parseInt(marker.style.left, 10);
    // marker.style.top = (actualTop - markerError) * percent + 'px';
    // marker.style.left = (actualLeft - markerError) * percent + 'px';

    marker.style.top = (actualTop * 0.0818) + 'px';
    marker.style.left = (actualLeft  * 0.0817)+ 'px';
  });

  var zoom = document.querySelectorAll('.zoom');
  zoom.forEach(function(e) {
    e.addEventListener('click', function() {
      var percent = 0.7; // porcentaje de ampliación/ disminución
      var markerError = 2.5; // diferencia de pixels por no ampliarse
      // var currWidth = mapImg.getBoundingClientRect().width;
      var currWidth = mapImg.width();
      var markers = document.querySelectorAll('.marker');

      if (e.id == 'zoomin') {

        if (currWidth >= 15000) return false;
        else {

          var imgCss = {};
          var dragCss = {};

          imgCss.width = currWidth / percent;
          var x = Math.abs(dragme.position().left) + container.width() / 2;
          var y = Math.abs(dragme.position().top) + container.height() / 2;

          var newX = x / percent;
          var newY = y / percent;

          dragCss.left = dragme.position().left - (newX - x);
          dragCss.top = dragme.position().top - (newY - y);

          mapImg.css(imgCss);
          dragme.css(dragCss);

          markers.forEach(function(marker) {
            var actualTop = parseInt(marker.style.top, 10);
            var actualLeft = parseInt(marker.style.left, 10);
            marker.style.top = (actualTop + markerError) / percent  + "px";
            marker.style.left = (actualLeft + markerError) / percent  + "px";
          });
        }

      } else if (e.id == 'zoomout') {

        if (currWidth <= 900)  return false;
        else {

          var imgCss = {};
          var dragCss = {};

          imgCss.width = currWidth * percent;
          var x = Math.abs(dragme.position().left) + container.width() / 2;
          var y = Math.abs(dragme.position().top) + container.height() / 2;

          var newX = x * percent;
          var newY = y * percent;

          dragCss.left = dragme.position().left - (newX - x);
          dragCss.top = dragme.position().top - (newY - y);

          mapImg.css(imgCss);
          dragme.css(dragCss);

          markers.forEach(function(marker) {
            var actualTop = parseInt(marker.style.top, 10);
            var actualLeft = parseInt(marker.style.left, 10);
            marker.style.top = (actualTop - markerError) * percent + 'px';
            marker.style.left = (actualLeft - markerError) * percent + 'px';
          });
        }
      }
    });
  });
});
