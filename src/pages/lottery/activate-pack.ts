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
  public ActivatePackObject = { "ticketCode": "", "activateDate": "", "scan_ticket_code": "", "status": "activate", "bin_no": "" };

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
    let THIS = this;
    this.info = this.auth.getUserInfo();
    console.log(' this.info ' + JSON.stringify(this.info));
    // let THIS = this;
    if (this.info == null) {
      this.commonService.showErrorAlert('Please login first');
      this.navCtrl.setRoot('LoginPage');
    }
    let currentDate = this.commonService.getFormattedDateYMD(Date.now());
    this.ActivatePackObject.activateDate = currentDate;
    THIS.API_SERVICE.getLatestPackByDate(currentDate, GLOBAL_VARIABLE.ACTIVATE_PACK_STATUS, function (err, res) {
      if (err) {
        console.log("ERROR!: ", err.message);
        THIS.isPacksFound = false;
      } else {
        THIS.packs = JSON.parse(JSON.stringify(res.message));
        THIS.packCount = (THIS.packs).length;
        for (let i = 0; i < THIS.packs.length; i++) {
          THIS.sumOfPacks += parseInt(THIS.packs[i].face_value);
        }
        THIS.isPacksFound = true;
      }
    });
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad Activate');
  }

  public ActivatePack(){
     let THIS = this;
     THIS.commonService.showLoading();
     console.log('ActivatePackObject ' + JSON.stringify(this.ActivatePackObject));
     THIS.commonService.getGameNoAndPackNo(THIS.ActivatePackObject.ticketCode, function(err, game_no, pack_no){
      let body = new FormData();
      body.append('game_no', game_no);
      body.append('store', THIS.info.store_id);
      body.append('pack_no', pack_no);
      body.append('scan_ticket_code', THIS.ActivatePackObject.ticketCode);
      body.append('packdate', THIS.ActivatePackObject.activateDate);
      body.append('bin_no', THIS.ActivatePackObject.bin_no);
      body.append('status', THIS.ActivatePackObject.status);

      console.log('body ' + JSON.stringify(body));
      console.log('game_no ' + JSON.stringify(game_no) + ' | pack_no  ' + pack_no);

      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers });

      THIS.API_SERVICE.activePack(body, options, function (err, res) {
        alert('err ' + JSON.stringify(err));
          if (err && err.message == 'notfound') {
            THIS.commonService.showAlert('No Record Found');
            THIS.navCtrl.push(AddGamePage);
          } else if (err) {
            THIS.commonService.showErrorAlert('ERROR!: ' + err.message);
            THIS.navCtrl.push(AddGamePage);
          }  else {
            if (THIS.commonService.isSuccess(res.status)) {
              THIS.commonService.showSucessAlert('Pack Activated Successfully');
              THIS.navCtrl.setRoot('activePack');
            } else {
              THIS.commonService.showErrorAlert('Fail to Active Pack');
              THIS.navCtrl.push(AddGamePage);
            }
          }
        });
    });

  }

}
