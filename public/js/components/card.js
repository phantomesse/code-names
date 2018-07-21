'use strict';

/** Contains information and HTML element pertaining to a card. */
class Card {
  constructor(data) {
    this.element = Card._createElement(data);
  }

  /** Creates an HTML element, but doesn't render it on the screen. */
  static _createElement(data) {
    return $('<button>')
      .addClass('card')
      .text(data.word);
  }
}