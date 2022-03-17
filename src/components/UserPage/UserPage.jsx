import React, { useEffect, useState } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'


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
    console.log('removing tree', favorite)
    dispatch({ type: 'DELETE_FAVORITE', payload: favorite })
  }

  function detailsPage(tree) { // function dispatches selected movie and information to movie reducer
    console.log('Tree data', tree)
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

                <h5 className="treeName">{favorite.species}</h5>
                <img className="treePicture"
                  src={favorite.img_url} alt=""
                  width="200" height="200" 
                  onClick={() => detailsPage(favorite)}
                  />

                <button onClick={() => handleSubmit(favorite.tree_id)}>remove</button>

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
