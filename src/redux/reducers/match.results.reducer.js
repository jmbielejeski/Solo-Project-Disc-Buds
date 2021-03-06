const matchResultsReducer = (state = 
  {yourScore: 0, friendScore: 0, friend: '', friendId: 0, course: '', courseId: 0}, action) => {
  switch (action.type) {
    case 'SET_MATCH_RESULTS':
      return { ...state, 
                  yourScore: action.payload.yourScore,
                  friendScore: action.payload.friendScore, 
                  friend: action.payload.friend,
                  friendId: action.payload.friendId,
                  course: action.payload.course,
                  courseId: action.payload.courseId,
              }
    default:
      return state;
  }
};

export default matchResultsReducer;
