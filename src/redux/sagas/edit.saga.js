import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { useSelector, useDispatch } from 'react-redux';

function* editSaga(action) {

    console.log('actionPPPPPPPPPPPPPPPPPPPPPPPP', action.payload.editUrl)

    try {
        const response = yield axios.put(`/api/edit/${action.payload.detailsId}`, {data: action.payload.editUrl}); // make route at favorites router
        yield put({ type: 'FETCH_FAVORITES', payload: response.data }); // is this right? ********
        // console.log('in delete favorite saga')

    } catch (error) {
        console.log('edit trees failed', error);

    }
}

function* watcherEditSaga() {
    yield takeLatest('EDIT_TREE', editSaga)
    console.log('I want to take a break!!!!!!')
}

export default watcherEditSaga;