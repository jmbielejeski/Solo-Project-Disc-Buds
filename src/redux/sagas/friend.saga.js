
import {put, takeEvery} from 'redux-saga/effects';

import axios from 'axios';

function* friend (action) {
  yield takeEvery('FETCH_FRIEND_SEARCH', fetchFriendSearch)
  yield takeEvery('ADD_FRIEND', addFriend)
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

function* addFriend (action) {
  console.log('action.payload', action.payload)
  try {
    yield axios.post(`/api/friend`, action.payload);
  }
  catch(error) {
    console.log('error adding friend in saga', error);
  }
};

export default friend;
