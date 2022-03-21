import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

function SearchPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const person = useSelector((store) => store.user);
  const searchResults = useSelector((store) => store.searchResults);
  // const [deciduous, setDeciduous] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [maxWidth, setMaxWidth] = useState('');
  const [authorised, setAuthorised] = useState(false)
  useEffect(() => {
    isAuthorized()
  }, []);

  function detailsPage(tree) { // function dispatches selected movie and information to movie reducer
    console.log('Tree data', tree)
    dispatch({
      type: 'SELECTED_TREE',
      payload: tree
    })
    history.push(`/details`)
  }

  function editPage(tree) { // function dispatches selected movie and information to movie reducer
    console.log('Tree data', tree)
    dispatch({
      type: 'SELECTED_TREE',
      payload: tree
    })
    history.push('/edit')
  }

  function handleSearch() {
    // console.log('the max height search', Number(maxHeight));
    // console.log('the max width search', Number(maxWidth));

    dispatch({
      type: 'FETCH_SEARCH_RESULTS',
      payload: { maxHeight: maxHeight, maxWidth: maxWidth }   // sending height and width for tree GET request
    });
    // maxHeight: maxHeight, 
  }

  function isAuthorized() {
    if (person.id === 1) {
      console.log('this user is authorized!!!')
      setAuthorised(true)
    }
  }

  return (
    <>
      <div className="container">
        <p>Search New</p>
        {/* <input placeholder="region" type="text" /> */}


        <input placeholder="max height" type="text"
          value={maxHeight}
          onChange={() => setMaxHeight(event.target.value)} />

        <input placeholder="max width" type="text"
          value={maxWidth}
          onChange={() => setMaxWidth(event.target.value)} />

        <button
          onClick={() => handleSearch()} // pass in input values here????????????????
        >Submit</button>



        <div className="searchResults">
          {searchResults.map((tree, i) => {
            return (
              <div className="treeCard" key={i}>

                <img className="treePicture"
                  src={tree.img_url} alt=""
                  width="300"
                  height="300"
                  onClick={() => detailsPage(tree)}
                />


                <h5 className="treeName">{tree.species}</h5>
                {/* Width: {tree.width}<br />
                Height: {tree.height}<br />
                {tree.shade_tolerance} */}
                {(function () {
                  if (authorised) {
                    return <button
                      onClick={() => editPage(tree)} // this will be edit page instead of details page
                    >Edit</button>;
                  } else {
                    return;
                  }
                })()}

              </div>

            );
          })}
        </div>

      </div>



    </>
  );
}

export default SearchPage;
