import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'


function SearchPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const searchResults = useSelector((store) => store.searchResults);

  // useEffect(() => {
  //   dispatch({ type: 'FETCH_SEARCH_RESULTS' });
  // }, [dispatch]);

  function detailsPage(tree) { // function dispatches selected movie and information to movie reducer
    console.log('Tree data', tree)
    dispatch({
      type: 'SELECTED_TREE',
      payload: tree
    })
    history.push('/details')
  }

  function handleSearch() {
    dispatch({ type: 'FETCH_SEARCH_RESULTS' });
  }

  return (
    <>
      <div className="container">
        <p>Search New</p>
        <input placeholder="region" type="text" />
        <input placeholder="max height" type="text" />
        <input placeholder="max width" type="text" />
        <button
        onClick={handleSearch}
        >Submit</button>

        <div className="searchResults">
          {searchResults.map((tree, i) => {
            return (
              <div className="" key={i}>
                <h5 className="treeName">{tree.species}</h5>
                <img className="treePicture"
                  src={tree.img_url} alt=""
                  width="200" height="200"
                  onClick={() => detailsPage(tree)}
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
