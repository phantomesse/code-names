'use strict';

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
    this.startingTeam;

    /** Map of word to card in this game. */
    this.cards;

    // Instantiate the game.
    this.reset();
  }

  /** Generates new starting team and cards. */
  reset() {
    this.startingTeam = dataGenerator.getStartingTeam();
    this.cards = GameSession.generateCards(wordCount, this.startingTeam);
  }

  /** Updates a word to flipped. */
  flipWord(word) {
    this.cards[word].isFlipped = true;
  }

  /**
   * Returns map of card type to number of unflipped cards in that card type.
   */
  getCardsLeft() {
    var cardsLeft = {};

    for (var key in this.cards) {
      const card = this.cards[key];
      const cardType = card.cardType;

      if (card.isFlipped) continue;

      if (cardType in cardsLeft) cardsLeft[cardType]++;
      else cardsLeft[cardType] = 1;
    }

    return cardsLeft;
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
