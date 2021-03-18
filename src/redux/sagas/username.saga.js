import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* userName (action) {
  yield takeEvery('CHANGE_USERNAME', changeUserName);
};

function* changeUserName (action) {
  console.log('in changeUserName saga', action.payload);

  try {
    console.log('allaalal');
  }
  catch(error) {
    console.log('error in changeUserName saga', error)
  }

}

export default userName;