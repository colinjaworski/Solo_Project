import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';


function SearchPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const person = useSelector((store) => store.user);
  const searchResults = useSelector((store) => store.searchResults);
  const favorites = useSelector((store) => store.favorites);
  const [deciduous, setDeciduous] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [maxWidth, setMaxWidth] = useState('');
  const [shadeTolerance, setShadeTolerance] = useState('');
  const [authorised, setAuthorised] = useState(false);

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
  function handleSearch() { // function sends height and width for get request

    dispatch({
      type: 'FETCH_SEARCH_RESULTS',
      payload: { deciduous: deciduous, shadeTolerance: shadeTolerance, maxHeight: maxHeight, maxWidth: maxWidth}
    });
  }
  function isAuthorized() { // function checks if a person is authorized and sets value of authorized to true or false
    if (person.id === 1) {
      // console.log('this user is authorized!!!')
      setAuthorised(true)
    }
  }


  return (
    <>
      <div className="container">
        <p>Search New Trees!</p>
        <select
          onChange={(event) => setDeciduous(event.target.value)}
          id="treeType" name="treeType" >
            <option>Tree type</option>
          <option value="TRUE">Deciduous</option>
          <option value="FALSE">Evergreen</option>
        </select>

        <select
          onChange={(event) => setShadeTolerance(event.target.value)}
          id="shadeType" name="shadeType" >
            <option>Site conditions</option>
          <option value="Yes">Mostly shade</option>
          <option value="Partial">Partial </option>
          <option value="No">Full sun</option>
        </select>

        <input placeholder="max height" type="text"
          value={maxHeight}
          onChange={(event) => setMaxHeight(event.target.value)} />

        <input placeholder="max width" type="text"
          value={maxWidth}
          onChange={(event) => setMaxWidth(event.target.value)} />


        <button onClick={() => handleSearch()} >Submit</button>



        <div className="searchResults">
          {searchResults.map((tree, i) => {

            return (
              <div className="treeCard" key={i}>

                <img className="treePicture"
                  src={tree.img_url} alt=""
                  width="300"
                  height="350"
                  onClick={() => detailsPage(tree)}
                />

                <h4 className="treeName"
                  onClick={() => detailsPage(tree)}>

                  {tree.species}<br />
                  {/* Max height: {tree.height}+<br />
                  Max width: {tree.width}+<br /> */}
                  {/* Shade tolerant? {tree.shade_tolerance} */}
                </h4>


                {/* <Alert variant="outlined" severity="info">hi there</Alert> use in place of alert for shade_tolerance */}

                {(function () {
                  if (authorised) {

                    return <EditIcon className="editIcon" onClick={() => editPage(tree)}/>;

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
