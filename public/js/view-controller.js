"use strict";

class ViewController {
  constructor() {
    /// Current view.
    this.viewType;
    this.view;

    this._setView();
    var self = this;
    window.onpopstate = function() {
      console.log('hi');
      self._setView();
    }
  }

  _setView() {
    var parameters = window.location.search.substr(1).split('&');
    var hasGameView = false;
    for (var i = 0; i < parameters.length; i++) {
      var parameter = parameters[i].split('=');
      var key = parameter[0];
      var sessionName = parameter[1];
      if (key === 'session') {
        this.showGameView(sessionName);
        hasGameView = true;
        break;
      }
    }
    if (!hasGameView) this.showInitView();
  }

  showInitView() {
    this.viewType = View.INIT;
    $('.init').show();
    $('.game').hide();
    this.view = new InitView(this);
  }

  showGameView(sessionName) {
    this.viewType = View.GAME;
    $('.init').hide();
    $('.game').show();
    this.view = new GameView(sessionName);
  }
}

const View = Object.freeze({
  INIT: Symbol('init'),
  GAME: Symbol('game')
});
