import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EditPage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
//   const store = useSelector((store) => store);
//   const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
      <h2>You are in the edit page!!!</h2>
    </div>
  );
}

export default EditPage;