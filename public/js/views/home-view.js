'use strict';

/**
 * Represents the home page where a user can create a new game.
 */
class HomeView extends View {
  constructor(viewController) {
    super(viewController);

    /** Form for session name. */
    this.form;

    /** Form input for session name. */
    this.input;

    /** Form submit button. */
    this.submitButton;

    /** Container for an error. */
    this.errorContainer;

    this.hideFooter();
    this._createSessionForm();
  }

  get className() {
    return 'home';
  }

  /** Creates a form for users to enter a session to join. */
  _createSessionForm() {
    const self = this;

    this.form = $('<form>')
      .submit((event) => self._handleSessionFormSubmit(event))
      .appendTo(this.element);

    this.input = $('<input type="text">')
      .attr('placeholder', 'enter a session name')
      .on('focus', () => self._hideError())
      .keyup(function() {
        const sessionName = $(this).val();
        ApiController.doesSessionExist(sessionName).done(function(response) {
          if (response.exists) self.submitButton.val('join session');
          else self.submitButton.val('create session');
        });
      })
      .appendTo(this.form)
      .focus();

    // TODO: change submit val to "join session" if the session name exists.
    this.submitButton = $('<input type="submit">')
      .val('create session')
      .appendTo(this.form);

    this.errorContainer = $('<span>')
      .addClass('error')
      .appendTo(this.form);
  }

  _handleSessionFormSubmit(event) {
    event.preventDefault();
    const sessionName = this.input.val();

    const self = this;
    ApiController.validateSessionName(sessionName).done(function(validation) {
      if (validation.isValid) {
        self.viewController.showGameView(sessionName);
      } else {
        self._showError(validation.invalidReason);
      }
    });
  }

  _showError(errorMessage) {
    this.errorContainer.text(errorMessage);
    this.form.addClass('error');
  }

  _hideError() {
    this.form.removeClass('error');
  }
}
