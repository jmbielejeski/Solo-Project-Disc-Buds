const discGolfSearchResults = (state = [], action) => {
  switch (action.type) {
    case 'SET_PDGA_SEARCH':
      return action.payload
    case 'CLEAR_SEARCH_REDUCER':
      return []
    default:
      return state;
  }
}

export default discGolfSearchResults;