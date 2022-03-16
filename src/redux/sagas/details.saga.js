import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* detailsSaga() {
    yield takeLatest('SELECTED_TREE', getSearchResults); 
    // yield takeLatest('POST_NEW_SHELF_ITEM', postfavorites);

}

export default detailsSaga;