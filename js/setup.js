/** Sets up the Code Names game by generating a random Game with Cards based on a seed. */
(function() {
  var Setup = (function() {
    var Setup = function(wordsFileName) {
      this.wordsFileName = wordsFileName;
      console.log('hi');
    };

    /** Reads a number of random words for the Cards. */
    Setup.prototype.getWords = function getWords() {
      return this.wordsFileName;
    };

    return Setup;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Setup;
  } else {
    window.Setup = Setup;
  }
})();