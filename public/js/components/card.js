'use strict';

/** Contains information and HTML element pertaining to a card. */
class Card {
  constructor(viewController, data) {
    this.viewController = viewController;
    this.data = data;
    this.element = this._createElement();
  }

  /** Creates an HTML element, but doesn't render it on the screen. */
  _createElement() {
    const self = this;
    return $('<button>')
      .addClass('card')
      .text(this.data.word)
      .click(() => self._handleClick());
  }

  /** Handles card click. */
  _handleClick() {
    const self = this;
    if (!this.data.isFlipped) {
      this.viewController.dialog.show('<b>Hello</b>').done(function(action) {
        if (action === 'submit') {
          self._flip();
        }
      });
    }
  }

  /** Flips of the card. */
  _flip() {
    this.element.addClass('flipped');
  }
}
