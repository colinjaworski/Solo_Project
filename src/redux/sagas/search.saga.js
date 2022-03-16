import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getSearchResults() { 

    try {
        const response = yield axios.get('/api/search');
        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data });


    } catch (error) {
        console.log('SET search results failed', error);

    }
}

// function* postfavorites(action) {
//     try {
//         yield axios.post('/api/shelf', action.payload);

//         yield put({type: 'FETCH_SHELF'})
//     } catch {
//         console.log('error');
//     }
// }

function* searchSaga() {
    yield takeLatest('FETCH_SEARCH_RESULTS', getSearchResults); 
    // yield takeLatest('POST_NEW_SHELF_ITEM', postfavorites);

}

export default searchSaga;