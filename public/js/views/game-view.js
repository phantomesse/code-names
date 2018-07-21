'use strict';

/**
 * Contains information and HTML element pertaining to a single game session.
 */
class GameView extends View {
  constructor(viewController, sessionName) {
    super(viewController);

    this.sessionName = sessionName;
  }

  get className() {
    return 'game';
  }
}
