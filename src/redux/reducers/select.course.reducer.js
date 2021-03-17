const selectCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECT_COURSE':
      return action.payload;
    default:
      return state;
  }
}

export default selectCourseReducer;