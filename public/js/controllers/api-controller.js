'use strict';

/**
 * Controls the communication between the UI and the API.
 *
 * Handles GET and Socket.IO requests and responses.
 */
class ApiController {
  static validateSessionName(sessionName) {
    return ApiController._get('/validate-session-name', sessionName);
  }

  static doesSessionExist(sessionName) {
    return ApiController._get('/does-session-exist', sessionName);
  }

  static getSession(sessionName) {
    return ApiController._get('/session', sessionName);
  }

  static _get(path, sessionName) {
    var deferred = $.Deferred();

    $.get(path, {
      'sessionName': sessionName
    }, function(response) {
      deferred.resolve(response);
    });

    return deferred.promise();
  }
}
