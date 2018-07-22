'use strict';

/**
 * Contains information and HTML element pertaining to a single game session.
 */
class GameView extends View {
  constructor(viewController, sessionName) {
    super(viewController);

    this.sessionName = sessionName;
    this.cards;

    this.startingTeamElement = $('<b>');
    $('<span>')
      .addClass('starting-team')
      .append(this.startingTeamElement)
      .append(' team goes first')
      .appendTo('footer');

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

    // Which team starts first.
    const startingTeam = response.startingTeam;
    this.startingTeamElement
      .removeClass()
      .addClass(startingTeam)
      .text(startingTeam.charAt(0).toUpperCase() + startingTeam.substr(1));
  }
}
