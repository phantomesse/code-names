var Game = function() {
  this.cards = [];
  this.turn = _getFirstTurn();

  // Set who goes first.
  $('.turn').text((this.turn === Color.RED ? 'Red' : 'Blue') + '\'s Turn');

  // Create cards.
  var self = this;
  _getRandomWords().done(function(words) {
    var blackCount = 1;
    var redCount = self.turn === Color.RED ? 9 : 8;
    var blueCount = self.turn === Color.BLUE ? 9 : 8;
    var yellowCount = GAME_WORD_COUNT - blueCount - redCount - blackCount;

    $('.score.blue').text(blueCount + ' words left');
    $('.score.red').text(redCount + ' words left');

    words.forEach(function(word) {
      var random = parseInt(Math.random() * (redCount + blueCount + blackCount + yellowCount));
      var color;
      if (blackCount > 0 && random == 0) {
        color = Color.BLACK;
        blackCount--;
      } else if (redCount > 0 && random > 0 && random <= redCount) {
        color = Color.RED;
        redCount--;
      } else if (blueCount > 0 && random > redCount && random <= redCount + blueCount) {
        color = Color.BLUE;
        blueCount--;
      } else {
        color = Color.YELLOW;
        yellowCount--;
      }

      var card = new Card(word, color);
      self.cards.push(card);
      card.render();
    });
  });
}

/** Gets GAME_WORD_COUNT random words. */
function _getRandomWords() {
  var deferred = $.Deferred();

  $.get(WORDS_FILENAME, function(response) {
    var totalWordCount = response.length;
    var words = new Set();

    while (words.size < GAME_WORD_COUNT) {
      var random = parseInt(Math.random() * totalWordCount);
      var word = response[random];
      words.add(word);
    }

    deferred.resolve(words);
  });

  return deferred.promise();
}

/** Determines randomly if red or blue goes first. */
function _getFirstTurn() {
  return parseInt(Math.random() * 2) === 0 ? Color.RED : Color.BLUE;
}
