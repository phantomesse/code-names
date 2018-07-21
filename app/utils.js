'use strict';

class Utils {
  /**
   * Makes sure that a session name is a valid session name.
   *
   * Returns the following object:
   * ```js
   * {
   *   isValid: [true / false]
   *   invalidReason: [string]
   * }
   * ```
   */
  static validateSessionName(sessionName) {
    if (sessionName === undefined) {
      return Utils._invalidSessionName('undefined');
    }
    if (sessionName.isEmpty) return Utils._invalidSessionName('empty string');

    if (sessionName.indexOf(' ') > -1) {
      return Utils._invalidSessionName('session name cannot contain spaces');
    }

    if (sessionName.match("^[a-zA-Z0-9\-\_]*$")) {
      return {
        isValid: true
      };
    } else {
      return Utils._invalidSessionName('invalid characters');
    }
  }

  /**
   * Helper method for validateSessionName that creates an object with an
   * invalid reason.
   */
  static _invalidSessionName(reason) {
    return {
      isValid: false,
      invalidReason: reason
    };
  }
}

module.exports = Utils;
