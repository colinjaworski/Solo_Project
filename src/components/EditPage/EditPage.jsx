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
            <h2>{details.species}</h2>
            <img className="treePicture"
                src={details.img_url} alt=""
                width="400" height="500" />
            <br />
            <form>
                <input defaultValue={details.img_url} onChange={(event) => handleChange(event)} placeholder={'New image url'}/>
            </form>
            
            <input defaultValue={details.height}></input>Feet tall <br />
            <input value={details.width}></input>Feet wide  <br />
            <input value={details.fall_color}></input> Fall color <br />
            <input value={details.shade_tolerance}></input> Shade tolerance<br />
            <input value={details.other_notes} ></input> Details<br />
            <br />
            <button onClick={() => handleSubmit()}>Submit</button><br/>

            {/* <button
                onClick={() => backToSearch()}
            >Back</button> */}
        </div>
    );
}

export default EditPage;