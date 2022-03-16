const favoritesReducer = (state = [], action) => {

// console.log('in favorites reducer')

    switch (action.type) {
      case 'SET_FAVORITES':
        return action.payload;
      case 'UNSET_FAVORITES':
        return [];
      default:
        return state;
    }
  };

  export default favoritesReducer;