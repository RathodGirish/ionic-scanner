import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddItemPage } from './add-item';


/*
TODO : To Add New Item Module.
Method : ItemModule
*/
@NgModule({
  declarations: [
    AddItemPage,
  ],
  imports: [
    IonicPageModule.forChild(AddItemPage),
  ],
  exports: [
    AddItemPage
  ]
})
export class ItemModule {}
