const matchResultsHistoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MATCH_RESULTS_HISTORY':
      return action.payload;
    default:
      return state;
  }
};

export default matchResultsHistoryReducer;
