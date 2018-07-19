"use strict";

const GameSession = require('./game-session.js');

/** Holds all global data and functions for app. */
class App {
  constructor() {
    /**
     * Map of all game sessions where the key is the session name and the value
     * is the GameSession object.
     */
    this._gameSessions = new Map();
  }

  /** Checks if a game session exists based on the session name. */
  doesGameSessionExist(sessionName) {
    if (sessionName === undefined) return false;
    return this._gameSessions.has(sessionName);
  }

  /** Creates a game session if it doesn't already exist. */
  createGameSession(sessionName) {
    if (this.doesGameSessionExist(sessionName)) {
      return this.getGameSession(sessionName);
    }

    console.log(`creating new game session: ${sessionName}`);
    const gameSession = new GameSession(sessionName);
    this._gameSessions.set(sessionName, gameSession);
    return gameSession;
  }

  /** Retrieves a GameSession object. */
  getGameSession(sessionName) {
    return this._gameSessions.get(sessionName);
  }
}

module.exports = new App();
