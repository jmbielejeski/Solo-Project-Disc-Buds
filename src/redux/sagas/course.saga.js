import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

function* course (action) {
  yield takeEvery('FETCH_COURSE_SEARCH', fetchCourseSearch);
  yield takeEvery('FETCH_FRIEND_COURSE_HISTORY', fetchFriendCourseHistory);
  yield takeEvery('FETCH_RANDOM_COURSE_HISTORY', fetchRandomPlayer);
  yield takeEvery('HANDLE_LOGIN', handleLogin);
};

function* handleLogin (action) {
  try {
    yield axios.post('/api/discGolfApi')
  }
  catch(error) {
    console.log('error in API Login saga');
  }
}

function* fetchCourseSearch (action) {
  try {
    const response = yield axios.get(`/api/course/search/${action.payload.courseSearch}`)

    yield put({
      type: 'SET_COURSE_SEARCH',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error in fetchCourseSearch', error);
  }
}

function* fetchFriendCourseHistory (action) {
  try {
    const response = yield axios.get(`/api/course/selected/${action.payload.courseId}`);
    yield put({
      type: 'SET_FRIEND_HISTORY',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error in fetchFriendCourseHistory', error);
  }
}


function* fetchRandomPlayer (action) {

  try {
    const response = yield axios.get(`/api/course/random/${action.payload.courseId}`);
    yield put({
      type: 'SET_RANDOM_PLAYER_HISTORY',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error in fetchRandomPlayer', error);
  }
}



export default course;