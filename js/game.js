var Game = function(words, colors, firstTurnColor, colorCounts) {
  var self = this;
  self.words = words;
  self.colors = colors;
  self.firstTurnColor = firstTurnColor;
  self.colorCounts = colorCounts;

  self.cards = [];
  self.view = View.NORMAL;

  // Set who goes first.
  $('.turn').text(firstTurnColor + ' goes first');

  self.initScores();

  // Create cards.
  var iterator = self.words.values();
  for (var i = 0; i < this.words.size; i++) {
    var card = new Card(iterator.next().value, colors[i]);
    self.cards.push(card);
    card.render();
    card.element.on('update-score', function(event, color) {
      if (color === Color.RED) {
        self.redWordsLeft--;
      } else if (color === Color.BLUE) {
        self.blueWordsLeft--;
      }
      self.updateScore();
    });
  }

  self.dialog = new Dialog(/* onClose */ function() {
    self.initScores();

    self.cards.forEach(function(card) {
      card.reset();
    });
  });
}

Game.prototype.initScores = function() {
  this.blueWordsLeft = this.colorCounts[Color.BLUE];
  this.redWordsLeft = this.colorCounts[Color.RED];
  this.updateScore();
};

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

  if (this.redWordsLeft === 0) {
    this.dialog.showWinner(Color.RED);
  } else if (this.blueWordsLeft === 0) {
    this.dialog.showWinner(Color.BLUE);
  }
}
