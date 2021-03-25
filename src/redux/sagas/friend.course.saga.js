import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* friendCourse (action) {
  yield takeEvery('SELECTED_FRIEND_COURSE', selectedFriendCourse);
};

function* selectedFriendCourse (action) {

  try {
    const response = yield axios.get(`/api/friendCourse/match?courseId=${action.payload.courseId}&friendId=${action.payload.friendId}&holeCount=${action.payload.holeCount}`);
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