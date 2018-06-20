/*var game = new Game();

function toggleView() {
  game.toggleView();
}*/

$(document).ready(function() {
  var seed = 'hello-world';
  
  getWordBank(WORD_BANK_FILE_NAME).done(function(wordBank) {
    var utils = new Utils(seed, wordBank);
    var words = utils.getWords(GAME_WORD_COUNT);
    var game = new Game(words);
  });
});

/** Returns an array of words read from a JSON file. */
function getWordBank(fileName) {
  var deferred = $.Deferred();

  $.get(fileName, function(response) {
    deferred.resolve(response);
  });

  return deferred.promise();
}
