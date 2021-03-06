import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import friend from './friend.saga';
import course from './course.saga';
import friendCourse from './friend.course.saga';
import userName from './username.saga';
import holeResults from './hole_results.saga';
import discGolfSearch from './disc.golf.search.saga';
import deleteProfile from './delete.profile';
import matchResults from './match.results.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    friend(),
    course(),
    friendCourse(),
    userName(),
    holeResults(),
    discGolfSearch(),
    deleteProfile(),
    matchResults()
  ]);
}
