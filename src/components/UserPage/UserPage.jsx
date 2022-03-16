import React, { useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES' });
  }, [dispatch]);
  
  const user = useSelector((store) => store.user);
  const favorites = useSelector((store) => store.favorites);
  console.log('favorites', favorites);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
    
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
