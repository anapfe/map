window.addEventListener('load', function() {

  function center() {
    var dragme = document.querySelector('#dragme');
    var dragmeWidth = dragme.getBoundingClientRect().width;
    var dragmeHeight = dragme.getBoundingClientRect().height;

    var newLeft = (windowWidth - dragmeWidth) / 2;
    var newTop = (windowHeight - dragmeHeight) / 2;

    dragme.style.left = newLeft + 'px';
    dragme.style.top = newTop + 'px';
  }

  window.scrollTo(0,0);

  var mapImg = document.querySelector('.mapImg');
  var windowWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 17;
  var windowHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);

  // center();
  // porcentaje de ampliación/ disminución
  percent = 0.7;
  // diferencia de pixels por no ampliarse
  var markerError = 2.5;

  var zoom = document.querySelectorAll('.zoom');
  zoom.forEach(function(e) {
    e.addEventListener('click', function() {

      var currWidth = mapImg.getBoundingClientRect().width;
      var markers = document.querySelectorAll('.marker');

      if (e.id == 'zoomin') {

        if (currWidth >= 20000) return false;
        else {

          var newwidth = (currWidth / percent) + "px";
          mapImg.style.width = newwidth;

          markers.forEach(function(marker) {
            var actualTop = parseInt(marker.style.top, 10);
            var actualLeft = parseInt(marker.style.left, 10);
            marker.style.top = (actualTop + markerError) / percent  + "px";
            marker.style.left = (actualLeft + markerError) / percent  + "px";
          });
          center();
        }

      } else if (e.id == 'zoomout') {

        if (currWidth <= 900)  return false;
        else {

          var newWidth = (currWidth * percent) + "px";
          mapImg.style.width = newWidth;

          markers.forEach(function(marker) {
            var actualTop = parseInt(marker.style.top, 10);
            var actualLeft = parseInt(marker.style.left, 10);
            marker.style.top = (actualTop - markerError) * percent + 'px';
            marker.style.left = (actualLeft - markerError) * percent + 'px';
          });
          center();
        }

      } else {
        console.log('fit');
      }

    });
  });
});
