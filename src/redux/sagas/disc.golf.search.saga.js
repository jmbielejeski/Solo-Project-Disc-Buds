import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* discGolfSearch (action) {
  yield takeEvery('PDGA_SEARCH', discGolfApiSearch);
};

function* discGolfApiSearch (action) {
  try {
    const response = yield axios.get(`/api/discGolfApi/${action.payload.discGolfCourseSearch}`);
    yield put({
      type: 'SET_PDGA_SEARCH',
      payload: response.data
    })
  }
  catch(error) {
    console.log('in discGolfApiSearch saga GET failed', error)
  }

}

export default discGolfSearch;