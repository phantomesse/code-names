"use strict";

const GameSession = require('./game-session.js');

/// Holds all global data and functions for app.
class App {
  constructor() {
    /// Map of all game sessions where the key is the session name and the value
    /// is the GameSession object.
    this._gameSessions = new Map();
  }

  /// Checks if a game session exists based on the session name.
  doesGameSessionExist(sessionName) {
    if (sessionName === undefined) return false;
    return this._gameSessions.has(sessionName);
  }

  /// Joins an existing game session if it exists or creates a new session if it
  /// doesn't exist.
  joinSession(sessionName) {
    if (this.doesGameSessionExist(sessionName)) {
      console.log('game session exists!');
    } else {
      console.log('creating a new game session');
      this._gameSessions.set(sessionName, new GameSession(sessionName));
    }
  }

  /// Retrieves a GameSession object.
  getGameSession(sessionName) {
    return this._gameSessions.get(sessionName);
  }

  /// Update flipped word.
  updateFlippedWord(word, sessionName) {
    this.getGameSession(sessionName).flippedWords.push(word);
  }
}

module.exports = new App();
