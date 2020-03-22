import { describe, it } from 'mocha';
import { expect } from 'chai';
import getCards from '../../backend/cards-controller';
import { CardType } from '../../backend/card-model';
import { blue } from 'color-name';
import wordsController from '../../backend/words-controller';

describe('cards controller - getCards()', function() {
  it('returns 25 cards', function() {
    let cards = getCards();
    expect(cards).length(25);
  });

  it('contains 1 assassin card', function() {
    let cards = getCards();
    expect(cards.filter(card => card.cardType === CardType.assassin)).length(1);
  });

  it('contains 7 neutral cards', function() {
    let cards = getCards();
    expect(cards.filter(card => card.cardType === CardType.neutral)).length(7);
  });

  it('contains 9 primary team cards and 8 secondary team cards', function() {
    let cards = getCards();
    let redCards = cards.filter(card => card.cardType === CardType.red);
    let blueCards = cards.filter(card => card.cardType === CardType.blue);
    expect(redCards).length.gte(8);
    expect(blueCards).length.gte(8);
    if (redCards.length > blueCards.length) {
      expect(redCards).length(9);
      expect(blueCards).length(8);
    } else {
      expect(redCards).length(8);
      expect(blueCards).length(9);
    }
  });

  it('excludes excluded words', function() {
    let excludedWords = wordsController.getWords();
    let cards = getCards(excludedWords);
    let cardWords = cards.map(card => card.word);
    for (const excludedWord of excludedWords) {
      expect(cardWords).not.include(excludedWord);
    }
  });
});
