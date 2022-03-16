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

  const history = useHistory();

  // console.log('the tree is', details)

  function backToSearch() {
    // console.log('bing bang boom')
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