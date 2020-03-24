import {
  Component,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import DataController from '../controllers/data-controller';
import { Router } from '@angular/router';
import CardModel from '../models/card-model';

@Component({
  selector: 'game-view',
  templateUrl: './game-view.html',
  styleUrls: ['./game-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameViewComponent {
  sessionName: string;
  cards: CardModel[] = [];
  isSpymasterView: boolean;
  redCardsLeftMessage: string;
  blueCardsLeftMessage: string;

  constructor(
    private _router: Router,
    dataController: DataController,
    changeDetector: ChangeDetectorRef
  ) {
    const parameters = this._router.url.substr(1).split('/');
    this.sessionName = parameters[0];
    this.isSpymasterView = parameters.length > 1;
    document.title = `Code Names [${this.sessionName}]`;
    dataController.getCards(this.sessionName).then(cards => {
      this.cards = cards;
      this.accentColor =
        cards.filter(card => card.type === 'red').length === 9 ? 'red' : 'blue';
      this.redCardsLeftMessage = GameViewComponent.getCardLeftMessage(
        cards,
        'red'
      );
      this.blueCardsLeftMessage = GameViewComponent.getCardLeftMessage(
        cards,
        'blue'
      );
      changeDetector.markForCheck();
    });
  }

  @HostBinding('class')
  accentColor: string;

  toggleView(): void {
    this._router.navigateByUrl(
      '/' + this.sessionName + (this.isSpymasterView ? '' : '/spy')
    );
  }

  static getCardLeftMessage(cards: CardModel[], cardType: string) {
    const cardCount = cards.filter(
      card => !card.isFlipped && card.type === cardType
    ).length;
    return `${cardCount} ${cardType} ${
      cardCount === 1 ? 'card' : 'cards'
    } left`;
  }
}
