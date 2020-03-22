import fs from 'fs';
import path from 'path';

/**
 * Loads in words from the words text file and allows users to get a random
 * list of 25 words at a time.
 */
class _WordsController {
  private static _wordsFilePath = path.resolve('data/words.txt');
  private _words: string[];

  constructor() {
    this._words = fs
      .readFileSync(_WordsController._wordsFilePath, 'utf8')
      .split('\n')
      .filter(word => word.length > 0);
  }

  /** Returns 25 random words. */
  getWords(): string[] {
    let words: Set<string> = new Set();
    while (words.size < 25) {
      let randomIndex = Math.floor(Math.random() * this._words.length);
      words.add(this._words[randomIndex]);
    }
    return [...words];
  }
}

export default new _WordsController();
