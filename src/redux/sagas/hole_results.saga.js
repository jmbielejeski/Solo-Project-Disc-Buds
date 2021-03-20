import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* holeResults (action) {
  yield takeEvery('SET_HOLE_RESULT', setHoleResult);
};

function* setHoleResult (action) {
  console.log('in setHoleResult saga', action.payload);

  try {
    yield axios.post(`/api/holeResults`, action.payload);
  }
  catch(error) {
    console.log('in setHoleResult saga POST failed', error)
  }
}

export default holeResults;