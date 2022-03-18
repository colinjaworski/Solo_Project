import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'


function EditPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const details = useSelector((store) => store.details);
    const editUrl = useSelector((store) => store.edit);
    const detailsId = useSelector((store) => store.details.id);

    console.log('details', details)

    function backToSearch() {
        history.push('/info')
    }

    function handleSubmit(event) {
        // event.preventDefault();
        console.log('input value: ', editUrl, ', the id of the tree is', details.id) // editUrl is what is sent on button click & represents input data
        
        dispatch({
            type: 'EDIT_TREE',
            payload: {
                editUrl: editUrl,
                detailsId: detailsId,
            
            }
        });


        console.log('after dispatch in handle submit')
    };

    function handleChange(event) {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: event.target.value
        });



        console.log(event.target.value)
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
                    onChange={(event) => handleChange(event)}
                    placeholder={'New image url'}
                // value={details.img_url}
                // type='submit'
                />
                <button
                    onClick={() => handleSubmit()}
                >Submit</button>
            </form>

            <button
                onClick={() => backToSearch()}
            >Back</button>
        </div>
    );
}

export default EditPage;