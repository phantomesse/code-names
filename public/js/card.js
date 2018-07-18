"use strict";

/// Describes a card.
class Card {
  constructor(sessionName, data) {
    this.sessionName = sessionName;
    this.data = data;
    this.element = this._createElement();

    if (this.data.isFlipped) this._flipCard(false);

    var self = this;
    socket.on(`flip word`, function(word, sessionName) {
      if (sessionName === self.sessionName && word === self.data.word) {
        self._flipCard(false);
      }
    });
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
    if (shouldEmitEvent) {
      socket.emit('flip word', this.data.word, this.sessionName);
    }
    this.element.addClass('flipped ' + this.data.cardType);
  }
}
