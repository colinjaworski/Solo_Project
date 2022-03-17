import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'


function SearchPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const searchResults = useSelector((store) => store.searchResults);
  const [maxHeight, setMaxHeight] = useState('');
  const [maxWidth, setMaxWidth] = useState('');
 
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
    console.log('the max height search', Number(maxHeight));
    console.log('the max width search', Number(maxWidth));

    dispatch({ type: 'FETCH_SEARCH_RESULTS', 
    // payload: {maxHeight} {maxWidth}   values from inputs go here??????????????????
  });
    
  }

  return (
    <>
      <div className="container">
        <p>Search New</p>
        {/* <input placeholder="region" type="text" /> */}
        <input placeholder="max height" type="text" 
          value={maxHeight}
          onChange={() => setMaxHeight(event.target.value)}/>

        <input placeholder="max width" type="text" 
        value={maxWidth}
        onChange={() => setMaxWidth(event.target.value)}/>

        <button
          onClick={() => handleSearch()} // pass in input values here????????????????
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
