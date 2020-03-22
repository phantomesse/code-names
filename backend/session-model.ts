import { CardModel, CardType } from './card-model';

export default class SessionModel {
  private sessionName: string;
  private wordToCardMap: Map<string, CardModel>;

  constructor(sessionName: string, cards: CardModel[]) {
    this.sessionName = sessionName;
    this.wordToCardMap = new Map();
    for (const card of cards) {
      this.wordToCardMap.set(card.word, card);
    }
  }

  get cardsObject(): { word: string; type: string; isFlipped: boolean }[] {
    const cards = [];
    for (let card of this.wordToCardMap.values()) {
      cards.push({
        word: card.word,
        type: CardType[card.cardType],
        isFlipped: card.isFlipped
      });
    }
    return cards;
  }

  flipCard(word: string): void {
    if (!this.wordToCardMap.has(word)) {
      console.error(
        `could not flip word (${word}) in session (${this.sessionName}) because
        the word is not in one of the cards`
      );
      return;
    }
    let card = this.wordToCardMap.get(word);
    if (card.isFlipped) {
      console.error(
        `could not flip word (${word}) in session (${this.sessionName}) because
        the card has already been flipped`
      );
      return;
    }
    this.wordToCardMap.get(word).isFlipped = true;
  }
}
