import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


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
    console.log('is deciduous?', deciduous)
    dispatch({
      type: 'FETCH_SEARCH_RESULTS',
      payload: { deciduous: deciduous, shadeTolerance: shadeTolerance, maxHeight: maxHeight, maxWidth: maxWidth }
    });
  }
  function isAuthorized() { // function checks if a person is authorized and sets value of authorized to true or false
    if (person.id === 1) {
      console.log('this user is authorized!!!')
      setAuthorised(true)
    }
  }


  return (
    <>
      <div className="container">
        <p>Search New</p>

        <select 
        onChange={() => setDeciduous(event.target.value)}
        id="treeType" name="treeType" >
          <option value="TRUE">Deciduous</option>
          <option value="FALSE">Evergreen</option>
        </select>

        <select 
        onChange={() => setShadeTolerance(event.target.value)}
        id="shadeType" name="shadeType" >
          <option value="Yes">Shade</option>
          <option value="Partial">Either </option>
          <option value="No">Sun</option>
        </select>

        <input placeholder="max height" type="text"
          value={maxHeight}
          onChange={() => setMaxHeight(event.target.value)} />

        <input placeholder="max width" type="text"
          value={maxWidth}
          onChange={() => setMaxWidth(event.target.value)} />

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
                  Max height: {tree.width}+<br />
                  Max width: {tree.height}+<br />
                  {/* Shade tolerant? {tree.shade_tolerance} */}
                </h4>

                {/* {(function () {
                  if (tree.shade_tolerance === 'Yes') {
                    return <Brightness5SharpIcon
                      className="shadeIcon"
                      onClick={() => alert('I am tolerant of shade')}
                    />;
                  } else if (tree.shade_tolerance === 'No') {
                    return <Brightness7SharpIcon
                      className="shadeIcon"
                      onClick={() => alert('I prefer full sun')}
                    />;
                  } else (tree.shade_tolerance === 'Partial')
                  return <Brightness6SharpIcon
                    className="shadeIcon"
                    onClick={() => alert('I can do well in both sunny and shady areas')}
                  />
                })()} */}

                {/* <Alert variant="outlined" severity="info">hi there</Alert> use in place of alert for shade_tolerance */}

                {(function () {
                  if (authorised) {
                    return <button
                      onClick={() => editPage(tree)}
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
