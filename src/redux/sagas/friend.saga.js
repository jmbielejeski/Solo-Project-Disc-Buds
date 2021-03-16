
import {put, takeEvery} from 'redux-saga/effects';

import axios from 'axios';

function* friend (action) {
  yield takeEvery('FETCH_FRIEND_SEARCH', fetchFriendSearch)
};

function* fetchFriendSearch (action) {
  try {
    const response = yield axios.get(`/api/friend/${action.payload.friendSearch}`);

    console.log('friend search response', response);

    yield put({
      type:'SET_FRIEND_SEARCH',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error getting data', error);
  }
}

export default friend;
