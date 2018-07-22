'use strict';

/** Contains information and HTML element pertaining to a card. */
class Card {
  constructor(data) {
    this.word = data.word;
    this.state = data.isFlipped ? _CardState.FLIPPED : _CardState.UNFLIPPED;
    this.element = this._createElement(this.word);
  }

  /** Creates an HTML element, but doesn't render it on the screen. */
  _createElement() {
    const self = this;
    return $('<button>')
      .addClass('card')
      .text(this.word)
      .click(() => self._handleClick());
  }

  /** Handles card click. */
  _handleClick() {
    switch (this.state) {
      case _CardState.UNFLIPPED:
        this._updateState(_CardState.SELECTED);
        break;
      case _CardState.SELECTED:
        this._updateState(_CardState.FLIPPED);
        break;
      case _CardState.FLIPPED:
        return;
    }
  }

  /** Updates the state of the card. */
  _updateState(state) {
    this.state = state;
    for (const key in _CardState) {
      const state = _CardState[key];
      if (state === this.state) this.element.addClass(state);
      else this.element.removeClass(state);
    }
  }
}

const _CardState = Object.freeze({
  UNFLIPPED: 'unflipped',
  SELECTED: 'selected',
  FLIPPED: 'flipped'
});
