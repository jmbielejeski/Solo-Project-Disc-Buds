const matchResultsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MATCH_RESULTS':
      return action.payload;
    default:
      return state;
  }
};

export default matchResultsReducer;
