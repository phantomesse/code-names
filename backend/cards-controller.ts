import wordsController from './words-controller';
import { CardModel, CardType } from './card-model';

/**
 * Returns 25 cards with the teams, neutral cards, and assassin card
 * assigned, optionally excluding a list of given words.
 */
export default function getCards(excludeWords: string[] = []): CardModel[] {
  let words = wordsController.getWords(excludeWords);
  let firstTeamIndices = _getRandomIndices(9);
  let secondTeamIndices = _getRandomIndices(8, firstTeamIndices);
  let assassinIndex = _getRandomIndices(1, [
    ...firstTeamIndices,
    ...secondTeamIndices
  ])[0];
  let firstTeamCardType =
    Math.floor(Math.random() * 2) === 0 ? CardType.red : CardType.blue;
  let secondTeamCardType =
    firstTeamCardType == CardType.red ? CardType.blue : CardType.red;

  let cards: CardModel[] = [];
  for (let i = 0; i < words.length; i++) {
    let cardType = CardType.neutral;
    if (i === assassinIndex) cardType = CardType.assassin;
    else if (firstTeamIndices.includes(i)) cardType = firstTeamCardType;
    else if (secondTeamIndices.includes(i)) cardType = secondTeamCardType;
    cards.push(new CardModel(words[i], cardType));
  }
  return cards;
}

function _getRandomIndices(
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
