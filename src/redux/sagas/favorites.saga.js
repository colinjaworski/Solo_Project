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


function* deleteFavorite(action) { 

    try {
        const response = yield axios.delete(`/api/favorites/${action.payload}`); // make route at favorites router
        yield put({ type: 'FETCH_FAVORITES', payload: response.data }); // is this right? ********
        // console.log('in delete favorite saga')

    } catch (error) {
        console.log('SET favorites failed', error);

    }
}
function* postFavorite(action) { 

    try {
        const response = yield axios.post(`/api/favorites/${action.payload}`); // make route at favorites router
        yield put({ type: 'SET_FAVORITES', payload: response.data }); // is this right? ********
        // console.log('in post favorite saga')

    } catch (error) {
        console.log('SET favorites failed', error);

    }
}

function* favoritesSaga() {
    yield takeLatest('FETCH_FAVORITES', getFavorites); 
    yield takeLatest('DELETE_FAVORITE', deleteFavorite); 
    yield takeLatest('POST_FAVORITE', postFavorite); 


    // yield takeLatest('POST_NEW_SHELF_ITEM', postfavorites);

}

export default favoritesSaga;