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

    $.get('/session-names', {}, function(response) {
        console.log(response)
        name = response[0]
        for (var name of response) {
          $('<button>')
          .text(name)
          .addClass('session-button')
          .click(function () {
            console.log($(this).text())
          })
          .appendTo('.active-sessions')
        }
    });

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
