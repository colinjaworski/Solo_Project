import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function SearchPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_SEARCH_RESULTS' });
  }, [dispatch]);

  const searchResults = useSelector((store) => store.searchResults);
  console.log('these are the search results!!!!!!!!!!!!!!', searchResults)
  return (
    <>
      <div className="container">
        <p>Search New</p>
        <input placeholder="region" type="text" />
        <input placeholder="max height" type="text" />
        <input placeholder="max width" type="text" />
        <button>Submit</button>

        <div className="searchResults">
          {searchResults.map((result, i) => {
            return (
              <div className=""key={i}>
                <h5 className="treeName">{result.species}</h5>
                <img className="treePicture"
                  src={result.img_url} alt=""
                  width="200" height="200"
                />
              </div>
            );
          })}
        </div>

      </div>



    </>
  );
}

export default SearchPage;
