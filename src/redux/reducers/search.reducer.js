const searchReducer = (state = [], action) => {

    // console.log('in search reducer')
    
        switch (action.type) {
          case 'SET_SEARCH_RESULTS':
            return action.payload;
          case 'UNSET_SEARCH_RESULTS':
            return [];
          default:
            return state;
        }
      };
    
      export default searchReducer;