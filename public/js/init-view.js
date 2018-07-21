"use strict";

/// View for starting a game.
class InitView {
  constructor(viewController) {
    this.viewController = viewController;

    // Hide footer.
    $('footer').addClass('hidden');

    // Hide view toggle.
    $('.view-toggle').hide();

    // Hide reset button.
    $('.reset').hide();

    var sessionPickerInput = $('.session-picker input[type=text]');
    var sessionPickerButton = $('.session-picker button');

    sessionPickerInput.focus();

    sessionPickerButton.click(function() {
      var sessionName = sessionPickerInput.val();
      history.pushState(null, null, '?session=' + sessionName);
      viewController.showGameView(sessionName);
    });

    sessionPickerInput.keyup(function() {
      var sessionName = sessionPickerInput.val();
      $.get('/game-session-exists', {
        'sessionName': sessionName
      }, function(response) {
        if (response.exists) sessionPickerButton.text('join session');
        else sessionPickerButton.text('create session');
      });
    });
  }
}
