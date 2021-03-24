import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* matchResults (action) {
  yield takeEvery('SET_MATCH_RESULTS', setMatchResults);
  yield takeEvery('FETCH_MATCH_RESULTS', fetchMatchResults);
};

  function* setMatchResults (action) {
    console.log('in setMatchResults saga', action.payload);

    try {
      yield axios.post(`/api/matchResults`, action.payload);
    }
    catch(error) {
      console.log('in setMatchResults sage post failed', error)
    }
  }
  function* fetchMatchResults (action) {
    console.log('in fetchMatchResults')

    try {
      const response = axios.get(`api/matchResults/${action.payload.friendId}`)
      yield put({
        type: 'SET_MATCH_HISTORY',
        payload: response.data
      })
    }
    catch(error) {
      console.log('error in fetchMatchResults');
    }
  }

export default matchResults;