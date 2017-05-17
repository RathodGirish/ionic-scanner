import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';
import { GLOBAL_VARIABLE } from '../../providers/constant';
import { AddGamePage } from '../addGame/add-game';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { APIService } from '../../providers/api-service';

@IonicPage()
@Component({
  selector: 'page-activate',
  templateUrl: 'activate-pack.html',
})

export class ActivatePackPage {
  info: any;
  public ActivatePackObject = { "ticketCode": "", "activateDate": "", "scan_ticket_code": "", "status": "activate"};

  public packs = [];
  public packCount;
  public sumOfPacks = 0;
  public isPacksFound;

  constructor(private barcode: BarcodeScanner, 
        public navCtrl: NavController, 
        public navParams: NavParams, 
        private auth: AuthService, 
        private alertCtrl: AlertController, 
        public commonService: CommonService, 
        public API_SERVICE: APIService) {

      this.info = this.auth.getUserInfo();
      console.log(' this.info ' + JSON.stringify(this.info));
      let THIS = this;
      if (this.info == null) {
        this.commonService.showErrorAlert('Please login first');
        this.navCtrl.setRoot('LoginPage');
      }
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad Activate');
  }

}
