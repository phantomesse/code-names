var MAIN_CONTAINER = $('main');

var ROW_WORD_COUNT = 5;
var COLUMN_WORD_COUNT = 5;
var GAME_WORD_COUNT = ROW_WORD_COUNT * COLUMN_WORD_COUNT;

var Card = function(word) {
  this.word = word;
}

Card.prototype.render = function() {
  $('<button>')
      .addClass('card')
      .text(this.word)
      .keydown(function(event) {
        var keyCode = event.keyCode;
        if (keyCode < 37 || keyCode > 40) return;

        var index = $(this).index();
        var focusIndex;

        switch (event.keyCode) {
          case 37: // Left.
            if (index == 0) return;
            focusIndex = index - 1;
            break;
          case 38: // Up.
            if (index < ROW_WORD_COUNT) return;
            focusIndex = index - ROW_WORD_COUNT;
            break;
          case 39: // Right.
            if (index == GAME_WORD_COUNT - 1) return;
            focusIndex = index + 1;
            break;
          case 40: // Down.
            if (index > GAME_WORD_COUNT - ROW_WORD_COUNT - 1) return;
            focusIndex = index + ROW_WORD_COUNT;
            break;
        }

        $(this).blur();
        $('.card').get(focusIndex).focus();
      })
      .appendTo(MAIN_CONTAINER);
}