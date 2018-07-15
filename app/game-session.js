"use strict";

const dataGenerator = require('./data-generator.js');

const wordCount = 25;

/// Describes a game session in which one game is played from start to finish.
class GameSession {
  constructor(sessionName) {
    /// Key for other players to log into this game.
    ///
    /// The session name must be a string.
    this.sessionName = sessionName;

    /// Number of connections attached to this game session.
    ///
    /// When the connection count is 0, this session instance should be destroyed.
    this.connectionCount = 1;

    /// Array of words in this game session.
    this.words = dataGenerator.getWords(wordCount);
    
 }
}

module.exports = GameSession;
