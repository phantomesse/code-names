'use strict';

/**
 * Controls the communication between the UI and the API.
 *
 * Handles GET and Socket.IO requests and responses.
 */
class ApiController {
  static validateSessionName(sessionName) {
    var deferred = $.Deferred();

    $.get('/validate-session-name', {
      'sessionName': sessionName
    }, function(response) {
      deferred.resolve(response);
    });

    return deferred.promise();
  }
}
