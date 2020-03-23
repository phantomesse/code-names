import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StartViewComponent } from '../start-view/start-view';
import { GameViewComponent } from '../game-view/game-view';
import { CardComponent } from '../card/card';
import DataController from '../controllers/data-controller';

const appRoutes: Routes = [
  {
    path: ':sessionName',
    component: GameViewComponent
  },
  {
    path: ':sessionName/spy',
    component: GameViewComponent
  },
  {
    path: '',
    component: StartViewComponent
  }
];

@Component({
  selector: 'root',
  templateUrl: './root.html'
})
export class RootComponent {
  socketIoScriptPath: string;

  constructor(dataController: DataController) {
    this.socketIoScriptPath = dataController.socketIoScriptPath;
  }
}

@NgModule({
  declarations: [
    CardComponent,
    GameViewComponent,
    RootComponent,
    StartViewComponent
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [DataController],
  bootstrap: [RootComponent]
})
export class RootComponentModule {}
