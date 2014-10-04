module.exports = function(e) {
  e.x = e.pageX;
  e.y = e.pageY;

  if (e.type.indexOf('touch') === 0 && e.changedTouches.length > 0) {
    // Touch events
    var touch = e.changedTouches[0];

    e.x = touch.pageX;
    e.y = touch.pageY;
  }

  return e;
};