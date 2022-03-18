import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'


function EditPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const details = useSelector((store) => store.details);

    console.log('details', details)

    function backToSearch() {
        history.push('/info')
    }

    return (
        <div>
            <h2>You are in the edit page!!!</h2>
            <h3>{details.species}</h3>
            <img className="treePicture"
                src={details.img_url} alt=""
                width="300" height="300" />
            <br />
            {/* <p>{details.height} feet tall and {details.width} feet wide</p>
            <p>Fall color: {details.fall_color}</p>
            <p>Shade tolerance: {details.shade_tolerance}</p>
            <p>{details.other_notes}</p> */}
            <br />

            <form>
                <input
                    // onChange={(event) => handleChange(event)}
                    placeholder='Tree name'
                    value={details.img_url}
                    type='submit'
                    // value='Update Tree picture'
                />

            </form>

            <button
                onClick={() => backToSearch()}
            >Back</button>
        </div>
    );
}

export default EditPage;