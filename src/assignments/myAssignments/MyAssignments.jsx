import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { allOtherAxiosRequest } from '../../api/axios'
import Button from "../../component/Button";

import '../../css/MyAssignment.css'

function MyAssignment() {
    const [assignment, setAssignment] = useState({})
    const [practice_id, setPractice_id] = useState('')
    const [words, setWords] = useState([])

    const school_id = localStorage.getItem('school_id');

    const navigate = useNavigate()

    const handleChange = e => {
        e.preventDefault();
        setPractice_id(e.target.value)

    }

    const handleGetData = async () => {
        try {
            const response = await allOtherAxiosRequest.get(`/api/v1/spelling/words/myweeklypractice/${practice_id}/${school_id}`);
            setAssignment(response.data.myAssignment)
            setWords(await response.data.myAssignment.words)
        } catch (err) {
            console.log('==>> error', err.message);
        }
    };


    const handleWords = () => {
        localStorage.setItem('words', JSON.stringify(words))
        navigate('/practicePage')
    }

    if (assignment) {
        return (
            <div className="assignmentContainer">
                <button onClick={handleGetData}>Get the Assignment</button>
                <div>
                    <label htmlFor="practice_id">Enter your Assignment Code</label>
                    <input id="practice_id" name="practice_id" type="text" onChange={handleChange} />
                </div>
                <div className="assignmentIfo">
                    <label className="title" htmlFor="title">Title :</label>
                    <p className="title" id="title">{assignment.name}</p>
                </div>
                <div className="assignmentIfo">
                    <label className="description" htmlFor="description">Description :</label>
                    <p className="description" id="description">{assignment.description}</p>
                </div>
                <div className="selectedWordsContainer">

                    {assignment.words?.map((word, index) => {
                        return (<div key={index} className="words" name="words" >{word}</div>)
                    })}
                </div>

                <Button label='Lets Practice' backgroundColor='Blue' onClick={handleWords} />
            </div>
        )
      

    } else {
        return (<p>....coming soon</p>)
    }


}

export default MyAssignment;