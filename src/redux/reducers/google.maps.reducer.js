const googleMapsResult = (state = [], action) => {
  switch (action.type) {
    case 'SET_GOOGLE_MAPS_SEARCH':
      return [ ...state,
        action.payload
      ]
    default:
      return state;
  }
}

export default googleMapsResult;