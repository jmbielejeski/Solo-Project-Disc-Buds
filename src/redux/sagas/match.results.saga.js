import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* matchResults (action) {
  yield takeEvery('SET_MATCH_HISTORY', setMatchResults);
  yield takeEvery('FETCH_MATCH_RESULTS', fetchMatchResults);
};

  function* setMatchResults (action) {

    try {
      yield axios.post(`/api/matchResults`, action.payload);
    }
    catch(error) {
      console.log('in setMatchResults sage post failed', error)
    }
  }

  function* fetchMatchResults (action) {

    try {
      const response = yield axios.get(`api/matchResults/${action.payload.friendId}`)
      yield put({
        // sends to matchResultsHistoryReducer
        type: 'SET_MATCH_RESULTS_HISTORY',
        payload: response.data
      })
    }
    catch(error) {
      console.log('error in fetchMatchResults');
    }
  }

export default matchResults;