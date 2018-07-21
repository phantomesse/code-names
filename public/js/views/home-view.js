'use strict';

/**
 * Represents the home page where a user can create a new game.
 */
class HomeView extends View {
  constructor(viewController) {
    super(viewController);

    /** Form input for session name. */
    this.input;

    this.hideFooter();
    this._createSessionForm();
  }

  get className() {
    return 'home';
  }

  /** Creates a form for users to enter a session to join. */
  _createSessionForm() {
    const self = this;
    const form = $('<form>')
      .submit((event) => self._handleSessionFormSubmit(event))
      .appendTo(this.element);

    this.input = $('<input type="text">')
      .attr('placeholder', 'enter a session name')
      .appendTo(form)
      .focus();

    // TODO: change submit val to "join session" if the session name exists.
    const submit = $('<input type="submit">')
      .val('create session')
      .appendTo(form);
  }

  _handleSessionFormSubmit(event) {
    event.preventDefault();
    const sessionName = this.input.val();
    // TODO: validate session name.

    this.viewController.showGameView(sessionName);
  }
}
