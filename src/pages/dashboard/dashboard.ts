import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { CommonService } from '../../providers/common-service';

/*
TODO : To Dashboard Component Page
Method : Dashboard
*/
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public commonService: CommonService,
    public menuController: MenuController) {
    this.menuController.swipeEnable(true, 'sideMenu');
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');
  }

  /*
  TODO : To Redirect Page to specific page.
  Method : redirectPage
  */
  public redirectPage(type : any){
    if(type=='priceBook'){ 
       this.navCtrl.setRoot('PricebookPage');
    } else if(type=='ScratchOffReadings'){
      this.navCtrl.setRoot('EnterPackPage');
    }
  }
}
