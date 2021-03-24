const matchResultsHistoryReducer = (state = [], action) => {
  console.log('reducer payload', action.payload)
  switch (action.type) {
    case 'SET_MATCH_HISTORY':
      return action.payload
    default:
      return state;
  }
};

export default matchResultsHistoryReducer;
