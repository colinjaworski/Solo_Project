import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getFavorites() { 

    try {
        const response = yield axios.get('/api/favorites');
        yield put({ type: 'SET_FAVORITES', payload: response.data });


    } catch (error) {
        console.log('SET favorites failed', error);

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

function* favoritesSaga() {
    yield takeLatest('FETCH_FAVORITES', getFavorites); 
    // yield takeLatest('POST_NEW_SHELF_ITEM', postfavorites);

}

export default favoritesSaga;