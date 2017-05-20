import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PricebookPage } from './price-book';


@NgModule({
  declarations: [
    PricebookPage,
  ],
  imports: [
    IonicPageModule.forChild(PricebookPage)
  ],
  exports: [
    PricebookPage
  ]
})
export class HomeModule {}
