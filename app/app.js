"use strict";

const GameSession = require('./game-session.js');

/// Holds all global data and functions for app.
class App {
  constructor() {
    /// Array of all game sessions.
    this.gameSessions = [];
  }

  /// Checks if a game session exists based on the session name.
  doesGameSessionExist(sessionName) {
    if (sessionName === undefined) return false;
    for (var i = 0; i < this.gameSessions.length; i++) {
      if (this.gameSessions[i].sessionName === sessionName) return true;
    }
    return false;
  }

  /// Joins an existing game session if it exists or creates a new session if it doesn't exist.
  joinSession(sessionName) {
    if (this.doesGameSessionExist(sessionName)) {
      console.log('game session exists!');
    } else {
      console.log('creating a new game session');
      this.gameSessions.push(new GameSession(sessionName));
    }
  }
}

module.exports = new App();
