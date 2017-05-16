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
  selector: 'page-lottery',
  templateUrl: 'confirm-pack.html',
})

export class confirmPack {
  info: any;
  public confirmPackObject = { "ticketCode": "", "confirmDate": "", "scan_ticket_code": "", "status": "confirm"};

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
      let THIS = this;
      if (this.info == null) {
        this.commonService.showErrorAlert('Please login first');
        this.navCtrl.setRoot('LoginPage');
      }

      let currentDate = this.commonService.getFormattedDateYMD(Date.now());
      this.confirmPackObject.confirmDate=currentDate;
      THIS.API_SERVICE.getConfirmPackByDate(currentDate, GLOBAL_VARIABLE.CONFIRM_PACK_STATUS, function (err, res) {
      // THIS.API_SERVICE.getConfirmPackByDate("2017-05-15", GLOBAL_VARIABLE.CONFIRM_PACK_STATUS, function (err, res) {
        if (err) {
          console.log("ERROR!: ", err.message);
          THIS.isPacksFound = false;
        } else {
          THIS.packs = JSON.parse(JSON.stringify(res.message)); 
          THIS.packCount = (THIS.packs).length;
          for(let i=0; i<THIS.packs.length; i++){
            THIS.sumOfPacks += parseInt(THIS.packs[i].face_value);
          }
          THIS.isPacksFound = true;
        }
      });
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad Lottery');
  }

  async scanBarcode() {
    const results = await this.barcode.scan();
    if (results.text) {
      this.confirmPackObject.ticketCode = results.text;
    }
    alert(' results.text ' + results.text );
  }

  public confirmPack() {
    let THIS = this;
    THIS.commonService.showLoading();
    console.log('confirmPackObject ' + JSON.stringify(this.confirmPackObject));

    THIS.commonService.getGameNoAndPackNo(THIS.confirmPackObject.ticketCode, function(err, game_no, pack_no){
      let body = new FormData();
      body.append('game_no', game_no);
      body.append('store', THIS.info.store_id);
      body.append('pack_no', pack_no);
      body.append('scan_ticket_code', THIS.confirmPackObject.ticketCode);
      body.append('packdate', THIS.confirmPackObject.confirmDate);
      body.append('status', THIS.confirmPackObject.status);

      console.log('body ' + JSON.stringify(body));
      console.log('game_no ' + JSON.stringify(game_no) + ' | pack_no  ' + pack_no);

      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers });

      THIS.API_SERVICE.confirmPack(body, options, function (err, res) {
          if (err) {
            console.log("ERROR!: ", err);
            THIS.commonService.showErrorAlert('ERROR!: ' + err.message);
            THIS.navCtrl.push(AddGamePage);
          } else {
            if (THIS.commonService.isSuccess(res.status)) {
              THIS.commonService.showSucessAlert('Pack Confirmed Successfully');
              THIS.navCtrl.setRoot('confirmPack');
            } else {
              THIS.commonService.showErrorAlert('Fail to Confirm Pack');
              THIS.navCtrl.push(AddGamePage);
            }
          }
        });
    });
  }
}
