export const API_URL = Object.freeze({
    BASE_API_URL: 'http://192.169.176.227/backofficeweb/', 
  
    GET_DEPARTMENT_BY_STORE_ID: '?action=department',
    GET_GROCERY_ITEM_BY_STORE_ID: '?action=grocery_items',
    GET_SCANNE_ITEM_BY_STORE_ID: '?action=barcode_items',
    GET_LATEST_PACK_BY_DATE: "?action=getLatestPackByDate",
    GET_SCATCH_REPORT: "?action=getScatchReport",

    UPDATE_ITEM: '?action=updateiteam',

    ADD_ITEM:'?data=Addnew',
    CONFIRM_PACK: '?data=PostConfirmPack',
    ACTIVATE_PACK: '?data=PostActivatePack',
    ADD_NEW_GAME: '?data=addnewgame'
});

// ADD_ITEM: '?data=Addnew',