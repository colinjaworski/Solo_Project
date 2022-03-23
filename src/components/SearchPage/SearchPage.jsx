import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Brightness7SharpIcon from '@mui/icons-material/Brightness7Sharp';
import Brightness6SharpIcon from '@mui/icons-material/Brightness6Sharp';
import Brightness5SharpIcon from '@mui/icons-material/Brightness5Sharp';
import Alert from '@mui/material/Alert';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

function SearchPage() {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const treeType = [
    'Deciduous',
    'Evergreen',
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }


  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
          onClick={() => handleSearch()}
        >Submit</button>

       
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Type</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {treeType.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>




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
