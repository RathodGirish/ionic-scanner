import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterPackPage } from './enter-pack';

@NgModule({
  declarations: [
    EnterPackPage
  ],
  imports: [
    IonicPageModule.forChild(EnterPackPage)
  ],
  exports: [
    EnterPackPage
  ]
})
export class EnterPackModule {}
