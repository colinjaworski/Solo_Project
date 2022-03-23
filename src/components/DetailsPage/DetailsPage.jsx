import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function DetailsPage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const [heading, setHeading] = useState('Functional Component');
  const details = useSelector((store) => store.details);
  // const user = useSelector((store) => store.user);

  const favorites = useSelector((store) => store.favorites);
  // console.log('favorites are', favorites);
  // console.log('details are', details)
  // console.log('user is', user)
  const dispatch = useDispatch();
  const history = useHistory();
  const [disabled, setDisabled] = useState(false)


  useEffect(() => {
    checkIfFavorite(favorites, details)
  }, []);

  function checkIfFavorite(favorites, tree) {

    for (let item of favorites) {
      // console.log('the favorite names are', item.species)
      if (item.species === tree.species) {
        console.log('WEEEEE HAVE A MATCH!!!')
        setDisabled(true);
      }
    }
    // console.log('selected tree is', tree.id) // from home, this one represents user id, from search results, it is tree id
    // console.log('selected tree is 2', tree.tree_id ) // from home this one represents tree id, from search results, it is undefind
    // console.log('tree name', tree.species)  
  }

  function backToSearch() {
    history.push('/info')
  }


  const handleSubmit = (tree) => {
    console.log('favoriting tree', tree)
    checkIfFavorite(favorites, tree);
    dispatch({ type: 'POST_FAVORITE', payload: tree.id })
    history.push('/info')
  }

  return (
    <div className="details">
      <h2 className="detailsName">{details.species}</h2>

      {/* <FavoriteRoundedIcon className="favoriteIcon"/> */}
      {/* <FavoriteBorderRoundedIcon className="favoriteIcon"/> */}

      <img className="detailsTreePicture"
        src={details.img_url} alt=""
        width="500" height="600" />


      <div className="detailsInfo">
        {/* <br /> */}
        <p>{details.height} feet tall and {details.width} feet wide</p>
        <p>Fall color: {details.fall_color}</p>
        <p>Shade tolerance: {details.shade_tolerance}</p>
        <p>{details.other_notes}</p>
        {/* <br /> */}

        {(function () {
          if (!disabled) {
            return <Fab color="primary" aria-label="like"><FavoriteIcon onClick={() => handleSubmit(details)}/></Fab>;
          } else {
            return  <Fab disabled aria-label="like"><FavoriteIcon /></Fab>;
          }
        })()}
        <br />
        <br />
        {/* <FavoriteBorderRoundedIcon  onClick={() => handleSubmit(details)} /> */}
        {/* <FavoriteRoundedIcon className="favoriteIcon" /> */}
        <button
          onClick={() => backToSearch()}
        >Back</button>

      </div>
    </div>
  );
}
export default DetailsPage;