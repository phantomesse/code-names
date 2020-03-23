import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'start-view',
  templateUrl: './start-view.html',
  styleUrls: ['./start-view.scss']
})
export class StartViewComponent {
  sessionName: string = 'i-am-cool';
  existingSessions: { sessionName: string; color: string }[] = [
    { sessionName: 'hello', color: 'red' },
    { sessionName: 'hello', color: 'blue' },
    { sessionName: 'wordl', color: 'red' },
    { sessionName: 'hi', color: 'red' },
    { sessionName: 'omg', color: 'blue' },
    { sessionName: 'yasss', color: 'red' },
    { sessionName: 'wordl', color: 'blue' },
    { sessionName: 'hi', color: 'red' },
    { sessionName: 'omg', color: 'blue' },
    { sessionName: 'yasss', color: 'blue' }
  ];

  constructor(private _router: Router) {}

  updateSessionName(sessionName): void {
    this.sessionName = sessionName.replace(' ', '-');
  }

  createNewSession(): void {
    this.sessionName = this.sessionName.trim();
    if (this.sessionName.length === 0) return;
    this.goToSession(this.sessionName);
  }

  goToSession(sessionName: string): void {
    this._router.navigateByUrl('/' + sessionName);
  }
}
