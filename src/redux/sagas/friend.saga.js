import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

function* friend (action) {
  yield takeEvery('FETCH_FRIEND_SEARCH', fetchFriendSearch)
  yield takeEvery('ADD_FRIEND', addFriend)
  yield takeEvery('FETCH_FRIEND_LIST', fetchFriendList);
  yield takeEvery('FETCH_FRIEND_DETAILS', fetchFriendDetails);
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
  //console.log('action.payload', action.payload)
  try {
    yield axios.post(`/api/friend`, action.payload);
  }
  catch(error) {
    console.log('error adding friend in saga', error);
  }
};

function* fetchFriendList (action) {
  try {
    const response = yield axios.get('/api/friend')
    yield put({
      type: 'SET_FRIEND_LIST',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error in fetchFriendList', error);
  }
}

function* fetchFriendDetails (action) {

  //console.log('action.payload', action.payload.friendId);

  try {

    const response = yield axios.get(`/api/friend/details/${action.payload.friendId}`)
    yield put({
      type: 'SET_FRIEND_DETAILS',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error in saga fetching friend details', error);
  }
}

export default friend;
