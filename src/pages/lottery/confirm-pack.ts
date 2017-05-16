import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';
import { GLOBAL_VARIABLE } from '../../providers/constant';
import { AddGamePage } from '../addGame/add-game';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { APIService } from '../../providers/api-service';

@IonicPage()
@Component({
  selector: 'page-lottery',
  templateUrl: 'confirm-pack.html',
})

export class confirmPack {
  info: any;
  public confirmPackObject = { "pack": "" };
  constructor(private barcode: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, public commonService: CommonService, public API_SERVICE: APIService) {
    this.info = this.auth.getUserInfo();
    //  let THIS = this;
    if (this.info == null) {
      this.commonService.showErrorAlert('Please login first');
      this.navCtrl.setRoot('LoginPage');
    }
    
     this.API_SERVICE.getConfirmPackByDate(Date.now(),GLOBAL_VARIABLE.CONFIRM_PACK_STATUS, function (err, res) {
      if (err) {
        console.log("ERROR!: ", err);
      }
      else {
        console.log("res Department :" + res); 

      }
    });

  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad Lottery');
  }

  public confirmPack() {
    this.navCtrl.push(AddGamePage, {
      id: "123",
      name: "Carl"
    });
  }

  async scanBarcode() {
    const results = await this.barcode.scan();
    if (results.text) {
      this.confirmPackObject.pack = results.text;
    }
  }




  // public confirmPack() {
   
  // }




}
