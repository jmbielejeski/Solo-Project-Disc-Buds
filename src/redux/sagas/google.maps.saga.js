import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* googleMaps (action) {
  yield takeEvery('GOOGLE_MAPS_SEARCH', googleMapsSearch);
};

function* googleMapsSearch (action) {
  console.log('in googleMapsSearch saga', action.payload.googleMapsSearch);

  try {
    const response = yield axios.get(`/api/googleMaps/${action.payload.googleMapsSearch}`);
    yield put({
      type: 'SET_GOOGLE_MAPS_SEARCH',
      payload: response.data
    })
  }
  catch(error) {
    console.log('in googleMapsSearch saga GET failed', error)
  }

}

export default googleMaps;