const friendCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FRIEND_COURSE':
      return action.payload;
    default:
      return state;
  }
}

export default friendCourseReducer;