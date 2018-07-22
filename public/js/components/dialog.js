'use strict';

/** Shows up above the UI. */
class Dialog {
  constructor() {
    this.element = $('.dialog');
    this.content = $('.dialog section p');

    const self = this;
    this.cancelButton = $('.dialog .cancel');
    this.submitButton = $('.dialog .submit');
  }

  show(content) {
    var deferred = $.Deferred();

    this.content.html(content);
    this.element.removeClass('hidden');

    const self = this;
    this.cancelButton.click(function() {
      self.hide();
      deferred.resolve('cancel');
    });

    this.submitButton.focus().click(function() {
      self.hide();
      deferred.resolve('submit');
    });

    return deferred.promise();
  }

  hide() {
    this.element.addClass('hidden');
  }
}
