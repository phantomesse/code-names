import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RootComponentModule } from './root/root';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import 'zone.js/dist/zone';

if (environment.production) enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(RootComponentModule)
  .catch(err => console.error(err));
