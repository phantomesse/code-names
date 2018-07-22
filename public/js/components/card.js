'use strict';

/** Contains information and HTML element pertaining to a card. */
class Card {
  constructor(viewController, sessionName, data) {
    this.viewController = viewController;
    this.sessionName = sessionName;
    this.data = data;
    this.element = this._createElement();

    const self = this;

    // Handle flipping.
    if (this.data.isFlipped) this._flip();
    socket.on('flip word', function(word, sessionName) {
      if (sessionName !== self.sessionName) return;
      if (word === self.data.word) self._flip(false);
    });
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
      this.viewController.dialog
        .show(`Flip over <b>${self.data.word}</b>?`)
        .done(function(action) {
          if (action === 'submit') {
            self._flip(true);
          }
        });
    }
  }

  /** Flips of the card. */
  _flip(shouldEmitEvent) {
    if (shouldEmitEvent) {
      socket.emit('flip word', this.data.word, this.sessionName);
      this.data.isFlipped = true;
    }
    this.element
      .addClass('flipped ' + this.data.cardType)
      .attr('tabIndex', '-1');
  }
}
