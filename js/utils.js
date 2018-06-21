/* Load in Color for test. */
if (typeof Color === 'undefined') {
  Color = require('../js/variables').Color;
}

/** Sets up the Code Names game by generating a random Game with Cards based on a seed. */
var Utils = (function() {
  var Utils = function(seed, wordBank) {

    /**
     * Seed used to ensure that randomly generating Game and Cards are always randomly generated
     * in the same way.
     **/
    this.seed = seed;

    /** Array of words that can be used. */
    this.wordBank = wordBank;
  };

  /**
   * Generates a random number from the seed.
   *
   * https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
   **/
  Utils.prototype.getRandomNumber = function getRandomNumber(seed) {
    seed += this.seed;
    var numString = '';
    for (var i = 0; i < seed.length; i++) {
      var characterNum = seed.charCodeAt(i) * (i + 1);
      numString += characterNum;
    }
    var x = Math.sin(parseInt(numString) + 1) * 10000;
    return x - Math.floor(x);
  };

  /** Retrieves a number of random words for the Cards. */
  Utils.prototype.getWords = function getWords(wordCount) {
    var words = new Set();

    var i = 0;
    while (words.size < wordCount) {
      i++;
      var randomIndex = parseInt(this.getRandomNumber(i.toString()) * this.wordBank.length);
      words.add(this.wordBank[randomIndex]);
    }

    return words;
  };

  /** Randomly determines whether Color.BLUE or Color.RED should go first. */
  Utils.prototype.getFirstTurnColor = function getFirstTurnColor() {
    var random = parseInt(this.getRandomNumber('color') * 2);
    return random === 0 ? Color.BLUE : Color.RED;
  };

  /** Returns the number of each color in an map of color to int. */
  Utils.prototype.getColorCounts = function getColorCounts(wordCount, blackWordCount) {
    var blueWordCount = parseInt((wordCount - blackWordCount) / 3);
    var redWordCount = blueWordCount;
    if (this.getFirstTurnColor() === Color.BLUE) {
      blueWordCount++;
    } else {
      redWordCount++;
    }
    var yellowWordCount = wordCount - blackWordCount - blueWordCount - redWordCount;

    var map = {};
    map[Color.BLACK] = blackWordCount;
    map[Color.BLUE] = blueWordCount;
    map[Color.RED] = redWordCount;
    map[Color.YELLOW] = yellowWordCount;
    return map;
  }

  /** Returns a number of random colors for the Cards. */
  Utils.prototype.getColors = function getColors(wordCount, blackWordCount) {
    var colors = [];
    var colorCounts = this.getColorCounts(wordCount, blackWordCount);

    var randomSeed = 0;
    var self = this;
    placeWords(Color.BLACK, colorCounts[Color.BLACK]);
    placeWords(Color.BLUE, colorCounts[Color.BLUE]);
    placeWords(Color.RED, colorCounts[Color.RED]);
    placeWords(Color.YELLOW, colorCounts[Color.YELLOW]);

    function placeWords(color, count) {
      while (count > 0) {
        var index = parseInt(self.getRandomNumber(randomSeed) * wordCount);
        if (typeof colors[index] === 'undefined') {
          colors[index] = color;
          count--;
        }
        randomSeed++;
      }
    }

    return colors;
  };

  return Utils;
})();

/* Export modules for testing. */
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Utils;
}