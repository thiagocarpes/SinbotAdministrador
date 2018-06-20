import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiarioPage } from './diario';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DiarioPage,
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(DiarioPage),
  ],
})
export class DiarioPageModule {}
