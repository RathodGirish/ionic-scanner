import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';
import { SearchPage } from '../search/search';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';


/*
TODO : Pricebook Component Page
Method : PricebookPage
*/
@IonicPage()
@Component({
  selector: 'price-book',
  templateUrl: 'price-book.html'
})
export class PricebookPage {
  public username = '';
  public email = '';
  public info: any = {};
  public barcodeResult;
  public options: BarcodeScannerOptions;

  constructor(public menu: MenuController,
    public auth: AuthService,
    public commonService: CommonService,
    public barcode: BarcodeScanner,
    public nav: NavController,
    public alertCtrl: AlertController) {

    menu.enable(true);
    this.info = this.auth.getUserInfo();
    console.log(' info ' + JSON.stringify(this.info));

    if (this.info == null) {
      this.commonService.showErrorAlert('Please login first');
      this.nav.setRoot('LoginPage');
    }
  }

  /*
  TODO : Scan Barcode image
  Method : scanBarcode
  */
  async scanBarcode(search: any) {
    const results = await this.barcode.scan();
    if (results.text) {
      const plu_no = '0' + results.text;
      this.nav.setRoot(SearchPage, {
        searchBy: search,
        plu_no: plu_no
      });
    }
  }

  /*
  TODO : Go to page by search value
  Method : searchBy
  */
  public searchBy(search: any) {
    this.nav.setRoot(SearchPage, {
      searchBy: search
    });
  }

}