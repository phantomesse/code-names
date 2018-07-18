"use strict";

const dataGenerator = require('./data-generator.js');

const wordCount = 25;

/**
 * Describes a game session in which one game is played from start to finish.
 */
class GameSession {
  constructor(sessionName) {
    /**
     * Key for other players to log into this game.
     *
     * The session name must be a string.
     */
    this.sessionName = sessionName;

    /**
     * Number of connections attached to this game session.
     *
     * When the connection count is 0, this session instance should be
     * destroyed.
     */
    this.connectionCount = 1;

    /** Which team goes first (CardType.RED or CardType.BLUE). */
    this.startingTeam = dataGenerator.getStartingTeam();

    /** Map of word to card in this game. */
    this.cards = GameSession.generateCards(wordCount, this.startingTeam);
  }

  flipWord(word) {
    this.cards[word].isFlipped = true;
  }

  static generateCards(wordCount, startingTeam) {
    const words = dataGenerator.getWords(wordCount);
    const cardTypes = dataGenerator.getCardTypes(wordCount, startingTeam);

    var cards = {};
    for (var i = 0; i < wordCount; i++) {
      const word = words[i];
      cards[word] = new _Card(word, cardTypes[i]);
    }
    return cards;
  }
}

/**
 * Data structure for a card.
 */
class _Card {
  constructor(word, cardType) {
    this.word = word;
    this.cardType = cardType;
    this.isFlipped = false;
  }
}

module.exports = GameSession;
