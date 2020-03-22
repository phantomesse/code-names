"use strict";

const assert = require('assert');
const CardType = require('../app/card-type.js');
const dataGenerator = require('../app/data-generator.js');

describe('DataGenerator tests', function() {
  it('#getWords returns the correct number of words', function() {
    const wordCount = 25;
    const words = dataGenerator.getWords(wordCount, []);
    assert.strictEqual(words.length, wordCount);
  });

  it('#getWords returns words that are all different', function() {
    const wordCount = 25;
    const wordSet = new Set(dataGenerator.getWords(wordCount, []));
    assert.strictEqual(wordSet.size, wordCount);
  });

  it('#getStarting team returns either CardType.RED or CardType.BLUE',
    function() {
      const testRuns = 10;
      for (var i = 0; i < testRuns; i++) {
        const startingTeam = dataGenerator.getStartingTeam();
        assert.strictEqual(
          [CardType.RED, CardType.BLUE].includes(startingTeam),
          true);
      }
    });

  it('#getCardTypes returns the correct number of cards per type if ' +
    'CardType.BLUE is the starting team',
    function() {
      const cardCount = 25;
      const startingTeam = CardType.BLUE;
      const cardTypes = dataGenerator.getCardTypes(cardCount, startingTeam);
      assertCardTypeCounts(cardTypes, {
        red: 8,
        blue: 9,
        death: 1,
        neutral: 7
      });
    });

  it('#getCardTypes returns the correct number of cards per type if ' +
    'CardType.RED is the starting team',
    function() {
      const cardCount = 25;
      const startingTeam = CardType.RED;
      const cardTypes = dataGenerator.getCardTypes(cardCount, startingTeam);
      assertCardTypeCounts(cardTypes, {
        red: 9,
        blue: 8,
        death: 1,
        neutral: 7
      });
    });
});

function assertCardTypeCounts(cardTypes, expectedCardCounts) {
  var redCardCount = 0;
  var blueCardCount = 0;
  var deathCardCount = 0;
  var neutralCardCount = 0;

  cardTypes.forEach(function(cardType) {
    switch (cardType) {
      case CardType.RED:
        redCardCount++;
        break;
      case CardType.BLUE:
        blueCardCount++;
        break;
      case CardType.DEATH:
        deathCardCount++;
        break;
      case CardType.NEUTRAL:
        neutralCardCount++;
        break;
    }
  });

  assert.strictEqual(redCardCount, expectedCardCounts.red);
  assert.strictEqual(blueCardCount, expectedCardCounts.blue);
  assert.strictEqual(deathCardCount, expectedCardCounts.death);
  assert.strictEqual(neutralCardCount, expectedCardCounts.neutral);
}
