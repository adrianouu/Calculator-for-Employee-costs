import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { CalculatorComponent } from './app/calculator/calculator.component';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

export function calculateRoi(anzahlArbeiter: number) {
  console.log(anzahlArbeiter);
}
