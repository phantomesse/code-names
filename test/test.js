var fs = require('fs');
var assert = require('assert');
var GAME_WORD_COUNT = require('../js/variables').GAME_WORD_COUNT;
var BLACK_WORD_COUNT = require('../js/variables').BLACK_WORD_COUNT;
var Color = require('../js/variables').Color;
var Utils = require('../js/utils');

describe('Utils', function() {
  var seeds;
  var wordBank;
  var wordCount = GAME_WORD_COUNT;

  before(function() {
    seeds = [
      'hello-world',
      'lemons-are-sweet',
      'i-like-to-eat',
      'kittens-are-cute'
    ];
    wordBank = JSON.parse(fs.readFileSync('data/words.json', 'utf8'));
  });

  it('#getRandomNumber returns a random number', function() {
    var utils = new Utils(seeds[0], wordBank);
    assert.equal(utils.getRandomNumber(''), 0.6122790858798908);
  });

  it('#getRandomNumber returns the same random number for the same seed', function() {
    for (var i = 0; i < seeds.length; i++) {
      var utils1 = new Utils(seeds[i], wordBank);
      var utils2 = new Utils(seeds[i], wordBank);
      assert.equal(utils1.getRandomNumber(i.toString()), utils2.getRandomNumber(i.toString()));
    }
  });

  it('#getWords returns a set of unique words', function() {
    var utils = new Utils(seeds[0], wordBank);
    var expectedSet = new Set([
      'Opaque',
      'Shower',
      'Pencil',
      'Organ',
      'Bedbug',
      'Salmon',
      'Tachometer',
      'Wag',
      'Hut',
      'Swamp',
      'Pocket',
      'Bruise',
      'Flu',
      'Applause',
      'Ovation',
      'Time',
      'Candy',
      'Wig',
      'Escalator',
      'Talk',
      'Park',
      'Pastry',
      'Hungry',
      'Cog',
      'Watermelon'
    ]);
    assert.deepEqual(utils.getWords(wordCount), expectedSet);
  });

  it('#getWords returns the same set of unique words for the same seed', function() {
    for (var i = 0; i < seeds.length; i++) {
      var utils1 = new Utils(seeds[i], wordBank);
      var utils2 = new Utils(seeds[i], wordBank);
      assert.deepEqual(utils1.getWords(wordCount), utils2.getWords(wordCount));
    }
  });

  it('#getFirstTurn returns a random color that should go first', function() {
    var utils = new Utils(seeds[0], wordBank);
    assert.equal(utils.getFirstTurnColor(), Color.BLUE);
  });

  it('#getFirstTurn returns the same random color for the same seed', function() {
    for (var i = 0; i < seeds.length; i++) {
      var utils1 = new Utils(seeds[i], wordBank);
      var utils2 = new Utils(seeds[i], wordBank);
      assert.equal(utils1.getFirstTurnColor(), utils2.getFirstTurnColor());
    }
  });

  it('#getColorCounts returns a map of color to color count', function() {
    var utils = new Utils(seeds[0], wordBank);

    var expectedMap = {};
    expectedMap[Color.BLACK] = 1;
    expectedMap[Color.BLUE] = 9;
    expectedMap[Color.RED] = 8;
    expectedMap[Color.YELLOW] = 7;

    assert.deepEqual(utils.getColorCounts(GAME_WORD_COUNT, BLACK_WORD_COUNT), expectedMap);
  });

  it('#getColors returns random colors', function() {
    var utils = new Utils(seeds[0], wordBank);
    var expectedColors = [
      Color.BLACK,
      Color.BLUE,
      Color.RED,
      Color.RED,
      Color.RED,
      Color.YELLOW,
      Color.YELLOW,
      Color.RED,
      Color.RED,
      Color.YELLOW,
      Color.RED,
      Color.BLUE,
      Color.YELLOW,
      Color.RED,
      Color.YELLOW,
      Color.BLUE,
      Color.BLUE,
      Color.YELLOW,
      Color.BLUE,
      Color.YELLOW,
      Color.BLUE,
      Color.BLUE,
      Color.BLUE,
      Color.BLUE,
      Color.RED
    ];
    assert.deepEqual(utils.getColors(GAME_WORD_COUNT, BLACK_WORD_COUNT), expectedColors);
  });

  it('#getColors always returns the same number of each color', function() {
    for (var i = 0; i < seeds.length; i++) {
      var utils = new Utils(seeds[i], wordBank);

      var colors = utils.getColors(GAME_WORD_COUNT, BLACK_WORD_COUNT);
      var actualBlackWordCount = 0;
      var actualBlueWordCount = 0;
      var actualRedWordCount = 0;
      var actualYellowWordCount = 0;

      for (var i = 0; i < colors.length; i++) {
        switch (colors[i]) {
          case Color.BLACK:
            actualBlackWordCount++;
            break;
          case Color.BLUE:
            actualBlueWordCount++;
            break;
          case Color.RED:
            actualRedWordCount++;
            break;
          case Color.YELLOW:
            actualYellowWordCount++;
            break;
        }
      }

      var expectedColorCounts = utils.getColorCounts(GAME_WORD_COUNT, BLACK_WORD_COUNT);
      assert.equal(actualBlackWordCount, expectedColorCounts[Color.BLACK]);
      assert.equal(actualBlueWordCount, expectedColorCounts[Color.BLUE]);
      assert.equal(actualRedWordCount, expectedColorCounts[Color.RED]);
      assert.equal(actualYellowWordCount, expectedColorCounts[Color.YELLOW]);
    }
  });

  it('#getColors returns the same random colors for the same seed', function() {
    for (var i = 0; i < seeds.length; i++) {
      var utils1 = new Utils(seeds[i], wordBank);
      var utils2 = new Utils(seeds[i], wordBank);
      assert.deepEqual(
        utils1.getColors(GAME_WORD_COUNT, BLACK_WORD_COUNT),
        utils2.getColors(GAME_WORD_COUNT, BLACK_WORD_COUNT));
    }
  });
});