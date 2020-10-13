window.addEventListener('load', function() {

  var mapImg = $("#mapImg");
  var dragme = $('#dragme');
  var container = $('#container');
  // var mapImg = document.querySelector('#mapImg');
  var percent = 0.7; // porcentaje de ampliación/ disminución
  var markerError = 2.5; // diferencia de pixels por no ampliarse

  var zoom = document.querySelectorAll('.zoom');
  zoom.forEach(function(e) {
    e.addEventListener('click', function() {

      // var currWidth = mapImg.getBoundingClientRect().width;
      var currWidth = mapImg.width();
      var markers = document.querySelectorAll('.marker');

      if (e.id == 'zoomin') {

        if (currWidth >= 20000) return false;
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

      } else {
        // 
        // percent = 1529.437 / 13000;
        // var markerError = 0;
        // for (var i = 0; i < 6; i++) {
        //   error = error * 0.7;
        //   markerError += error;
        // }
        //
        // var imgCss = {};
        // var dragCss = {};
        //
        // imgCss.width = currWidth * percent;
        // var x = Math.abs(dragme.position().left) + container.width() / 2;
        // var y = Math.abs(dragme.position().top) + container.height() / 2;
        //
        // var newX = x * percent;
        // var newY = y * percent;
        //
        // dragCss.left = dragme.position().left - (newX - x);
        // dragCss.top = dragme.position().top - (newY - y);
        //
        // mapImg.css(imgCss);
        // dragme.css(dragCss);
        //
        // markers.forEach(function(marker) {
        //   var actualTop = parseInt(marker.style.top, 10);
        //   var actualLeft = parseInt(marker.style.left, 10);
        //   marker.style.top = (actualTop - markerError) * percent + 'px';
        //   marker.style.left = (actualLeft - markerError) * percent + 'px';
        // });
      }
    });
  });
});
