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

  /** Returns 25 random words optionally excluding a list of given words. */
  getWords(excludeWords: string[] = []): string[] {
    let words: Set<string> = new Set();
    while (words.size < 25) {
      let word = this._randomWord;
      if (!excludeWords.includes(word)) words.add(word);
    }
    return [...words];
  }

  /**
   * Returns a generated session name which is two random words combined
   * optionally excluding a list of given session names.
   */
  getSessionName(excludeSessionNames: string[] = []): string {
    let words: Set<string> = new Set();
    while (words.size < 2) words.add(this._randomWord);
    let sessionName = [...words]
      .join('-')
      .toLowerCase()
      .replace(' ', '-');
    if (excludeSessionNames.includes(sessionName)) {
      return this.getSessionName(excludeSessionNames);
    }
    return sessionName;
  }

  private get _randomWord(): string {
    return this._words[Math.floor(Math.random() * this._words.length)];
  }
}

export default new _WordsController();
