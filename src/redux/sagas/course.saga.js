import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import CourseSearch from '../../components/CourseSearch/CourseSearch';

function* course (action) {
  yield takeEvery('FETCH_COURSE_SEARCH', fetchCourseSearch)
  yield takeEvery('ADD_COURSE', addCourse)
};


function* fetchCourseSearch (action) {
//console.log('saga course search', action.payload.courseSearch)


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

function* addCourse (action) {
  //console.log('saga addCourse', action.payload);
  try {
    yield axios.post('api/course', action.payload);
  }
  catch(error) {
    console.log('error in saga adding course', error);
  }
}

// function* selectCourse (action) {
//   console.log('in saga select course', action.payload);


//   try {
//     yield put({
//       type: 'SET_SELECT_COURSE',
//       payload: action.payload.courseId
//     })
//   }
//   catch(error) {
//     console.log('error in selectCourse saga', error)
//   }
// }

export default course;