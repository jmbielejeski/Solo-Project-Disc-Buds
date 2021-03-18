import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import CourseSearch from '../../components/CourseSearch/CourseSearch';

function* course (action) {
  yield takeEvery('FETCH_COURSE_SEARCH', fetchCourseSearch);
  yield takeEvery('ADD_COURSE', addCourse);
  yield takeEvery('FETCH_FRIEND_COURSE_HISTORY', fetchFriendCourseHistory);
};


function* fetchCourseSearch (action) {
console.log('saga course search', action.payload.courseSearch)
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

function* addCourse (action) {
  //console.log('saga addCourse', action.payload);
  try {
    yield axios.post('api/course', action.payload);
  }
  catch(error) {
    console.log('error in saga adding course', error);
  }
}

function* fetchFriendCourseHistory (action) {
  console.log('fetchFriendCourseHistory saga', action.payload.selectCourse.courseId)
  try {
    const response = yield axios.get(`/api/course/selected/${action.payload.selectCourse}`);
    yield put({
      type: 'SET_FRIEND_HISTORY',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error in fetchFriendCourseHistory', error);
  }
}

export default course;