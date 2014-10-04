var AmpView = require('ampersand-view');
var MovingModel = require('./moving-model');
var BindTransforms = require('bind-transforms');
var pointerEventFilter = require('./pointer-events');
var offset = require('offset');
var dime = require('dime');

var viewportModel = {
  xBegin: 0,
  yBegin: 0
};

var elementModel = null;

function setPosition(e) {
  e = pointerEventFilter(e);

  if (elementModel !== null) {
    e.preventDefault();

    elementModel.set({
      x: e.x,
      y: e.y
    });
  }
}

document.addEventListener('mousemove', setPosition, false);
document.addEventListener('touchmove', setPosition, false);
document.addEventListener('touchstart', setPosition, false);

var MovingObject = AmpView.extend(BindTransforms).extend({
  events: {
    'mousedown [data-hook=start-move]': 'startMove',
    'touchstart [data-hook=start-move]': 'startMove',
    'mouseup [data-hook=start-move]': 'endMove',
    'touchend [data-hook=start-move]': 'endMove'
  },

  initialize: function(opts) {
    opts.model = new MovingModel({
      viewport: viewportModel
    });
  },

  render: function() {
    // Render
    this.renderWithTemplate(this);
    this.bindTransforms({
      top: 'yTotal',
      left: 'xTotal'
    }, this.el);

    // Read initial coords from el
    var el_offset = offset(this.el);
    this.model.xBegin = this.model.x = el_offset.left;
    this.model.yBegin = this.model.y = el_offset.top;
    this.model.width = dime.width(this.el);
    this.model.height = dime.height(this.el);
  },

  startMove: function(e) {
    e.preventDefault();
    e = pointerEventFilter(e);

    // There can only be one moving object per time, so I would
    // say it's safe to reference our model "globally".
    elementModel = this.model;

    this.model.xBegin = this.model.xTotal;
    this.model.yBegin = this.model.yTotal;
    viewportModel.xBegin = e.x;
    viewportModel.yBegin = e.y;
  },

  endMove: function(e) {
    elementModel = null;
  }
});

module.exports = MovingObject;