/** Model for one card. */
export class CardModel {
  readonly word: string;
  readonly cardType: CardType;
  isFlipped: boolean = false;

  constructor(word: string, cardType: CardType) {
    this.word = word;
    this.cardType = cardType;
  }
}

export enum CardType {
  assassin,
  neutral,
  red,
  blue
}
