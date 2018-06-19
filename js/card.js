var MAIN_CONTAINER = $('main');

var Card = function(word) {
  this.word = word;
}

Card.prototype.render = function() {
  $('<div>')
      .addClass('card')
      .text(this.word)
      .appendTo(MAIN_CONTAINER);
}