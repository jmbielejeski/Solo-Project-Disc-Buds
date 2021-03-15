const friendReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIEND_SEARCH':
      return action.payload;
    default:
      return state;
  }
}

export default friendReducer;