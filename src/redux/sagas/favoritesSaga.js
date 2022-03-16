import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';




function* getFavorites() {

    try {
        const response = yield axios.get('/api/favorites');
        yield put({ type: 'SET_FAVORITES', payload: response.data }); // is SET_SHELF right?


    } catch (error) {
        console.log('SET favorites failed', error);

    }
}

function* favoritesSaga() {
    yield takeLatest('FETCH_FAVORITES', getFavorites); // is FETCH_SHELF right? Is it supposed to match the getFavorites?
}

export default favoritesSaga;