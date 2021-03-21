const randomPlayerReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RANDOM_PLAYER_HISTORY':
      return action.payload;
    default:
      return state;
  }
}

export default randomPlayerReducer;