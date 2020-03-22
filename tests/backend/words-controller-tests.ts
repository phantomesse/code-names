import { describe, it } from 'mocha';
import { expect } from 'chai';
import wordsController from '../../backend/words-controller';

describe('words controller - getWords()', function() {
  it('returns 25 words', function() {
    let words = wordsController.getWords();
    expect(words).length(25);
  });

  it('returns unique words', function() {
    let words = wordsController.getWords();
    expect(new Set(words)).length(words.length);
  });

  it('excludes excluded words', function() {
    let excludedWords = wordsController.getWords();
    expect(excludedWords).not.empty;

    let words = wordsController.getWords(excludedWords);
    expect(words).not.empty;
    for (const excludedWord of excludedWords) {
      expect(words).not.include(excludedWord);
    }
  });
});

describe('words controller - getSessionName()', function() {
  it('generates a session name in all lowercase with no spaces', function() {
    let sessionName = wordsController.getSessionName();
    expect(sessionName).matches(RegExp('[a-z-]'));
  });

  it('does not match any excluded session names', function() {
    let excludedSessionNames = new Set(
      [...Array(10)].map(_ => wordsController.getSessionName())
    );
    expect(excludedSessionNames).not.empty;

    let sessionName = wordsController.getSessionName();
    expect(excludedSessionNames).not.include(sessionName);
  });
});
