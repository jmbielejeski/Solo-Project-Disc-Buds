import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

function* deleteProfile (action) {
  yield takeEvery('DELETE_PROFILE', deleteYourProfile);
};

function* deleteYourProfile (action) {
  console.log('in deleteYourProfile saga')
  try {
    yield axios.delete(`/api/user/${action.payload.userId}`)
  }
  catch (error) {
    console.log('error in deleteYourProfile saga', error)
  }
}

export default deleteProfile;
