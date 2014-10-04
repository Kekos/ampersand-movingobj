var AmpState = require('ampersand-state');

var MovingModel = AmpState.extend({
  props: {
    x: 'number',
    y: 'number',
    width: 'number',
    height: 'number',
    xBegin: 'number',
    yBegin: 'number',
    viewport: 'object'
  },

  derived: {
    xTotal: {
      deps: ['x', 'width'],
      fn: function() {
        var x = this.x - this.viewport.xBegin + this.xBegin;
        var max = window.innerWidth - this.width;

        return Math.max(0, Math.min(max, x));
      }
    },

    yTotal: {
      deps: ['y', 'height'],
      fn: function() {
        var y = this.y - this.viewport.yBegin + this.yBegin;
        var max = window.innerHeight - this.height;

        return Math.max(0, Math.min(max, y));
      }
    }
  }
});

module.exports = MovingModel;