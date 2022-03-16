import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function SearchPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_SEARCH_RESULTS' });
  }, [dispatch]);

  const searchResults = useSelector((store) => store.searchResults);
console.log('these are the search results!!!!!!!!!!!!!!',searchResults)
  return (
    <>
      <div className="container">
        <p>Search New</p>
        <input type="text" /> <input type="text" /> <input type="text" />
        <button>Submit</button>

        {searchResults.map((result, i) => {
          return (
            <ul key={i}>
             
                {result.species}
              
            </ul>
          );
        })}


      </div>



    </>
  );
}

export default SearchPage;
