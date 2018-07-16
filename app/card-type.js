"use strict";

const CardType = Object.freeze({
  RED: Symbol('red'),
  BLUE: Symbol('blue'),
  NEUTRAL: Symbol('neutral'),
  DEATH: Symbol('death')
});

module.exports = CardType;
