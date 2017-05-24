import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage,MenuController  } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SearchPage } from '../search/search';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'price-book',
  templateUrl: 'price-book.html'
})
export class PricebookPage {
  username = '';
  email = '';
  info: any = {};
  barcodeResult;
  options: BarcodeScannerOptions;
  constructor(menu: MenuController, private auth: AuthService, private barcode: BarcodeScanner, private nav: NavController, private alertCtrl: AlertController ) {
     menu.enable(true);
    this.info = this.auth.getUserInfo();
    console.log(' info ' + JSON.stringify(this.info));

    if (this.info == null) {
      this.showError('Please login first');
      this.nav.setRoot('LoginPage');
    }
  }

  async scanBarcode(search: any) {
    const results = await this.barcode.scan();
    if (results.text) {
      const plu_no = '0'+results.text;
      this.nav.setRoot(SearchPage, {
        searchBy: search,
        plu_no: plu_no
      });
    }
  }

  public searchBy(search: any) {
    this.nav.setRoot(SearchPage, {
      searchBy: search
    });
  }

  public showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}