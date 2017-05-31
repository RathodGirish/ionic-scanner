import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {HttpModule} from '@angular/http';


/*
TODO : To Login Module.
Method : LoginModule
*/
@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    HttpModule
  ],
  exports: [
    LoginPage
  ]
})
export class LoginModule {}
