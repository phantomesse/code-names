var Dialog = function(onClose) {
  var self = this;
  self.element = $('.modal');
  self.messageElement = $('.modal-message');

  $('.modal-reset').click(function() {
    self.close();
    onClose();
  });
};

Dialog.prototype.showWinner = function(color) {
  var message = `${color} team wins!`;
  this.messageElement.text(message);
  this.element.show();
  console.log(message);
};

Dialog.prototype.close = function() {
  this.element.hide();
};

