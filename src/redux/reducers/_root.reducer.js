import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import friendReducer from './friend_reducer';
import friendListReducer from './friend.list.reducer';
import friendDetailReducer from './friend_detail_reducer';
import courseSearchReducer from './course.search.reducer';
import selectCourseReducer from './select.course.reducer';
import friendCourseHistoryReducer from './friend.course.history.reducer';
import friendCourseReducer from './friend.course.reducer';
import matchDetailsReducer from './match.details.reducer';
import matchResultsReducer from './match.results.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  friendReducer,
  friendListReducer,
  friendDetailReducer,
  courseSearchReducer,
  selectCourseReducer,
  friendCourseHistoryReducer,
  friendCourseReducer,
  matchDetailsReducer,
  matchResultsReducer,
});

export default rootReducer;
