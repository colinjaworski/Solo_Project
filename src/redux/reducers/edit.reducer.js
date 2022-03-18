const editReducer = (state = [], action) => { // this might need to be brackets, not square ones

    console.log('in EDIT reducer')
    
        switch (action.type) {
          case 'EDIT_ONCHANGE':
            return action.payload;
          case 'CLEAR_EDIT':
            return [];
          default:
            return state;
        }
      };
    
      export default editReducer;