import { CardModel } from './card-model';

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

  flipCard(word: string): void {
    if (!this.wordToCardMap.has(word)) {
      console.error(
        `could not flip word (${word}) in session (${this.sessionName}) because
        the word is not in one of the cards`
      );
      return;
    }
    let card = this.wordToCardMap[word];
    if (card.isFlipped) {
      console.error(
        `could not flip word (${word}) in session (${this.sessionName}) because
        the card has already been flipped`
      );
      return;
    }
    this.wordToCardMap[word].isFlipped = true;
  }
}
