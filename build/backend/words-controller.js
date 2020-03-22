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
    /** Returns 25 random words. */
    getWords() {
        let words = new Set();
        while (words.size < 25) {
            let randomIndex = Math.floor(Math.random() * this._words.length);
            words.add(this._words[randomIndex]);
        }
        return [...words];
    }
}
_WordsController._wordsFilePath = path_1.default.resolve('data/words.txt');
exports.default = new _WordsController();
