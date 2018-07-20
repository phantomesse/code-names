"use strict";

const _ROW_COUNT = 5;
const _COLUMN_COUNT = 5;
const _WORD_COUNT = _ROW_COUNT * _COLUMN_COUNT;

/** View for a game session. */
class GameView {
  constructor(sessionName) {
    this.sessionName = sessionName;
    this.cardElements = [];
    this.view = _View.TEAM;

    var self = this;
    $('.view-toggle').show().click(function() {
      self.view = self.view === _View.TEAM ? _View.SPYMASTER : _View.TEAM;
      history.pushState(null, null,
        '?session=' + self.sessionName + '&view=' + self.view);
      self._toggleView();
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
    this.cardElements.forEach(function(cardElement) {
      cardElement.setView(self.view);
    });
  }

  _createCards(response) {
    $('.game').empty();

    // Create the card elements.
    for (var key in response.cards) {
      const card = new Card(this, this.sessionName, response.cards[key]);
      this.cardElements.push(card);
    }

    var self = this;
    this.cardElements.forEach(function(card) {
      // Handle moving focus with arrow keys.
      card.element.keydown(function(event) {
        const keyCode = event.keyCode;
        if (keyCode < 37 || keyCode > 40) return;

        const index = $(this).index();
        var focusIndex;

        // TODO: Skip cards that have been clicked on.
        switch (keyCode) {
          case 37: // Left.
            focusIndex = self._getLeftFocus(index);
            if (focusIndex === -1) return;
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
    });
  }

  /**
   * Returns the index of the card to focus on when the left arrow key is
   * pressed.
   *
   * Returns -1 if the focus should not move.
   */
  _getLeftFocus(index) {
    if (index === 0) return -1;
    console.log(this.cardElements);

    var focusIndex = index - 1;
    while (this.cardElements[focusIndex].data.isFlipped) {
          console.log(focusIndex);
      console.log(this.cardElements[focusIndex].isFlipped);
      focusIndex -= 1;
    }

    return focusIndex;
  }
}
