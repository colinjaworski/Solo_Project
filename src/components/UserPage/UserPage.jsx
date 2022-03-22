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
                  width="300" height="300"
                  onClick={() => detailsPage(favorite)}
                />
                <h5 className="treeName">{favorite.species}</h5>
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
