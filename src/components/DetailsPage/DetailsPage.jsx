import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

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
  const [ disabled, setDisabled ] = useState(false)


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



  const handleSubmit = (tree) => {

    console.log('favoriting tree', tree)
    checkIfFavorite(favorites, tree);
    dispatch({ type: 'POST_FAVORITE', payload: tree.id })
    history.push('/info')
  }

  return (
    <div>
      <h2>Details Page</h2>
      <h3>{details.species}</h3>

      <img className="treePicture"
        src={details.img_url} alt=""
        width="300" height="300" />
      <br />

      <button
        disabled = {disabled}
        onClick={() => handleSubmit(details)}
      >Like</button>

      <br />
      <p>{details.height} feet tall and {details.width} feet wide</p>
      <p>Fall color: {details.fall_color}</p>
      <p>Shade tolerance: {details.shade_tolerance}</p>

      <p>{details.other_notes}</p>
      <br />



      <button
        onClick={() => backToSearch()}
      >Back</button>
    </div>
  );
}
export default DetailsPage;