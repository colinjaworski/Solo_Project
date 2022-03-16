import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';




function* getFavorites() {

    console.log('in favorites saga')

    try {
        const response = yield axios.get('/api/favorites');
        yield put({ type: 'SET_FAVORITES', payload: response.data }); // is SET_FAVORITES right?


    } catch (error) {
        console.log('SET favorites failed', error);

    }
}

function* favoritesSaga() {
    yield takeLatest('FETCH_FAVORITES', getFavorites); // is FETCH_FAVORITES right? Is it supposed to match the getFavorites?
}

export default favoritesSaga;