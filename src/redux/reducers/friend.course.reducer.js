const friendCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FRIEND_COURSE':
      console.log('friendCourseReducer', action.payload)
      return action.payload;
    default:
      return state;
  }
}

export default friendCourseReducer;