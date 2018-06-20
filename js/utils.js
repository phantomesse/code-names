const ROW_WORD_COUNT = 5;
const COLUMN_WORD_COUNT = 5;
const GAME_WORD_COUNT = ROW_WORD_COUNT * COLUMN_WORD_COUNT;

/** Sets up the Code Names game by generating a random Game with Cards based on a seed. */
(function() {
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
    }

    /** Reads a number of random words for the Cards. */
    Utils.prototype.getWords = function getWords() {
      var words = new Set();

      var i = 0;
      while (words.size < GAME_WORD_COUNT) {
        i++;
        var randomIndex = parseInt(this.getRandomNumber(i.toString()) * 255);
        words.add(this.wordBank[randomIndex]);
      }

      return words;
    };

    return Utils;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Utils;
  } else {
    window.Utils = Utils;
  }
})();