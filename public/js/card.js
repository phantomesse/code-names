"use strict";

/// Describes a card.
class Card {
  constructor(sessionName, word, type, isFlipped) {
    this.sessionName = sessionName;
    this.word = word;
    this.type = type;
    this.isFlipped = isFlipped;
    this.element = this._createElement();

    if (this.isFlipped) this._flipCard(false);

    var self = this;
    socket.on('updated flipped word', function(word, sessionName) {
      if (sessionName === self.sessionName && word === self.word) {
        self._flipCard(false);
      }
    });
  }

  _createElement() {
    var self = this;
    var element = $('<button>')
      .addClass('card')
      .text(this.word)
      .click(() => self._flipCard(true))
      .appendTo('.game');
    return element;
  }

  _flipCard(shouldEmitEvent) {
    if (shouldEmitEvent) {
      socket.emit('updated flipped word', this.word, this.sessionName);
    }

    this.element.addClass('flipped ' + this.type);
  }
}

const CardType = Object.freeze({
  RED: Symbol('red'),
  BLUE: Symbol('blue'),
  NEUTRAL: Symbol('neutral'),
  DEATH: Symbol('death')
});
