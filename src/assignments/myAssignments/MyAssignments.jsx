import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { allOtherAxiosRequest } from '../../api/axios'
import Button from "../../component/Button";
import Spinner from "../../component/Spinner";

import '../../css/MyAssignment.css'

function MyAssignment() {
    const [assignment, setAssignment] = useState({})
    const [practice_id, setPractice_id] = useState('')
    const [words, setWords] = useState([])
    const [spinner, setSpinner] = useState(false)

    const school_id = localStorage.getItem('school_id');

    const navigate = useNavigate()

    const handleChange = e => {
        e.preventDefault();
        setPractice_id(e.target.value)

    }


    const handleGetData = async () => {
        try {
            setSpinner(true)
            const response = await allOtherAxiosRequest.get(`/api/v1/spelling/words/myweeklypractice/${practice_id}/${school_id}`);
           console.log('==>> response', response)
           
            if (response.status === 200) setSpinner(false)

            setAssignment(response.data.myAssignment)

            // We are checking if the words are an array before setting the words state. 
            // If it is not an array, we set it to an empty array.
            Array.isArray(await response.data.myAssignment.words) ?
                setWords(await response.data.myAssignment.words) :
                setWords([]);


        } catch (err) {
            console.log(err)
            console.log('==>> error', err.message);
        }
    };

    console.log('==>> words', words)

    const handleWords = () => {
        setTimeout(() => {

            localStorage.setItem('words', JSON.stringify(words))
            navigate('/practicePage')

        }, 1000)

    }

    if (assignment)
        return (
            <div className="assignmentContainer">
                {spinner && <Spinner />}
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

}

export default MyAssignment;