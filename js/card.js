var Card = function(word, color) {
  this.word = word;
  this.color = color;
}

Card.prototype.render = function() {
  var card = $('<button>')
    .addClass('card')
    .text(this.word)
    .click(function() {
      $(this).addClass('active');
    })
    .keydown(function(event) {
      var keyCode = event.keyCode;
      if (keyCode < 37 || keyCode > 40) return;

      var index = $(this).index();
      var focusIndex;

      // TODO: Skip cards that have been clicked on.
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

  switch (this.color) {
    case Color.RED:
      card.addClass('red');
      break;
    case Color.BLUE:
      card.addClass('blue');
      break;
    case Color.YELLOW:
      card.addClass('yellow');
      break;
    case Color.BLACK:
      card.addClass('black');
      break;
  }
}
