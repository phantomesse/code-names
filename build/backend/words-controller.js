"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Loads in words from the words text file and allows users to get a random
 * list of 25 words at a time.
 */
class _WordsController {
    constructor() {
        this._words = fs_1.default
            .readFileSync(_WordsController._wordsFilePath, 'utf8')
            .split('\n')
            .filter(word => word.length > 0);
    }
    /** Returns 25 random words optionally excluding a list of given words. */
    getWords(excludeWords = []) {
        let words = new Set();
        while (words.size < 25) {
            let word = this._randomWord;
            if (!excludeWords.includes(word))
                words.add(word);
        }
        return [...words];
    }
    /**
     * Returns a generated session name which is two random words combined
     * optionally excluding a list of given session names.
     */
    getSessionName(excludeSessionNames = []) {
        let words = new Set();
        while (words.size < 2)
            words.add(this._randomWord);
        let sessionName = [...words]
            .join('-')
            .toLowerCase()
            .replace(' ', '-');
        if (excludeSessionNames.includes(sessionName)) {
            return this.getSessionName(excludeSessionNames);
        }
        return sessionName;
    }
    get _randomWord() {
        return this._words[Math.floor(Math.random() * this._words.length)];
    }
}
_WordsController._wordsFilePath = path_1.default.resolve('data/words.txt');
exports.default = new _WordsController();
