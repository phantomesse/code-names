var WORDS_FILENAME = 'data/words.json';
var GAME_WORD_COUNT = 25;

$(document).ready(function() {
  getRandomWords().done(function(words) {
    words.forEach(function(word) {
      var card = new Card(word);
      card.render();
    });
  });
});

function getRandomWords() {
  var deferred = $.Deferred();

  $.get(WORDS_FILENAME, function(response) {
    var totalWordCount = response.length;
    var words = new Set();

    for (var i = 0; i < GAME_WORD_COUNT; i++) {
      var random = parseInt(Math.random() * totalWordCount);
      var word = response[random];
      words.add(word);
    }

    deferred.resolve(words);
  });

  return deferred.promise();
}
