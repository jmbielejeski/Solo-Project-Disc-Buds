import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

function* deleteProfile (action) {
  yield takeEvery('DELETE_USER_PROFILE', deleteYourProfile);
  yield takeEvery('DELETE_USER_FRIENDSHIP', deleteFriendships);
  yield takeEvery('DELETE_PROFILE', deleteUserCourseHistory);

};

function* deleteUserCourseHistory (action) {
  try {
    yield axios.delete(`/api/friendCourse`)
    yield put({
      type: "DELETE_USER_FRIENDSHIP"
  })
  }
  catch (error) {
    console.log('error in deleteYourProfile saga', error)
  }
}

function* deleteFriendships (action) {
  try {
    yield axios.delete(`/api/friend/profile/friendships`)
    yield put({
      type: "DELETE_USER_PROFILE"
    })
  }
  catch (error) {
    console.log('error in deleteFriendships saga', error)
  }
}

function* deleteYourProfile (action) {
  try {
    yield axios.delete(`/api/user/profile`)
    yield put({
      type: "LOGOUT"
    })
  }
  catch (error) {
    console.log('error in deleteYourProfile saga', error)
  }
}

export default deleteProfile;
