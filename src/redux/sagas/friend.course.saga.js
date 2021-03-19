import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* friendCourse (action) {
  yield takeEvery('SELECTED_FRIEND_COURSE', selectedFriendCourse);
};

function* selectedFriendCourse (action) {
  console.log('in selectedFriendCourse saga', action.payload);

  let courseId = action.payload.courseId;
  let friendName = action.payload.friend;

  try {
    const response = yield axios.post(`/api/friendCourse`, action.payload);
    yield put({
      type: 'SET_MATCH_DETAILS',
      payload: response.data
    })
  }
  catch(error) {
    console.log('in selectedFriendCourse sage GET failed', error)
  }

}

export default friendCourse;