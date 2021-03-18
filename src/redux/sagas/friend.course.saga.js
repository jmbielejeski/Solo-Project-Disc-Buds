import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* friendCourse (action) {
  yield takeEvery('SELECTED_FRIEND_COURSE', selectedFriendCourse);
};

function* selectedFriendCourse (action) {
  console.log('in selectedFriendCourse saga')
}

export default friendCourse;