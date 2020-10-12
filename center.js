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

  center();
});
