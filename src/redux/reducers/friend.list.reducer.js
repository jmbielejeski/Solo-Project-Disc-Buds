const friendListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIEND_LIST':
      return action.payload;
    default:
      return state;
  }
}

export default friendListReducer;