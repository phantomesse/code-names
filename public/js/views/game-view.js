'use strict';

/**
 * Contains information and HTML element pertaining to a single game session.
 */
class GameView extends View {
  constructor(viewController, sessionName) {
    super(viewController);

    this.sessionName = sessionName;

    this.showFooter();

    ApiController.getSession(sessionName).done(function(response) {
      console.log(response);
    });
  }

  get className() {
    return 'game';
  }
}
