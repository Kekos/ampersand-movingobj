var AmpMoving = require('../ampersand-movingobj');
var domready = require('domready');

domready(function() {
  var Dialog = AmpMoving.extend({
    template: '<div class="dialog">'
      + '  <h2 data-hook="start-move">This is an example dialog</h2>'
      + '  <p>'
      + '    Moving this dialog only works by dragging the headline.'
      + '  </p>'
      + '</div>',
    render: function() {
      AmpMoving.prototype.render.apply(this);
      console.log('this is render() in Dialog class');
    }
  });

  var dialog = new Dialog({
    el: document.querySelector('#dialog'),
  });
  dialog.render();

  var MoveElm = AmpMoving.extend({
    template: '<div class="moving-elm" data-hook="start-move">'
      + '  You can move this entire element.'
      + '</div>',
    autoRender: true
  });

  var moving_elm = new MoveElm({
    el: document.querySelector('#moving_elm'),
  });
});