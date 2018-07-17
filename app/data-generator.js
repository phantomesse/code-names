"use strict";

const fs = require('fs');
const path = require('path');
const CardType = require('./card-type.js');

const WORDS_FILE_PATH = path.join(__dirname, '../data/words.json');
const DEATH_CARD_COUNT = 1;

/// Generates random data for each game session.
class DataGenerator {
  constructor() {
    /// All words in an array.
    this.words = JSON.parse(fs.readFileSync(WORDS_FILE_PATH, 'utf8'));
  }

  /// Retrieves a random array of words.
  getWords(wordCount) {
    var words = new Set();

    while (words.size < wordCount) {
      const index = parseInt(Math.random() * this.words.length)
      words.add(this.words[index]);
    }

    return Array.from(words);
  }

  /// Returns either CardType.RED or CardType.BLUE.
  getStartingTeam() {
    return parseInt(Math.random() * 2) === 0 ? CardType.RED : CardType.BLUE;
  }

  /// Retrieves a random array of types.
  getCardTypes(typeCount, startingTeam) {
    var deathCardCount = DEATH_CARD_COUNT;
    var startingTeamCardCount = parseInt(typeCount / 3) + 1;
    var secondTeamCardCount = startingTeamCardCount - 1;
    var neutralCardCount = typeCount - deathCardCount - startingTeamCardCount -
      secondTeamCardCount;

    var cardTypes = new Array(typeCount);
    cardTypes = DataGenerator._setCardTypes(cardTypes, CardType.DEATH,
      deathCardCount);
    cardTypes = DataGenerator._setCardTypes(cardTypes, startingTeam,
      startingTeamCardCount);
    cardTypes = DataGenerator._setCardTypes(
      cardTypes,
      startingTeam === CardType.RED ? CardType.BLUE : CardType.RED,
      secondTeamCardCount);
    cardTypes = DataGenerator._setCardTypes(cardTypes, CardType.NEUTRAL,
      neutralCardCount);

    return cardTypes;
  }

  /// Sets a [typeCount] of card T
  static _setCardTypes(cardTypes, cardType, typeCount) {
    while (typeCount > 0) {
      const index = parseInt(Math.random() * cardTypes.length);
      if (cardTypes[index] === undefined) {
        cardTypes[index] = cardType.toString();
        typeCount--;
      }
    }
    return cardTypes;
  }
}

module.exports = new DataGenerator();
