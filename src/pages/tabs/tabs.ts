import { Component } from '@angular/core';

import { DiarioPage } from '../diario/diario';
import { SemanalPage } from '../semanal/semanal';
import { MensalPage } from '../mensal/mensal';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DiarioPage;
  tab2Root = SemanalPage;
  tab3Root = MensalPage;

  constructor() {

  }
}
