import { Component } from '@angular/core';

@Component({
  selector: 'start-view',
  templateUrl: './start-view.html',
  styleUrls: ['./start-view.scss']
})
export class StartViewComponent {
  sessionName: string = 'i-am-cool';

  updateSessionName(sessionName): void {
    this.sessionName = sessionName.replace(' ', '-');
  }

  createNewSession(): void {
    this.sessionName = this.sessionName.trim();
    if (this.sessionName.length === 0) return;
    console.log('creating a new session for ' + this.sessionName);
  }
}
