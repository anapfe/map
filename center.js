window.addEventListener('load', function() {

  function center() {
    var dragme = document.querySelector('#dragme');

    var mapWidth = dragme.getBoundingClientRect().width;
    var mapHeight = dragme.getBoundingClientRect().height;

    var windowWidth = window.innerWidth - 17;
    var windowHeight = window.innerHeight;

    var newLeft = (windowWidth - mapWidth) / 2;
    var newTop = (windowHeight - mapHeight) / 2;

    dragme.style.left = newLeft + 'px';
    dragme.style.top = newTop + 'px';
  }

});


function center() {
  var dragme = document.querySelector('#dragme');

  var dragmeWidth = dragme.getBoundingClientRect().width;
  var dragmeHeight = dragme.getBoundingClientRect().height;

  var x = Math.abs(dragme.offsetLeft) + windowWidth / 2;
  var y = Math.abs(dragme.offsetTop) + windowHeight / 2;

  var newX = x * percent;
  var newY = y * percent;

  var newLeft = dragme.offsetLeft - (newX - x);
  var newTop = dragme.offsetTop - (newY - y);

  // var newLeft = (windowWidth - dragmeWidth) / 2;
  // var newTop = (windowHeight - dragmeHeight) / 2;

  dragme.style.left = newLeft + 'px';
  dragme.style.top = newTop + 'px';
}
