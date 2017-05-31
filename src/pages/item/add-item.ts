import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { APIService } from '../../providers/api-service';
import { CommonService } from '../../providers/common-service';


/*
TODO : To Add New Item Component Page.
Method : AddItemPage
*/
@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  info: any = {};
  public newPosObject = { "plu_no": '', 'description': '', "r_grocery_department_id": '',  'plu_tax': 1, 'save_to':'backoffice'};
  public showList: boolean = false;
  public departmentList = [];
  public newDepartmentList = [];
  public selected_dept_Id :string;

  constructor(
    private barcode: BarcodeScanner, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private auth: AuthService, 
    private alertCtrl: AlertController, 
    public API_SERVICE: APIService, 
    public commonService: CommonService) {

    let THIS = this;
    this.info = this.auth.getUserInfo();
    if (this.info == null) {
      this.commonService.showErrorAlert('Please login first');
      this.navCtrl.setRoot('LoginPage');
    }

    this.API_SERVICE.getDepartmentsByStoreId(parseInt(this.info.store_id),parseInt(this.info
      .company_id), function (err, res) {
        if (err) {
          console.log("ERROR!: ", err);
        }
        else {
          console.log("res Department :" + JSON.stringify(res));
          THIS.departmentList = res.message;
          console.log(JSON.stringify(res.message));
        }
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Item');
  }

  /*
  TODO : To Scan barcode image.
  Method : scanBarcode
  */
  async scanBarcode() {
    const results = await this.barcode.scan();
    let THIS = this;
    if (results.text) {
      THIS.commonService.ConvertBarcode(results.text, THIS.info, function(barcodeError, barcodeNo){
        // THIS.commonService.showAlert('barcodeNo ' + barcodeNo);
        if(barcodeError){
            THIS.commonService.showErrorAlert('ERROR! :' + barcodeError);
        } else {
            THIS.newPosObject.plu_no = barcodeNo;
        }
      });
      // this.newPosObject.plu_no = results.text;
    }
  }

  /*
  TODO : To Search Department.
  Method : searchDepartment
  */
  public searchDepartment(ev: any) {
    let val = ev.target.value;
    let THIS = this;
    // Show the results
    this.showList = true;

    if (val && val.trim() != '') {
      console.log("departmentList :" + THIS.departmentList);
      this.newDepartmentList = THIS.departmentList.filter((dep) => {
        return (dep.department_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.showList = false;
    }
  }

  /*
  TODO : To Select Department on click.
  Method : selectDepartment
  */
  public selectDepartment(event: any, dep: any) {
    event.stopPropagation();
    this.initializeDepartmentList();
    this.newPosObject.r_grocery_department_id = dep.department_name;
    this.selected_dept_Id = dep.dept_id;
    console.log("selected_dept_Id : "+this.selected_dept_Id);
  }

  /*
  TODO : To Initialize Departments with blank array.
  Method : initializeDepartmentList
  */
  public initializeDepartmentList() {
    this.newDepartmentList = [];
  }

  /*
  TODO : To Add New Item Function.
  Method : addItem
  */
  public addItem(event: any, pos: any, isValid: boolean) {
    event.preventDefault();
    let THIS = this;
    
    pos.r_grocery_department_id = THIS.selected_dept_Id;
    // alert(' pos ' + JSON.stringify(pos) + ' isValid ' + isValid);

    if (isValid) {
      this.API_SERVICE.addItem(this.info.store_id,this.info.company_id, pos.plu_no, pos.description, this.selected_dept_Id, pos.price, pos.plu_tax, pos.save_to, function (err, res) {
        if (err) {
          console.log("ERROR!: ", err);
          THIS.commonService.showErrorAlert('ERROR!: ' + err);
        } else {
          if (res.status == 1) {
            THIS.commonService.showSucessAlert(res.message);
            THIS.navCtrl.setRoot('AddItemPage');
          } else {
            THIS.commonService.showErrorAlert('Fail to Add Item');
          }
        }
      });
    }
  }
}
