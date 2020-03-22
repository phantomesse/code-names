import { describe, it } from 'mocha';
import { expect } from 'chai';
import wordsController from '../../backend/words-controller';

describe('words controller', function() {
  it('getWords() returns 25 words', function() {
    let words = wordsController.getWords();
    expect(words).length(25);
  });

  it('getWords() returns unique words', function() {
    let words = wordsController.getWords();
    expect(new Set(words)).length(words.length);
  });

  it('getWords() excludes excluded words', function() {
    let excludedWords = wordsController.getWords();
    expect(excludedWords).not.empty;

    let words = wordsController.getWords(excludedWords);
    expect(words).not.empty;
    for (const excludedWord of excludedWords) {
      expect(words).not.include(excludedWord);
    }
  });
});
