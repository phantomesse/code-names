"use strict";

/// Describes a card.
class Card {
  constructor(sessionName, word, type, isFlipped) {
    this.sessionName = sessionName;
    this.word = word;
    this.type = type;
    this.element = this._createElement(isFlipped);
  }

  _createElement(isFlipped) {
    var element = $('<button>')
      .addClass('card')
      .text(this.word)
      .appendTo('.game');

    if (isFlipped) element.addClass('flipped');

    var self = this;
    element.click(function() {
      var data = {
        'word': self.word,
        'sessionName': self.sessionName
      };
      socket.emit('updated flipped word', self.word, self.sessionName);
      element.addClass('flipped');
    });

    socket.on('updated flipped word', function(word, sessionName) {
      if (sessionName === self.sessionName && word === self.word) {
        element.addClass('flipped');
      }
    });
    return element;
  }
}

const CardType = Object.freeze({
  RED: Symbol('red'),
  BLUE: Symbol('blue'),
  NEUTRAL: Symbol('neutral'),
  DEATH: Symbol('death')
});
