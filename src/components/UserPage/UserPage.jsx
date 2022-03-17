import React, { useEffect, useState } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();

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
                  width="200" height="200" />

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
