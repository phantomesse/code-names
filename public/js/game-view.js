"use strict";

const _ROW_COUNT = 5;
const _COLUMN_COUNT = 5;
const _WORD_COUNT = _ROW_COUNT * _COLUMN_COUNT;

/** View for a game session. */
class GameView {
  constructor(sessionName) {
    this.sessionName = sessionName;
    this.cards = [];
    this.view = _View.TEAM;

    const self = this;
    $('.view-toggle').show().click(function() {
      self.view = self.view === _View.TEAM ? _View.SPYMASTER : _View.TEAM;
      history.pushState(null, null,
        '?session=' + self.sessionName + '&view=' + self.view);
      self._toggleView();
    });

    $('.reset').click(function() {
      $.get('/reset', {
        'sessionName': self.sessionName
      }, function(response) {
        $('.game').empty();

        // Create card elements.
        self._createCards(response);

        // Set starting team.
        var startingTeam = response.startingTeam;
        startingTeam = startingTeam.charAt(0).toUpperCase() +
          startingTeam.substr(1) + ' team';
        $('.starting-team')
          .removeClass('red')
          .removeClass('blue')
          .addClass(response.startingTeam)
          .text(startingTeam);

        self.updateCardsLeft();
        self._toggleView();
      });
    });

    GameView._getGameSessionData(sessionName).done(function(response) {
      // Create card elements.
      self._createCards(response);

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

      // Determine which view to show.
      const parameters = getParameters();
      if ('view' in parameters) self.view = parameters['view'];
      self._toggleView();
    });
  }

  updateCardsLeft() {
    $.get('/cards-left', {
      'sessionName': this.sessionName
    }, function(response) {
      $('.words-left.red').text((response['red'] || 0) + ' cards left');
      $('.words-left.blue').text((response['blue'] || 0) + ' cards left');
    });
  }

  static _getGameSessionData(sessionName) {
    var deferred = $.Deferred();
    $.get('/game-session', {
      'sessionName': sessionName
    }, deferred.resolve);
    return deferred.promise();
  }

  _toggleView() {
    // Change the text of the view toggle button.
    switch (this.view) {
      case _View.TEAM:
        $('.view-toggle').text('Spymaster View');
        break;
      case _View.SPYMASTER:
        $('.view-toggle').text('Team View');
    }

    var self = this;
    this.cards.forEach(function(cardElement) {
      cardElement.setView(self.view);
    });
  }

  /** Create card elements. */
  _createCards(response) {
    $('.game').empty();

    // Create the card elements.
    for (var key in response.cards) {
      const card = new Card(this, this.sessionName, response.cards[key]);
      this.cards.push(card);
    }

    // Handle focus move.
    const self = this;
    this.cards.forEach((card) => self._handleCardFocus(card));

    // Auto focus on the first unflipped card.
    for (var i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      if (!card.data.isFlipped) {
        card.element.focus();
        break;
      }
    }
  }

  /** Handle moving focus with arrow keys. */
  _handleCardFocus(card) {
    const self = this;
    card.element.keydown(function(event) {
      const keyCode = event.keyCode;
      if (keyCode < 37 || keyCode > 40) return;
      event.preventDefault();

      var index = $(this).index();

      do {
        index = GameView._getFocusIndex(keyCode, index);
      } while (self.cards[index].data.isFlipped);

      $(this).blur();
      $('.card').get(index).focus();
    });
  }

  /** Returns the next focus index. */
  static _getFocusIndex(keyCode, index) {
    switch (keyCode) {
      case 37: // Left.
        if (index === 0) return _WORD_COUNT - 1;
        return index - 1;
      case 38: // Up.
        if (index === 0) return _WORD_COUNT - 1;
        if (index < _ROW_COUNT) return _WORD_COUNT - _ROW_COUNT + (index - 1);
        return index - _ROW_COUNT;
      case 39: // Right.
        if (index == _WORD_COUNT - 1) index = 0;
        return index + 1;
      case 40: // Down.
        if (index === _WORD_COUNT - 1) return 0;
        if (index > _WORD_COUNT - _ROW_COUNT - 1) {
          return _ROW_COUNT - _WORD_COUNT + index + 1;
        }
        return index + _ROW_COUNT;
    }
  }
}