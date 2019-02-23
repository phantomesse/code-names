"use strict";

const _SPYMASTER_CLASS_NAME = 'spymaster';

/// Describes a card.
class Card {
  constructor(gameView, sessionName, data) {
    this.gameView = gameView;
    this.sessionName = sessionName;
    this.data = data;
    this.element = this._createElement();

    if (this.data.isFlipped) this._flipCard(false);

    var self = this;
    socket.on('flip word', function (word, sessionName) {
      $('.reset').show();
      if (sessionName !== self.sessionName) return;
      self.gameView.updateCardsLeft();
      if (word === self.data.word) self._flipCard(false);
    });
  }

  setView(view) {
    switch (view) {
      case _View.TEAM:
        this.element.removeClass(_SPYMASTER_CLASS_NAME);

        if (!this.data.isFlipped) this.element.removeClass(this.data.cardType);
        break;
      case _View.SPYMASTER:
        this.element.addClass(_SPYMASTER_CLASS_NAME);

        if (!this.data.isFlipped) this.element.addClass(this.data.cardType);
    }
  }

  _createElement() {
    var self = this;
    return $('<button>')
      .addClass('card')
      .text(this.data.word)
      .click(() => self._flipCard(true))
      .appendTo('.game');
  }

  _flipCard(shouldEmitEvent) {
    $('.reset').show();
    if (shouldEmitEvent) {
      socket.emit('flip word', this.data.word, this.sessionName);
      this.data.isFlipped = true;
      this.gameView.updateCardsLeft();
    }
    this.element
      .addClass('flipped ' + this.data.cardType)
      .attr('tabIndex', '-1');
  }
}
