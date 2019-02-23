"use strict";

class ViewController {
  constructor() {
    /// Current view.
    this.viewType;
    this.view;

    this._setView();
    var self = this;
    window.onpopstate = () => self._setView();
  }

  _setView() {
    const parameters = getParameters();
    if ('session' in parameters) this.showGameView(parameters['session']);
    else this.showInitView();
  }

  showInitView() {
    this.viewType = View.INIT;
    $('.init').show();
    $('.game').hide();
    this.view = new InitView(this);
  }

  showGameView(sessionName) {
    sessionName = sessionName.toLowerCase();
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
