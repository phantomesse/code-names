'use strict';

/**
 * Contains information and HTML element pertaining to a single game session.
 */
class GameView extends View {
  constructor(viewController, sessionName) {
    super(viewController);

    this.sessionName = sessionName;
    this.cards;

    this.showFooter();

    const self = this;
    ApiController.getSession(sessionName).done(
      response => self._renderGame(response));
  }

  get className() {
    return 'game';
  }

  _renderGame(response) {
    const self = this;

    console.log(response);

    // Render cards.
    this.cards = [];
    for (var key in response.cards) {
      const card = new Card(
        this.viewController,
        this.sessionName,
        response.cards[key]);
      card.element.appendTo(this.element);
      this.cards.push(card);
    }
  }
}
