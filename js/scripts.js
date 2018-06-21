var game;

$(document).ready(function() {
  var seed = getSeed();

  getWordBank(WORD_BANK_FILE_NAME).done(function(wordBank) {
    var utils = new Utils(seed, wordBank);
    var words = utils.getWords(GAME_WORD_COUNT);
    var colors = utils.getColors(GAME_WORD_COUNT, BLACK_WORD_COUNT);
    var firstTurnColor = utils.getFirstTurnColor();
    var colorCounts = utils.getColorCounts(GAME_WORD_COUNT, BLACK_WORD_COUNT);

    game = new Game(words, colors, firstTurnColor, colorCounts);
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

  $.get(fileName, function(response) {
    deferred.resolve(response);
  });

  return deferred.promise();
}

function toggleView() {
  console.log('hello');
  game.toggleView();
}
