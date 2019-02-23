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
    this.createGameSession('eric');
    this.createGameSession('lauren');
    console.log(this._gameSessions);
    this.getGameSessions();
  }

  /** Checks if a game session exists based on the session name. */
  doesGameSessionExist(sessionName) {
    sessionName = sessionName.toLowerCase();
    if (sessionName === undefined) return false;
    return this._gameSessions.has(sessionName);
  }

  /** Creates a game session if it doesn't already exist. */
  createGameSession(sessionName) {
    sessionName = sessionName.toLowerCase();

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
    return this._gameSessions.get(sessionName.toLowerCase());
  }

  getGameSessions() {
    console.log('getting session names');
    const names = Array.from(this._gameSessions.keys());
    console.log(names);
    return names;
  }
}

module.exports = new App();
