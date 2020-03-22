import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'root',
  templateUrl: './root.html'
})
export class RootComponent {
  // socketIoScriptPath: string;

  constructor() {
    // this.socketIoScriptPath = dataController.socketIoScriptPath;
  }
}

@NgModule({
  declarations: [RootComponent],
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [RootComponent]
})
export class RootComponentModule {}
