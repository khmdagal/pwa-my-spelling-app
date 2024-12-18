import React, { useEffect, useState } from "react";
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
    const [hideLetsPracticeButton, setHideLetsPracticeButton] = useState('hidden')
    const [errorMessage, setErrorMessage] = useState('')

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
            if (response.status === 200)
                setSpinner(false)
            setAssignment(response.data.myAssignment[0])

        } catch (err) {
            console.log(err)
            console.log('==>> error', err.message);
            setErrorMessage(err.response.data.message)
            setSpinner(false)
        }
    };
    useEffect(() => {
        // We are checking if the words are an array before setting the words state.
        // If it is not an array, we set it to an empty array.
        Array.isArray(assignment.words) ? setWords([...assignment.words]) : setWords([])

    }, [assignment])

    // This is to control the visibility of the 'Lets Practice' button
    useEffect(() => {
        if (words.length > 0) {
            setHideLetsPracticeButton('')
        }
    }, [words])

    const handleGoPracticePage = () => {
        localStorage.setItem('words', JSON.stringify(words))
        navigate('/practicePage')
    }

    if (assignment)
        return (
            <div className="assignmentContainer">
                {spinner && <Spinner />}
                {errorMessage && <p className="errorMessages">{errorMessage}</p>}
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

                <Button label='Lets Practice' backgroundColor='Blue' onClick={handleGoPracticePage} hidden={hideLetsPracticeButton} />
            </div>
        )

}

export default MyAssignment;