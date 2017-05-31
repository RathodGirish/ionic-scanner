import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { APIService } from '../../providers/api-service';
import { CommonService } from '../../providers/common-service';
import { Http } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import 'rxjs/add/operator/map';


/*
TODO : Search Component Page
Method : SearchPage
*/
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {
  public searchBy = '';
  public plu_no = '';
  public info: any = {};
  public posObject = { item_id: '', description: '', newPrice: "", updateInventory: "", dName: "", plu_no: "" };
  public departmentList = [];
  public descriptionList = [];
  public UPCList = [];
  public item: any;
  public newDescriptionList = [];
  public dName = "";
  public showList: boolean = false;
  public byScanner: boolean = false;
  public isItemSelected = 1;

  public selectedItem = { "item_id": "", "plu_no": "", "price": "", "description": "" };

  constructor(
    public nav: NavController,
    public auth: AuthService,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public http: Http,
    public loadingController: LoadingController,
    public API_SERVICE: APIService,
    public commonService: CommonService,
    public barcode: BarcodeScanner) {

    let THIS = this;
    this.info = this.auth.getUserInfo();
    console.log(' info ' + JSON.stringify(this.info));

    let loader = THIS.loadingController.create({
      content: "Please wait..."
    });
    loader.present();
    if (this.info == null) {
      this.commonService.showErrorAlert('Please login first');
      this.nav.setRoot('LoginPage');
    }

    this.API_SERVICE.getDepartmentsByStoreId(parseInt(this.info.store_id), parseInt(this.info.company_id), function (err, res) {
      if (err) {
        console.log("ERROR!: ", err);
      }
      else {
        // THIS.commonService.showAlert("res Department :" + JSON.stringify(res.message));
        THIS.departmentList = res.message;
      }
    });

    this.API_SERVICE.getGroceryItemsByStoreId(this.info.store_id, parseInt(this.info.company_id), function (err, res) {
      if (err) {
        console.log("ERROR!: ", err);
      }
      else {
        console.log("res Items :" + res);
        THIS.descriptionList = res.message;
      }
    });
    this.searchBy = this.navParams.get('searchBy');
    if (this.searchBy == 'Barcode') {
      loader.dismiss();

    } else {
      loader.dismiss();
    }
    this.initializeDescriptionItems();
  }


  
  /*
  TODO : To Get DepartmentName By Id Function
  Method : getDepartmentNameByid
  */
  public getDepartmentNameByid(department_id: any) {
    let THIS = this;
    let deptName = "";

    THIS.departmentList.filter((d) => {
      if (d.dept_id == department_id) {
        deptName = d.department_name;
      }
    });
    return deptName;
  }

  /*
  TODO : To Search Description Function
  Method : searchDescription
  */
  public searchDescription(ev: any, searchBy: any) {
    let val = ev.target.value;
    let THIS = this;
    this.showList = true;
    if (val && val.trim() != '') {
      console.log("descriptionList :" + THIS.descriptionList);
      if (THIS.descriptionList && THIS.descriptionList != null) {
        this.newDescriptionList = THIS.descriptionList.filter((item) => {
          if (searchBy == 'Barcode') {
            return (item.plu_no.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
          else {
            return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
        });

        if (!THIS.newDescriptionList || THIS.newDescriptionList != null) {
          THIS.isItemSelected = 0;
        }
        console.log("newDescriptionList :" + THIS.newDescriptionList);
        console.log("THIS.isItemSelected :" + THIS.isItemSelected);
      } else {
        THIS.newDescriptionList = [];
      }

    } else {
      this.showList = false;
    }
  }

  /*
  TODO : To Select Description Function
  Method : selectDesc
  */
  public selectDesc(event: any, item: any, searchBy: any) {
    let THIS = this;
    if (event != null) {
      event.stopPropagation();
    }
    THIS.initializeDescriptionItems();
    THIS.isItemSelected = 1;
    THIS.selectedItem = item;
    if (searchBy == 'Barcode') {
      THIS.posObject.plu_no = item.plu_no;
    } else {
      // THIS.posObject.description = item.description;
    }
    THIS.posObject.description = item.description;
    let department_id = item.dept_id;
    THIS.posObject.dName = this.getDepartmentNameByid(department_id);
  }

  /*
  TODO : To Data from URL
  Method : GetDataByURL
  */
  public GetDataByURL(url, callback) {
    this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
      data => {
        callback(null, data);
      },
      err => {
        callback(err, null);
        console.log("ERROR!: ", err);
      });
  }

  /*
  TODO : To Send POS and save in database
  Method : sendToPOS
  */
  public sendToPOS(event: any, pos: any, isValid: boolean) {
    event.preventDefault();
    let THIS = this;
    console.log(' pos ' + JSON.stringify(pos) + ' isValid ' + isValid);
    if (isValid) {
      this.API_SERVICE.updateItem(this.selectedItem.item_id, pos.new_rice, pos.update_inventory, function (err, res) {
        if (err) {
          console.log("ERROR!: ", err);
          THIS.commonService.showErrorAlert('ERROR!: ' + err);
        }
        else {
          if (res.status == 1) {
            THIS.commonService.showSucessAlert('POS Updated Successfully');
            THIS.nav.setRoot('PricebookPage');
          } else {
            THIS.commonService.showErrorAlert('Fail to Update POS');
          }
        }
      });
    }
  }

  /*
  TODO : To Scan Barcode Image
  Method : scanBarcode
  */
  async scanBarcode() {
    const results = await this.barcode.scan();
    let THIS = this;

    if (results.text) {
      // const plu_no = '0' + results.text;
      THIS.commonService.ConvertBarcode(results.text, THIS.info, function (barcodeError, barcodeNo) {
        // THIS.commonService.showAlert('barcodeNo ' + barcodeNo);
        if (barcodeError) {
          THIS.commonService.showErrorAlert('Barcode : ' + barcodeError);
        } else {
          THIS.API_SERVICE.getScanneItemsByStoreId(THIS.info.store_id, THIS.info.company_id, barcodeNo, function (err, res) {
            if (err != null) {
              THIS.commonService.showErrorAlert('ERROR! : ' + err);
            } else if (res.message == null) {
              THIS.commonService.showErrorAlert('ERROR! : No Record Found');
            } else {
              let i = JSON.parse(JSON.stringify(res.message));
              THIS.selectDesc(null, i[0], THIS.searchBy);
              // THIS.commonService.showAlert(' i ' + JSON.stringify(i));
            }
          });
        }
      });
    }
  }

  /*
  TODO : To Initialize DescriptionItems
  Method : initializeDescriptionItems
  */
  public initializeDescriptionItems() {
    this.newDescriptionList = [];
  }

}