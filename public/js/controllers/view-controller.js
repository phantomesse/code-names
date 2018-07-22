'use strict';

const _SESSION_PARAMETER_KEY = 'session';
const _MODE_KEY = 'mode';

/**
 * Controls which view to show based on the URL and updates the URL based on the
 * view shown.
 */
class ViewController {
  constructor() {
    this.currentView;
    this.dialog = new Dialog();

    this._renderView();

    const self = this;
    window.onpopstate = () => self._renderView();
  }

  showGameView(sessionName) {
    var parameters = {};
    parameters[_SESSION_PARAMETER_KEY] = sessionName;
    ViewController._updateUrlParameters(parameters);
    this._renderView();
  }

  /** Shows the correct view according to the URL parameters. */
  _renderView() {
    const parameters = ViewController._getUrlParameters();

    if (_SESSION_PARAMETER_KEY in parameters) {
      // Show game view.
      this.currentView = new GameView(this, parameters[_SESSION_PARAMETER_KEY]);
    } else {
      // Show home view.
      this.currentView = new HomeView(this);
    }
  }

  /** Updates the URL parameters with the given parameters. */
  static _updateUrlParameters(parameters) {
    var str = '?';
    for (const key in parameters) {
      str += key + '=' + parameters[key] + '&';
    }
    history.pushState(null, null, str.substring(str, str.length - 1));
  }

  /** Returns the URL parameters as a map. */
  static _getUrlParameters() {
    const parameters = {};
    window.location.search.substr(1).split('&').forEach(
      function(parameterStr) {
        const parameter = parameterStr.split('=');
        parameters[parameter[0]] = parameter[1];
      });
    return parameters;
  }
}
