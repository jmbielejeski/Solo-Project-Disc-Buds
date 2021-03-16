import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import CourseSearch from '../../components/CourseSearch/CourseSearch';

function* course (action) {
  yield takeEvery('FETCH_COURSE_SEARCH', fetchCourseSearch)

};


function* fetchCourseSearch (action) {
console.log('saga course search', action.payload.courseSearch)


  try {
    const response = yield axios.get(`/api/course/${action.payload.courseSearch}`)

    yield put({
      type: 'SET_COURSE_SEARCH',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error in fetchCourseSearch', error);
  }
}

export default course;