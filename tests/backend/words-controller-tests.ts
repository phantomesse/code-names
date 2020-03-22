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
});
