import { AuthService } from './../providers/auth-service';
import { CommonService } from './../providers/common-service';
import { APIService } from './../providers/api-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';
import { SearchPage } from '../pages/search/search';
import { AddGamePage } from '../pages/addGame/add-game';
 
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    AddGamePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    AddGamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    BarcodeScanner,
    APIService,CommonService
  ]
})
export class AppModule {}