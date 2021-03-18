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
    yield axios.post(`/api/friendCourse`, action.payload);
  }
  catch(error) {
    console.log('in selectedFriendCourse sage GET failed', error)
  }

}

export default friendCourse;