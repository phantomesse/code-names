'use strict';

const _ROW_COUNT = 5;
const _COLUMN_COUNT = 5;
const _WORD_COUNT = _ROW_COUNT * _COLUMN_COUNT;

/**
 * Contains information and HTML element pertaining to a single game session.
 */
class GameView extends View {
  constructor(viewController, sessionName) {
    super(viewController);

    this.sessionName = sessionName;
    this.cards;

    this.startingTeamElement = $('<b>');
    $('<span>')
      .addClass('starting-team')
      .append(this.startingTeamElement)
      .append(' team goes first')
      .appendTo('footer');

    this.showFooter();

    const self = this;
    ApiController.getSession(sessionName).done(
      response => self._renderGame(response));
  }

  get className() {
    return 'game';
  }

  _renderGame(response) {
    const self = this;

    // Render cards.
    this.cards = [];
    for (var key in response.cards) {
      const card = new Card(
        this.viewController, this.sessionName, response.cards[key]);
      card.element.appendTo(this.element);
      this.cards.push(card);
    }

    // Handle focus move.
    this.cards.forEach((card) => self._handleCardFocus(card));

    // Auto focus on the first unflipped card.
    for (var i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      if (!card.data.isFlipped) {
        card.element.focus();
        break;
      }
    }

    // Which team starts first.
    const startingTeam = response.startingTeam;
    this.startingTeamElement
      .removeClass()
      .addClass(startingTeam)
      .text(startingTeam.charAt(0).toUpperCase() + startingTeam.substr(1));
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
