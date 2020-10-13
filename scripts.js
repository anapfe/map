window.addEventListener('load', function() {

  window.scrollTo(0, 0);

  $( function() {
    $( "#dragme" ).draggable();
  } );

  var dragme = document.querySelector('#dragme');

  var mapWidth = dragme.getBoundingClientRect().width;
  var mapHeight = dragme.getBoundingClientRect().height;

  var windowWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 17;
  var windowHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);

  var newLeft = (windowWidth - mapWidth) / 2;
  var newTop = (windowHeight - mapHeight) / 2;

  dragme.style.left = newLeft + 'px';
  dragme.style.top = newTop + 'px';

  // percent = 1529.437 / 13000;
  // var error = 2.5;
  // for (var i = 0; i < 6; i++) {
  //   error = error * 0.7;
  //   markerError += error;
  // }
  //
  // var mapImg = $("#mapImg");
  // var dragme = $('#dragme');
  // var container = $('#container');
  // var percent = 0.7; // porcentaje de ampliación/ disminución
  // var markerError = 2.5; // diferencia de pixels por no ampliarse
  // var currWidth = mapImg.width();
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

});
