const friendDetailReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIEND_DETAILS':
      return action.payload;
    case 'GRAB_FRIEND_DETAILS':
        return state;
    default:
      return state;
  }
}

export default friendDetailReducer;