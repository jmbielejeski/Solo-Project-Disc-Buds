const matchResultsHistoryReducer = (state = [], action) => {
    console.log('matchResultHistoryReducer', action.payload)
  switch (action.type) {
    case 'SET_MATCH_RESULTS_HISTORY':
      return action.payload;
    default:
      return state;
  }
};

export default matchResultsHistoryReducer;
