"use strict";

const _ROW_COUNT = 5;
const _COLUMN_COUNT = 5;
const _WORD_COUNT = _ROW_COUNT * _COLUMN_COUNT;

/** View for a game session. */
class GameView {
  constructor(sessionName) {
    this.sessionName = sessionName;
    this.cards = [];

    var self = this;
    GameView._getGameSessionData(sessionName).done(function(data) {
      self._generateCards(data);
    });
  }

  static _getGameSessionData(sessionName) {
    var deferred = $.Deferred();
    $.get('/game-session', {
      'sessionName': sessionName
    }, deferred.resolve);
    return deferred.promise();
  }

  _generateCards(data) {
    $('.game').empty();

    var self = this;
    for (var i = 0; i < data.words.length; i++) {
      const word = data.words[i];
      const isFlipped = data.flippedWords.includes(word);

      // Create card component and push to cards array.
      const card =
        new Card(this.sessionName, word, data.cardTypes[i], isFlipped);
      this.cards.push(card);

      // Handle moving focus with arrow keys.
      card.element.keydown(function(event) {
        const keyCode = event.keyCode;
        if (keyCode < 37 || keyCode > 40) return;

        const index = $(this).index();
        var focusIndex;

        // TODO: Skip cards that have been clicked on.
        switch (keyCode) {
          case 37: // Left.
            if (index == 0) return;
            focusIndex = index - 1;
            break;
          case 38: // Up.
            if (index < _ROW_COUNT) return;
            focusIndex = index - _ROW_COUNT;
            break;
          case 39: // Right.
            if (index == _WORD_COUNT - 1) return;
            focusIndex = index + 1;
            break;
          case 40: // Down.
            if (index > _WORD_COUNT - _ROW_COUNT - 1) return;
            focusIndex = index + _ROW_COUNT;
            break;
        }

        $(this).blur();
        $('.card').get(focusIndex).focus();
      });
    }
  }
}
