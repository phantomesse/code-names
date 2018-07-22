'use strict';

/** Abstract base class for views. */
class View {
  constructor(viewController) {
    if (this.constructor === View) {
      throw new TypeError(
        'Abstract class "View" cannot be instantiated directly.');
    }

    if (this.className === undefined) {
      throw new TypeError('Classes extending the widget abstract class');
    }

    this._footer = $('footer');

    this.viewController = viewController;
    this.element = $('main').empty();

    $('body').removeClass().addClass(this.className);
  }

  showFooter() {
    this._footer.removeClass('hidden');
  }

  hideFooter() {
    this._footer.addClass('hidden');
  }
}
