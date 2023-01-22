import React, { useRef } from 'react'
import "./Createcourse.css";
import Axios from '../api/axios';

const Createcourse = () => {
    const inputRef = useRef(null);

    const handleClick = async () => {

        await Axios.post("/createCourse", { courseName: inputRef.current.value })
            .then(function (response) {
                inputRef.current.value = ""
                // console.log(response);
            }).catch(function (error) {
                console.error(error);
            });

        console.log(inputRef.current.value);
    }

    return (
        <div className='create-container'>
            <div className='input-div' >
                <p className='create-title'>Please enter new course name:</p>
                <input className='create-input' type="text" placeholder='Course Name' ref={inputRef} required />
            </div>
            <button className='create-btn' onClick={handleClick}>Create</button>
        </div>
    )
}

export default Createcourse;