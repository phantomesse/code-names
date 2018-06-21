var Game = function(words, colors, firstTurnColor, colorCounts) {
  this.words = words;
  this.colors = colors;
  this.firstTurnColor = firstTurnColor;

  this.cards = [];
  this.view = View.NORMAL;

  // Set who goes first.
  $('.turn').text(firstTurnColor + ' goes first');

  this.blueWordsLeft = colorCounts[Color.BLUE];
  this.redWordsLeft = colorCounts[Color.RED];
  this.updateScore();

  // Create cards.
  var iterator = this.words.values();
  for (var i = 0; i < this.words.size; i++) {
    var card = new Card(iterator.next().value, colors[i]);
    this.cards.push(card);
    card.render();
    card.element.on('update-score', function(event, color) {
      if (color === Color.RED) {
        this.redWordsLeft--;
      } else if (color === Color.BLUE) {
        this.blueWordsLeft--;
      }
      this.updateScore();
    });
  }
}

/** Toggles between spymaster and normal views. */
Game.prototype.toggleView = function() {
  console.log('toggling view ' + this.view);
  if (this.view === View.SPYMASTER) {
    this.view = View.NORMAL;
  } else {
    this.view = View.SPYMASTER;
  }

  if (this.view === View.SPYMASTER) {
    MAIN_CONTAINER.addClass('spymaster');
    $('.spymaster-toggle').text('Normal');
  } else {
    MAIN_CONTAINER.removeClass('spymaster');
    $('.spymaster-toggle').text('Spymaster');
  }
}

/** Updates the score with the number of words left to guess for both red and blue teams. */
Game.prototype.updateScore = function() {
  var redScoreMessage = this.redWordsLeft
      + ((this.redWordsLeft === 1) ? ' word ' : ' words ') + 'left';
  var blueScoreMessage = this.blueWordsLeft
      + ((this.blueWordsLeft === 1) ? ' word ' : ' words ') + 'left';

  $('.score.red').text(redScoreMessage);
  $('.score.blue').text(blueScoreMessage);
}
