const detailsReducer = (state = {}, action) => { // this might need to be brackets, not square ones

    console.log('in details reducer')
    
        switch (action.type) {
          case 'SELECTED_TREE':
            return action.payload;
          case 'UNSET_SELECTED_TREE':
            return {};
          default:
            return state;
        }
      };
    
      export default detailsReducer;