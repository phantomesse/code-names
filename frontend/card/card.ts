import {
  Component,
  Input,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy
} from '@angular/core';
import CardModel from '../models/card-model';
import { Router } from '@angular/router';

@Component({
  selector: 'card',
  template: '{{word}}',
  styleUrls: ['./card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  private _isSpymasterView: boolean;
  private _card: CardModel;

  constructor(router: Router) {
    const parameters = router.url.substr(1).split('/');
    this._isSpymasterView = parameters.length > 1;
  }

  @Input()
  set card(card: CardModel) {
    this._card = card;
  }

  get word(): string {
    return this._card.word;
  }

  @HostBinding('class')
  get classes(): string {
    let classes = [];
    if (this._isSpymasterView) classes.push('spymaster');
    if (this._card.isFlipped) classes.push('flipped');
    if (this._isSpymasterView || this._card.isFlipped) {
      classes.push(this._card.type);
    }
    return classes.join(' ');
  }

  @HostListener('click')
  onClick(): void {
    this._card.isFlipped = true;
    console.log(this._card);
  }
}
