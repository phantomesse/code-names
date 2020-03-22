import wordsController from './words-controller';
import { CardModel, CardType } from './card-model';

/**
 * Generates a set of 25 cards with the teams, neutral cards, and assassin card
 * assigned.
 */
class _CardsController {
  /** Returns 25 cards optionally excluding a list of given words. */
  static getCards(excludeWords: string[] = []): CardModel[] {
    let words = wordsController.getWords(excludeWords);
    let firstTeamIndices = _CardsController._getRandomIndices(9);
    let secondTeamIndices = _CardsController._getRandomIndices(
      8,
      firstTeamIndices
    );
    let assassinIndex = _CardsController._getRandomIndices(1, [
      ...firstTeamIndices,
      ...secondTeamIndices
    ])[0];
    let doesRedGoFirst = Math.floor(Math.random() * 2) === 0;

    let cards: CardModel[] = [];
    for (let i = 0; i < words.length; i++) {
      let cardType = CardType.neutral;
      if (i === assassinIndex) cardType = CardType.assassin;
      else if (firstTeamIndices.includes(i)) {
        cardType = doesRedGoFirst ? CardType.red : CardType.blue;
      } else if (secondTeamIndices.includes(i)) {
        cardType = doesRedGoFirst ? CardType.blue : CardType.red;
      }
      cards.push(new CardModel(words[i], cardType));
    }
    return cards;
  }

  private static _getRandomIndices(
    indicesCount: number,
    excludeIndices: number[] = []
  ): number[] {
    let indices: Set<number> = new Set();
    while (indices.size < indicesCount) {
      let index = Math.floor(Math.random() * 25);
      if (!excludeIndices.includes(index)) indices.add(index);
    }
    return [...indices];
  }
}

export default _CardsController.getCards;
