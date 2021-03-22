import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

function* friend (action) {
  yield takeEvery('FETCH_FRIEND_SEARCH', fetchFriendSearch)
  yield takeEvery('ADD_FRIEND', addFriend)
  yield takeEvery('FETCH_FRIEND_DETAILS', fetchFriendDetails);
  yield takeEvery('DELETE_FRIEND', deleteFriend);

  yield takeEvery('FETCH_FRIEND_LIST', fetchFriendList);
  yield takeEvery('FETCH_CURRENT_DETAILS', fetchCurrentFriendDetails);
};

function* fetchFriendSearch (action) {
  try {
    const response = yield axios.get(`/api/friend/${action.payload.friendSearch}`);

    // console.log('friend search response', response);

    yield put({
      type:'SET_FRIEND_SEARCH',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error getting data', error);
  }
}

function* fetchFriendDetails (action) {

  //console.log('action.payload', action.payload.friendId);

  try {

    // const response = yield axios.get(`/api/friend/details/${action.payload.friendId}`)
    yield put({
      type: 'SET_FRIEND_DETAILS',
      payload: action.payload.friendId
    })
  }
  catch (error) {
    console.log('error in saga fetching friend details', error);
  }
}

function* fetchCurrentFriendDetails (action) {

  //console.log('action.payload', action.payload.friendId);

  try {
    const response = yield axios.get(`/api/friend/details/${action.payload.friendId}`)
    yield put({
      type: 'SET_CURRENT_FRIEND_DETAILS',
      payload: action.payload.friendId
    })
  }
  catch (error) {
    console.log('error in saga fetching friend details', error);
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

function* deleteFriend (action) {
  // console.log('in deleteFriend saga')
  try {
    yield axios.delete(`/api/friend/${action.payload.friendId}`)
  }
  catch (error) {
    console.log('error in friendDelete saga', error)
  }
}

function* fetchFriendList (action) {
  // console.log('fetchFriendList saga')
  try {
    const response = yield axios.get(`/api/friend`);
    yield put({
      type: 'SET_FRIEND_LIST',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error in fetchFriendList', error);
  }
}



export default friend;
