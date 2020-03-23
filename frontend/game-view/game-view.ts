import { Component, HostBinding } from '@angular/core';
import DataController from '../controllers/data-controller';
import { Router } from '@angular/router';
import CardModel from '../models/card-model';

@Component({
  selector: 'game-view',
  templateUrl: './game-view.html',
  styleUrls: ['./game-view.scss']
})
export class GameViewComponent {
  sessionName: string;
  cards: CardModel[] = [];
  isSpymasterView: boolean;

  constructor(private _router: Router, dataController: DataController) {
    const parameters = this._router.url.substr(1).split('/');
    this.sessionName = parameters[0];
    this.isSpymasterView = parameters.length > 1;
    document.title = `Code Names [${this.sessionName}]`;
    dataController.getCards(this.sessionName).then(cards => {
      this.cards = cards;
      this.accentColor =
        cards.filter(card => card.type === 'red').length === 9 ? 'red' : 'blue';
    });
  }

  @HostBinding('class')
  accentColor: string;

  toggleView(): void {
    this._router.navigateByUrl(
      '/' + this.sessionName + (this.isSpymasterView ? '' : '/spy')
    );
  }
}
