/*var game = new Game();

function toggleView() {
  game.toggleView();
}*/

$(document).ready(function() {
  var seed = getSeed();

  getWordBank(WORD_BANK_FILE_NAME).done(function(wordBank) {
    var utils = new Utils(seed, wordBank);
    var words = utils.getWords(GAME_WORD_COUNT);
    var game = new Game(words);
  });
});

/**
 * Gets the seed from the URL parameter ?seed=.
 *
 * If the seed does not exist in the URL parameter, generate a new seed.
 **/
function getSeed() {
  var parameters = window.location.search.slice(1).split('&');
  for (var i = 0; i < parameters.length; i++) {
    var keyValuePair = parameters[i].split('=');
    if (keyValuePair[0] === 'seed') {
      return keyValuePair[1];
    }
  }
  // TODO: Generate a random seed.
  return 'hello-world';
}

/** Returns an array of words read from a JSON file. */
function getWordBank(fileName) {
  var deferred = $.Deferred();

  console.log(window.location);

  $.get(fileName, function(response) {
    deferred.resolve(response);
  });

  return deferred.promise();
}
