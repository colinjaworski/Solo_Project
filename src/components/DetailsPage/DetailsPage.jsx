import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './DetailsPage.css';
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
  const [disabled, setDisabled] = useState('')


  useEffect(() => {
    checkIfFavorite(favorites, details)
  }, []);

  function checkIfFavorite(favorites, tree) {

    for (let item of favorites) {
      // console.log('the favorite names are', item.species)
      if (item.species === tree.species) {
        // console.log('WEEEEE HAVE A MATCH!!!')
        setDisabled(true);
      }
    }
  }

  function backToSearch() {
    history.push('/info')
  }

  const handleSubmit = (tree) => {
    console.log('favoriting tree', tree)
    checkIfFavorite(favorites, tree);
    dispatch({ type: 'POST_FAVORITE', payload: tree.id })
    setDisabled(!disabled)
    
  }

  return (
    <div className="details">
      <h2 className="detailsName">{details.species}</h2>

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
            return <Fab color="primary" aria-label="like"><FavoriteIcon onClick={() =>  handleSubmit(details)} /></Fab>;
          } else {
            return <Fab disabled aria-label="like"><FavoriteIcon /></Fab>;
          }
        })()}
        <br />
        <br />

        <button
          onClick={() => backToSearch()}
        >Back</button>

      </div>
    </div>
  );
}
export default DetailsPage;