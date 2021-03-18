import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* friendCourse (action) {
  yield takeEvery('SELECTED_FRIEND_COURSE', selectedFriendCourse);
};

function* selectedFriendCourse (action) {
  console.log('in selectedFriendCourse saga', action.payload);

  try {
    const response = yield axios.get(`/api/friendCourse`);

    yield put({
      type: 'SET_FRIEND_COURSE_HISTORY',
      payload: response.data
    })
  }
  catch(error) {
    console.log('in selectedFriendCourse sage GET failed', error)
  }

}

export default friendCourse;