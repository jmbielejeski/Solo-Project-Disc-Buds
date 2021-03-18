const friendCourseHistoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIEND_HISTORY':
      return action.payload;
    default:
      return state;
  }
}

export default friendCourseHistoryReducer;