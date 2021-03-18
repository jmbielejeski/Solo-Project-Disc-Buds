const friendDetailReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIEND_DETAILS':
      console.log('friend detail reducer', action.payload)
      return action.payload;
    case 'GRAB_FRIEND_DETAILS':
        return state;
    default:
      return state;
  }
}

export default friendDetailReducer;