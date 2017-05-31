import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
// import { Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';
import { APIService } from '../../providers/api-service';

/*
TODO : ScatchOffReport Component Page
Method : ScatchOffReportPage
*/
@IonicPage()
@Component({
  selector: 'page-scatch-off-report',
  templateUrl: 'scatch-off-report.html',
})

export class ScatchOffReportPage {
  public info: any;
  public isDataFound;
  public scatchSearchObject = { "start_date": "", "end_date": "" };
  public records = [];
  public sumOfTicketSoldAmount = 0;
  public sumOfTicketSoldCount = 0;
  public prevStartDate = "";
  public prevEndDate = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public alertCtrl: AlertController,
    public commonService: CommonService,
    public API_SERVICE: APIService) {

    let THIS = this;
    THIS.info = THIS.auth.getUserInfo();
    console.log(' THIS.info ' + JSON.stringify(THIS.info));

    if (this.info == null) {
      THIS.commonService.showErrorAlert('Please login first');
      THIS.navCtrl.setRoot('LoginPage');
    }
    THIS.scatchSearchObject.start_date = this.commonService.getFormattedDateYMD(Date.now() - 86400000);
    THIS.scatchSearchObject.end_date = this.commonService.getFormattedDateYMD(Date.now());
    THIS.getScatchOffReading();
  }

  /*
  TODO : To Get Scatch Off Reading Function
  Method : getScatchOffReading
  */
  public getScatchOffReading() {
    let THIS = this;
    THIS.prevStartDate = THIS.scatchSearchObject.start_date;
    THIS.prevEndDate = THIS.scatchSearchObject.end_date;
    THIS.commonService.showSimpleLoading();
    THIS.records = [];
    THIS.sumOfTicketSoldAmount = null;
    THIS.sumOfTicketSoldCount = null;
    THIS.API_SERVICE.getScatchReport(THIS.info.company_id, THIS.scatchSearchObject.start_date, THIS.scatchSearchObject.end_date, THIS.info.store_id, function (err, res) {
      THIS.commonService.hideSimpleLoading();
      if (err) {
        console.log("ERROR!: ", err.message);
        THIS.isDataFound = false;
      } else {
        THIS.records = JSON.parse(JSON.stringify(res.message));
        console.log("JSON.stringify(res.message) :" + JSON.stringify(res.message));
        for (let i = 0; i < THIS.records.length; i++) {
          THIS.sumOfTicketSoldAmount += parseInt(THIS.records[i].today_sold_value);
          THIS.sumOfTicketSoldCount += parseInt(THIS.records[i].today_sold);
        }
        THIS.isDataFound = true;
      }
    });
  }

  /*
  TODO : Call on date change event
  Method : dateChanged
  */
  public dateChanged(value: any) {
    let THIS = this;
    let diff: any = <any>(new Date(THIS.scatchSearchObject.start_date).getTime()) - <any>(new Date(THIS.scatchSearchObject.end_date).getTime());
    if (diff <= 0) {
      THIS.getScatchOffReading();
    } else {
      THIS.commonService.showAlert('End date should greater than start date');
      THIS.scatchSearchObject.start_date = THIS.prevStartDate;
      THIS.scatchSearchObject.end_date = THIS.prevEndDate;
    }
  }
}
