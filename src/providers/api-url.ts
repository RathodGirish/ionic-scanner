export const API_URL = Object.freeze({
    BASE_API_URL: 'http://192.169.176.227/backofficeweb/', 
  
    GET_DEPARTMENT_BY_STORE_ID: '?action=department',
    GET_GROCERY_ITEM_BY_STORE_ID: '?action=grocery_items',
    GET_SCANNE_ITEM_BY_STORE_ID: '?action=barcode_items',
    GET_LATEST_PACK_BY_DATE: "?action=getLatestPackByDate",
    GET_SCATCH_REPORT: "?action=getScatchReport",
    GET_DAILY_READING_BY_DATE: "?action=getDailyReadings",
    GET_DAILY_FINISH_READING_BY_DATE: "?action=getFinishDailyReadings",
    

    UPDATE_ITEM: '?action=updateiteam',

    ADD_ITEM:'?data=addnewitem',
    CONFIRM_PACK: '?data=PostConfirmPack',
    ACTIVATE_PACK: '?data=PostActivatePack',
    ADD_NEW_GAME: '?data=addnewgame',
    REMOVE_GAME_BY_ID: '?data=removeGameById',
    LOTTERY_DAILY_READING : "?data=lottery_daily_readings",
    SOLD_OUT : "?data=sold_out"
});
