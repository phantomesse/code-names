"use strict";

/// View for a game session.
class GameView {
  constructor(sessionName) {
    this.sessionName = sessionName;
    this.cards = [];

    var self = this;
    GameView._getGameSessionData(sessionName).done(function(data) {
      self._generateCards(data);
    });
  }

  static _getGameSessionData(sessionName) {
    var deferred = $.Deferred();
    $.get('/game-session', {'sessionName' : sessionName}, deferred.resolve);
    return deferred.promise();
  }

  _generateCards(data) {
    $('.game').empty();
    for (var i = 0; i < data.words.length; i++) {
      this.cards.push(new Card(data.words[i], data.cardTypes[i]));
    }
  }
}
