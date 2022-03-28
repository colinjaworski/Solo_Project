import React, { useEffect, useState } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear';

function UserPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES' });
  }, [dispatch]);

  const user = useSelector((store) => store.user);
  const favorites = useSelector((store) => store.favorites);
  // console.log('favorites', favorites);

  const handleSubmit = (favorite) => {
    // console.log('removing tree', favorite)
    let text = "Are you sure you want to delete this tree?";
    if (confirm(text) == true) {
      dispatch({ type: 'DELETE_FAVORITE', payload: favorite })
    } else {
      console.log('you canceled');
    }
  }

  function detailsPage(tree) {
    console.log('Tree data (id)', tree.tree_id) // ******************  ID of tree from favorites
    dispatch({
      type: 'SELECTED_TREE',
      payload: tree
    })
    history.push('/details')
  }

  return (
    <>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <h3>Here are your saved trees</h3>

        <div className="searchResults">
          {favorites.map((favorite, i) => {

            return (
              <div key={i}>


                <img className="treePicture"
                  src={favorite.img_url} alt=""
                  width="300" height="350"
                  onClick={() => detailsPage(favorite)}
                />
                <h5 className="treeName">{favorite.species}</h5>
                {/* <button >remove</button> */}
                <ClearIcon className="deleteIcon" onClick={() => handleSubmit(favorite.tree_id)}/>
              </div>
            );
          })}
        </div>
        {/* <p>Your ID is: {user.id}</p> */}
        {/* <LogOutButton className="btn" /> */}
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
