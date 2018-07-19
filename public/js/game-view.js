"use strict";

const _ROW_COUNT = 5;
const _COLUMN_COUNT = 5;
const _WORD_COUNT = _ROW_COUNT * _COLUMN_COUNT;

/** View for a game session. */
class GameView {
  constructor(sessionName) {
    this.sessionName = sessionName;
    this.cardElements = [];

    var self = this;
    GameView._getGameSessionData(sessionName).done(function(response) {
      // Create card elements.
      for (var key in response.cards) {
        self.cardElements.push(
          new Card(self, self.sessionName, response.cards[key]));
      };

      // Set starting team.
      var startingTeam = response.startingTeam;
      startingTeam = startingTeam.charAt(0).toUpperCase() +
        startingTeam.substr(1) + ' team';
      $('.starting-team')
        .addClass(response.startingTeam)
        .text(startingTeam);

      // Show footer.
      $('footer').removeClass('hidden');

      self.updateCardsLeft();
    });
  }

  static _getGameSessionData(sessionName) {
    var deferred = $.Deferred();
    $.get('/game-session', {
      'sessionName': sessionName
    }, deferred.resolve);
    return deferred.promise();
  }

  updateCardsLeft() {
    $.get('/cards-left', {
      'sessionName': this.sessionName
    }, function(response) {

      $('.words-left.red').text((response['red'] || 0) + ' cards left');
      $('.words-left.blue').text((response['blue'] || 0) + ' cards left');
    });
  }

  _generateCards(data) {
    $('.game').empty();

    var self = this;
    for (var i = 0; i < data.words.length; i++) {
      const word = data.words[i];
      const isFlipped = data.flippedWords.includes(word);

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
