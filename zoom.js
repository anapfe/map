function zoomin(element) {
  var currWidth = element.clientWidth;
  if (currWidth == 6000) return false;
  else {
    element.style.width = Math.round(currWidth / percent) + "px";
    element.style.height = Math.round(currHeight / percent) + 'px';
    resizeMarkers();
  }
}

function zoomout(element) {
  var currWidth = element.clientWidth;
  if (currWidth == 500) return false;
  else {
    element.style.width = Math.round(currWidth * percent) + "px";
    element.style.height = Math.round(currHeight * percent) + 'px';
    resizeMarkers();
  }
}

function resizeMarkers() {
  var markers = document.querySelectorAll('.marker');
  markers.forEach(function(marker) {
    var actualTop = parseInt(marker.style.top, 10);
    var actualLeft = parseInt(marker.style.left, 10);
    marker.style.top = actualTop / percent  + "px";
    marker.style.left = actualLeft / percent  + "px";
  });
}

var zoom = document.querySelectorAll('.zoom');

zoom.foreEach(function(e)) {
  e.addEventListener('click', function() {
    var mapImg = document.getElementByClass(".zoom-me");
    var percent = 0.8;

    if (e.id == 'zoomin') {
      if (currWidth == 500) {
        return false;
      } else {
        zoomin(mapImg, percent);
      }
    } else if (e.id == 'zoomout') {
      if (currWidth == 6000) {
        return false;
      } else {
        zoomout(mapImg, percent);
      }

    } else {
        var windowWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 17;

        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        mapImg.style.width = '100%';
        mapImg.style.height = '100%';

        percent = currWidth / windowWidth;

        resizeMarkers();
      }
    })
  }
