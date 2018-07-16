"use strict";

/// Describes a card.
class Card {
  constructor(word, type) {
    this.word = word;
    this.type = type;
    this.element = this._createElement();
  }

  _createElement() {
    var element = $('<div>')
        .addClass('card')
        .text(this.word)
        .appendTo('.game');
    return element;
  }
}

const CardType = Object.freeze({
  RED: Symbol('red'),
  BLUE: Symbol('blue'),
  NEUTRAL: Symbol('neutral'),
  DEATH: Symbol('death')
});
