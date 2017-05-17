import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL_VARIABLE } from './constant';
import { CommonService } from './common-service';

@Injectable()
export class APIService {
  constructor( @Inject(Http) private http: Http, public commonService: CommonService) { }

  public getDepartmentsByStoreId(storeId, callback) {
    if (storeId === null) {
      return Observable.throw("Please pass store ID");
    } else {
      this.http
        .get("" + GLOBAL_VARIABLE.BASE_API_URL + "?action=department&store_id=" + storeId)
        .map(res => res.json())
        .subscribe(
        data => {
          console.log("department data :" + JSON.stringify(data));
          return callback(null, data);
        },
        err => {
          return callback(err, null);
        });
    }
  }

  public getGroceryItemsByStoreId(storeId, callback) {
    if (storeId === null) {
      return Observable.throw("Please pass store ID");
    } else {
      this.http
        .get("" + GLOBAL_VARIABLE.BASE_API_URL + "?action=grocery_items&store_id=" + storeId)
        .map(res => res.json())
        .subscribe(
        data => {
          console.log("item data :" + JSON.stringify(data));
          return callback(null, data);
        },
        err => {
          return callback(err, null);
        });
    }
  }

  public getScanneItemsByStoreId(storeId, plu_no, callback) {
    if (storeId === null) {
      return Observable.throw("Please pass store ID");
    } else {
      this.http
        .get("" + GLOBAL_VARIABLE.BASE_API_URL + "?action=barcode_items&store_id=" + storeId + "&plu_no=" + plu_no)
        .map(res => res.json())
        .subscribe(
        data => {
          console.log("barcode_items data :" + JSON.stringify(data));
          return callback(null, data);
        },
        err => {
          return callback(err, null);
        });
    }
  }

  public updateItem(itemId, price, inventory, callback) {
    if (itemId === null) {
      return Observable.throw("Please pass item ID");
    }
    else if (price === null) {
      return Observable.throw("Please pass price");
    }
    else if (inventory === null) {
      return Observable.throw("Please pass inventory");
    }
    else {
      this.http
        .get("" + GLOBAL_VARIABLE.BASE_API_URL + "?action=updateiteam&item_id=" + itemId + "&new_price=" + price + "&update_inventory=" + inventory)
        .map(res => res.json())
        .subscribe(
        data => {
          return callback(null, data);
        },
        err => {
          return callback(err, null);
        });
    }
  }

  public addItem(store_id, plu_no, description, r_grocery_department_id, price, plu_tax, save_to, callback) {
    console.log("store_id :" + store_id + " plu_no :" + plu_no + " description :" + description + " r_grocery_department_id :" + r_grocery_department_id + " price :" + price + " plu_tax :" + plu_tax);
    if (store_id === null) {
      return Observable.throw("Please pass store ID");
    } else if (price === null) {
      return Observable.throw("Please pass price");
    } else if (plu_no === null) {
      return Observable.throw("Please pass plu No");
    } else if (description === null) {
      return Observable.throw("Please pass description");
    } else if (r_grocery_department_id === null) {
      return Observable.throw("Please pass department_id");
    } else if (plu_tax === null) {
      return Observable.throw("Please pass plu_tax");
    } else {

      let body = new FormData();
      body.append('store_id', store_id);
      body.append('plu_no', plu_no);
      body.append('description', description);
      body.append('r_grocery_department_id', r_grocery_department_id);
      body.append('price', price);
      body.append('plu_tax', plu_tax);
      body.append('save_to', save_to);

      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers });

      this.http
        .post(GLOBAL_VARIABLE.BASE_API_URL + GLOBAL_VARIABLE.ADD_ITEM, body, options)
        .map(res => res.json())
        .subscribe(
        data => {
          console.log('addItem  ' + JSON.stringify(data));
          if (data.status == '1') {
            return callback(null, data);
          } else {
            return callback(data, null);
          }
        },
        err => {
          console.log("ERROR!: ", err);
          return callback(err, null);
        }
        );

    }
  }

  public getConfirmPackByDate(date, status, callback) {
    console.log("date :"+date);
    console.log("status :"+status);
    console.log("" + GLOBAL_VARIABLE.BASE_API_URL + "?action=getLatestConfirmedPack&date=" + date + "&status=" + status);

    this.http
      .get("" + GLOBAL_VARIABLE.BASE_API_URL + GLOBAL_VARIABLE.GET_LATEST_PACK_BY_DATE + "&date=" + date + "&status=" + status)
      .map(res => res.json())
      .subscribe(
      data => {
          console.log('getConfirmPackByDate  ' + JSON.stringify(data));
          if (data.status == '1') {
            return callback(null, data);
          } else {
            return callback(data, null);
          }
      },
      err => {
        console.log("ERROR!: ", err);
        return callback(err, null);
      });
  }

  public confirmPack(body, options, callback){
      this.http
        .post(GLOBAL_VARIABLE.BASE_API_URL + GLOBAL_VARIABLE.CONFIRM_PACK, body, options)
        .map(res => res.json())
        .subscribe(
        data => {
          console.log('confirmPack  ' + JSON.stringify(data));
          if (this.commonService.isSuccess(data.status)) {
            return callback(null, data);
          } else {
            return callback(data, null);
          }
        },
        err => {
          console.log("ERROR!: ", err);
          return callback(err, null);
        }
      );
  }

  public addGame(body, options, callback){
      this.http
        .post(GLOBAL_VARIABLE.BASE_API_URL + GLOBAL_VARIABLE.ADD_NEW_GAME, body, options)
        .map(res => res.json())
        .subscribe(
        data => {
          console.log('addGame  ' + JSON.stringify(data));
          if (this.commonService.isSuccess(data.status)) {
            return callback(null, data);
          } else {
            return callback(data, null);
          }
        },
        err => {
          console.log("ERROR!: ", err);
          return callback(err, null);
        }
      );
  }

}


