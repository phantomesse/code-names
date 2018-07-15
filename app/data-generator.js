"use strict";

const fs = require('fs');
const path = require('path');

const wordsFilePath = path.join(__dirname, '../data/words.json')

/// Generates random data for each game session.
class DataGenerator {
  constructor() {
    /// All words in an array.
    this.words = JSON.parse(fs.readFileSync(wordsFilePath, 'utf8'));
  }

  /// Retrieves a random set of words.
  getWords(wordCount) {
    var words = new Set();

    while (words.size < wordCount) {
      const index = parseInt(Math.random() * this.words.length)
      words.add(this.words[index]);
    }

    return words;
  }
}

module.exports = new DataGenerator();
