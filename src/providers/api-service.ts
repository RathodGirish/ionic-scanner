import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { API_URL } from './api-url';
import { CommonService } from './common-service';


/*
API services
*/
@Injectable()
export class APIService {
  constructor( @Inject(Http) private http: Http, public commonService: CommonService) { }


  /*
  TODO : To get all states
  Method : getAllStates
  */
  public getAllStates() {
    return [
      { "code": "AL" }, { "code": "AK" }, { "code": "AS" }, { "code": "AZ" }, { "code": "AR" }, { "code": "CA" }, { "code": "CO" }, { "code": "CT" }, { "code": "DE" }, { "code": "DC" }, { "code": "FL" }, { "code": "GA" }, { "code": "GU" }, { "code": "HI" }, { "code": "ID" }, { "code": "IL" }, { "code": "IN" }, { "code": "IA" }, { "code": "KS" }, { "code": "KY" }, { "code": "LA" }, { "code": "ME" }, { "code": "MD" }, { "code": "MH" }, { "code": "MA" }, { "code": "MI" }, { "code": "FM" }, { "code": "MN" }, { "code": "MS" }, { "code": "MO" }, { "code": "MT" }, { "code": "NE" }, { "code": "NV" }, { "code": "NH" }, { "code": "NJ" }, { "code": "NM" }, { "code": "NY" }, { "code": "NC" }, { "code": "ND" }, { "code": "MP" }, { "code": "OH" }, { "code": "OK" }, { "code": "OR" }, { "code": "PW" }, { "code": "PA" }, { "code": "PR" }, { "code": "RI" }, { "code": "SC" }, { "code": "SD" }, { "code": "TN" }, { "code": "TX" }, { "code": "UT" }, { "code": "VT" }, { "code": "VA" }, { "code": "VI" }, { "code": "WA" }, { "code": "WV" }, { "code": "WI" }, { "code": "WY" }
    ];
  }

  /*
  TODO : To get all Departments by storeId
  Method : getDepartmentsByStoreId
  */
  public getDepartmentsByStoreId(storeId, company_id, callback) {
    if (storeId === null) {
      return Observable.throw("Please pass store ID");
    } else if (company_id === null) {
      return Observable.throw("Please pass company ID");
    }
    else {
      console.log("" + API_URL.BASE_API_URL + API_URL.GET_DEPARTMENT_BY_STORE_ID + "&store_id=" + storeId + "&company_id=" + company_id);
      this.http
        .get("" + API_URL.BASE_API_URL + API_URL.GET_DEPARTMENT_BY_STORE_ID + "&store_id=" + storeId + "&company_id=" + company_id)
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

  /*
  TODO : To get all GroceryItems by storeId
  Method : getGroceryItemsByStoreId
  */
  public getGroceryItemsByStoreId(storeId, company_id, callback) {
    if (storeId === null) {
      return Observable.throw("Please pass store ID");
    }
    else if (company_id === null) {
      return Observable.throw("Please pass Company ID");
    }
    else {
      console.log("getGroceryItemsByStoreId : " + API_URL.BASE_API_URL + API_URL.GET_GROCERY_ITEM_BY_STORE_ID + "&store_id=" + storeId + "&company_id=" + company_id);
      this.http
        .get("" + API_URL.BASE_API_URL + API_URL.GET_GROCERY_ITEM_BY_STORE_ID + "&store_id=" + storeId + "&company_id=" + company_id)
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

  /*
  TODO : To get all ScanneItems by storeId
  Method : getScanneItemsByStoreId
  */
  public getScanneItemsByStoreId(storeId, company_id, plu_no, callback) {
    if (storeId === null) {
      return Observable.throw("Please pass store ID");
    } else if (company_id === null) {
      return Observable.throw("Please pass Company ID");
    }
    else {
      console.log("getScanneItemsByStoreId : " + API_URL.BASE_API_URL + API_URL.GET_SCANNE_ITEM_BY_STORE_ID + "&store_id=" + storeId + "&company_id=" + company_id + "&plu_no=" + plu_no);
      this.http
        .get("" + API_URL.BASE_API_URL + API_URL.GET_SCANNE_ITEM_BY_STORE_ID + "&store_id=" + storeId + "&company_id=" + company_id + "&plu_no=" + plu_no)
        .map(res => res.json())
        .subscribe(
        data => {
          console.log("barcode_items data :" + JSON.stringify(data));
          // alert("JSON.stringify(data) :" + JSON.stringify(data))
          return callback(null, data);
        },
        err => {
          return callback(err, null);
        });
    }
  }

  /*
  TODO : To Update Item
  Method : updateItem
  */
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
        .get("" + API_URL.BASE_API_URL + API_URL.UPDATE_ITEM + "&item_id=" + itemId + "&new_price=" + price + "&update_inventory=" + inventory)
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

  /*
  TODO : To Add New Item
  Method : addItem
  */
  public addItem(store_id, company_id, plu_no, description, r_grocery_department_id, price, plu_tax, save_to, callback) {
    let THIS = this;
    console.log("store_id :" + store_id + " plu_no :" + plu_no + " description :" + description + " r_grocery_department_id :" + r_grocery_department_id + " price :" + price + " plu_tax :" + plu_tax);
    if (store_id === null) {
      return Observable.throw("Please pass store ID");
    } else if (company_id === null) {
      return Observable.throw("Please pass company id");
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
      body.append('company_id', company_id);

      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers });

      this.http
        .post(API_URL.BASE_API_URL + API_URL.ADD_ITEM, body, options)
        .map(res => res.json())
        .subscribe(
        data => {
          console.log('addItem  ' + JSON.stringify(data));
          if (THIS.commonService.isSuccess(data.status)) {
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

  /*
  TODO : To Get LatestPack by Date
  Method : getLatestPackByDate
  */
  public getLatestPackByDate(store_id, company_id, date, status, callback) {
    console.log("getLatestPackByDate : " + API_URL.BASE_API_URL + API_URL.GET_LATEST_PACK_BY_DATE + "&store_id=" + store_id + "&company_id=" + company_id + "&date=" + date + "&status=" + status);
    this.http
      .get("" + API_URL.BASE_API_URL + API_URL.GET_LATEST_PACK_BY_DATE + "&store_id=" + store_id + "&company_id=" + company_id + "&date=" + date + "&status=" + status)
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

  /*
  TODO : To Get DailyReadings by Date
  Method : getDailyReadingsByDate
  */
  public getDailyReadingsByDate(store_id, company_id, reading_date, callback) {
    let URL = API_URL.BASE_API_URL + API_URL.GET_DAILY_READING_BY_DATE + "&store_id=" + store_id + "&company_id=" + company_id + "&reading_date=" + reading_date;

    console.log(' URL ' + URL);

    console.log("getDailyReadingsByDate : " + URL);
    this.http
      .get(URL)
      .map(res => res.json())
      .subscribe(
      data => {
        console.log('getDailyReadingsByDate  ' + JSON.stringify(data));
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

  /*
  TODO : To Get FinishDailyReadings by Date
  Method : getFinishDailyReadingsByDate
  */
  public getFinishDailyReadingsByDate(store_id, company_id, callback) {
    let URL = API_URL.BASE_API_URL + API_URL.GET_DAILY_FINISH_READING_BY_DATE + "&store_id=" + store_id + "&company_id=" + company_id;

    console.log("getFinishDailyReadingsByDate : " + URL);
    this.http
      .get(URL)
      .map(res => res.json())
      .subscribe(
      data => {
        console.log('getFinishDailyReadingsByDate  ' + JSON.stringify(data));
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

  /*
  TODO : To Get ScatchReport
  Method : getScatchReport
  */
  public getScatchReport(company_id, start_date, end_date, storeId, callback) {
    console.log("getScatchReport : " + API_URL.BASE_API_URL + API_URL.GET_SCATCH_REPORT + "&company_id=" + company_id + "&start_date=" + start_date + "&end_date=" + end_date + "&store_id=" + storeId)
    this.http
      .get("" + API_URL.BASE_API_URL + API_URL.GET_SCATCH_REPORT + "&company_id=" + company_id + "&start_date=" + start_date + "&end_date=" + end_date + "&store_id=" + storeId)
      .map(res => res.json())
      .subscribe(
      data => {
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

  /*
  TODO : To Confirm Pack
  Method : confirmPack
  */
  public confirmPack(body, options, callback) {
    this.http
      .post(API_URL.BASE_API_URL + API_URL.CONFIRM_PACK, body, options)
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

  /*
  TODO : To Activate Pack
  Method : activePack
  */
  public activePack(body, options, callback) {
    this.http
      .post(API_URL.BASE_API_URL + API_URL.ACTIVATE_PACK, body, options)
      .map(res => res.json())
      .subscribe(
      data => {
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

  /*
  TODO : To Add New Game
  Method : addGame
  */
  public addGame(body, options, callback) {
    this.http
      .post(API_URL.BASE_API_URL + API_URL.ADD_NEW_GAME, body, options)
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

  /*
  TODO : To Remove Game by Id
  Method : removeGameById
  */
  public removeGameById(body, options, callback) {
    this.http
      .post(API_URL.BASE_API_URL + API_URL.REMOVE_GAME_BY_ID, body, options)
      .map(res => res.json())
      .subscribe(
      data => {
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

  /*
  TODO : To Update status dailyReading Or Soldout
  Method : dailyReadingOrSoldout
  */
  public dailyReadingOrSoldout(body, options, type, callback) {
    let URL = "";
    URL = (type == 'dailyreading') ? API_URL.LOTTERY_DAILY_READING : API_URL.SOLD_OUT;
    console.log(' URL ' + URL + ' | body ' + body);

    this.http
      .post(API_URL.BASE_API_URL + URL, body, options)
      .map(res => res.json())
      .subscribe(
      data => {
        console.log('dailyReadingOrSoldout  ' + JSON.stringify(data));
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


