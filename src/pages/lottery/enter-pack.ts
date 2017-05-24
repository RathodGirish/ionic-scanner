import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';
import { APIService } from '../../providers/api-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-enter-pack',
  templateUrl: 'enter-pack.html',
})

export class EnterPackPage {
  public info: any;
  public enterPackObject = { "ticketCode": "", "status": "Counting", "enterDate": ""};
  public isDailyReadingsFound;
  public allDailyReadings = [];
  public sumOfAllDailyReadings = 0;
  public allDailyReadingsCount = 0;
  public allTodaySold = 0;

  constructor(private barcode: BarcodeScanner,
  public navCtrl: NavController, 
    private auth: AuthService, 
    public commonService: CommonService,
    public API_SERVICE: APIService) {

    let THIS = this;
    THIS.info = THIS.auth.getUserInfo();
    console.log(' this.info ' + JSON.stringify(THIS.info));
    
    // let THIS = this;
    if (THIS.info == null) {
      THIS.commonService.showErrorAlert('Please login first');
      THIS.navCtrl.setRoot('LoginPage');
    }
    let currentDate =THIS.commonService.getFormattedDateYMD(Date.now());
    THIS.enterPackObject.enterDate=currentDate;

    THIS.API_SERVICE.getDailyReadingsByDate(THIS.info.store_id, this.info.company_id, '2017-05-21', function (err, res) {
      if (err) {
        console.log("ERROR!: ", err.message);
        THIS.isDailyReadingsFound = false;
      } else {
        THIS.allDailyReadings = JSON.parse(JSON.stringify(res.message)); 
        THIS.allDailyReadingsCount = (THIS.allDailyReadings).length;
        for(let i=0; i<THIS.allDailyReadings.length; i++){
          THIS.sumOfAllDailyReadings += parseInt(THIS.allDailyReadings[i].today_sold_value);
          THIS.allTodaySold += parseInt(THIS.allDailyReadings[i].today_sold);
        }
        THIS.isDailyReadingsFound = true;
      }
    });
  }

  public enterPack() {
    let THIS = this;
    THIS.commonService.showLoading();
    THIS.commonService.getGameNoAndPackNoAndTodayReading(THIS.enterPackObject.ticketCode, function(err, game_no, pack_no, today_reading){
      console.log('game_no ' + JSON.stringify(game_no) + ' | pack_no  ' + pack_no + ' | today_reading ' + today_reading);
      if(!game_no || !pack_no || !today_reading){
        THIS.commonService.showAlert('Please enter proper Ticket Code');
        THIS.navCtrl.setRoot('EnterPackPage');
      } else {
        let body = new FormData();
        body.append('game_no', game_no);
        body.append('pack_no', pack_no);
        body.append('today_reading', today_reading);
        body.append('reading_date', THIS.enterPackObject.enterDate);
        body.append('store_id', THIS.info.store_id);
        body.append('status', THIS.enterPackObject.status);
        body.append('company_id', THIS.info.company_id);

        let headers = new Headers({});
        let options = new RequestOptions({ headers: headers });

        THIS.API_SERVICE.dailyReadingOrSoldout(body, options, 'dailyreading',function (err, res) {
            if (err && err.message == 'notfound') {
              THIS.commonService.showAlert('No Record Found');
              THIS.navCtrl.setRoot('EnterPackPage');
            } else if (err) {
              THIS.commonService.showErrorAlert('ERROR!: ' + err.message);
              THIS.navCtrl.setRoot('EnterPackPage');
            } else {
              if (THIS.commonService.isSuccess(res.status)) {
                THIS.commonService.showSucessAlert(res.message);
                THIS.navCtrl.setRoot('EnterPackPage');
              } else {
                THIS.commonService.showErrorAlert('Fail to Confirm Pack');
                THIS.navCtrl.setRoot('EnterPackPage');
              }
            }
          });
      }
      
    });
  }

  async scanBarcode() {
    const results = await this.barcode.scan();
    if (results.text) {
      this.enterPackObject.ticketCode = results.text;
    }
    alert(results.text );
  }

  public finishDailyReading(){
    this.navCtrl.setRoot('FinishDailyReadingsPage');
  }
}

