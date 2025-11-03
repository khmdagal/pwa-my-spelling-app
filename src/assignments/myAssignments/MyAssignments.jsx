import React, { useEffect, useState } from "react";
import { FaVolumeDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { allOtherAxiosRequest } from '../../api/axios'
import Button from "../../component/Button";
import Spinner from "../../component/Spinner";
import { sanitizeInput, sayTheRandomWord } from "../../helpers/Helpers"

import classes from '../../css/MyAssignment.module.css'

function MyAssignment() {
    const [assignment, setAssignment] = useState(undefined)
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

            if (sanitizeInput([practice_id, school_id])) {
                setErrorMessage('Invalid input 💪💪')
                localStorage.clear()
                setTimeout(() => {
                    navigate('/login')
                }, 3000)

            } else {
                setSpinner(true)
                const response = await allOtherAxiosRequest.get(`/api/v1/spelling/words/myweeklypractice/${practice_id}/${school_id}`);
                if (response.status === 200)
                    setSpinner(false)
                setAssignment(response.data.myAssignment[0].assignment)

            }

        } catch (err) {
            console.log(err)
            setErrorMessage(err.response.data.message)
            setSpinner(false)
        }
    };
    const listOfWords = assignment?.words?.map(wordObj => wordObj.word)
    console.log('List of words ===>>>', listOfWords)
    useEffect(() => {
        // We are checking if the words are an array before setting the words state.
        // If it is not an array, we set it to an empty array.
        Array.isArray(assignment?.words) ? setWords([...assignment.words]) : setWords([])

    }, [assignment])

    // This is to control the visibility of the 'Lets Practice' button
    useEffect(() => {
        if (words?.length > 0) {
            setHideLetsPracticeButton('')
        }
    }, [words])

    const handleGoPracticePage = () => {
        localStorage.setItem('words', JSON.stringify(listOfWords))
        navigate('/practicePage')
    }

    console.log('====>>>', assignment)

  
        return (
            <div className={`${classes.assignmentContainer}`}>
                {spinner && <Spinner />}
                {errorMessage && <p className={`${classes.errorMessages}`}>{errorMessage}</p>}
                <button className={`${classes.getAssignmentBtn}`} onClick={handleGetData}>Get the Assignment</button>
                <div>
                    <label htmlFor="practice_id">Enter your Assignment Code</label>
                    <input id="practice_id" name="practice_id" type="text" onChange={handleChange} />
                </div>
              {assignment && (
                 <div className={`${classes.assignmentInfo}`}>
                    <p className={`${classes.assignmentTitle}`}>
                        <strong>Assignment Title:</strong> {assignment.title}
                    </p>
                    <p className={`${classes.assignmentDescription}`}>
                        <strong>Description:</strong> {assignment.description}
                    </p>
                    {assignment.expires_in &&  (
                        <p className={`${classes.assignmentDueDate}`}>
                           <strong>Due Date:</strong> {new Date(assignment.expires_in).toLocaleDateString()}
                        </p>
                    )}
                </div>
            )}

             

                <label className={`${classes.wordsLabel}`}>Words :</label>
                <div className={`${classes.selectedWordsContainer}`}>
                    {assignment?.words?.map((el, index) => (
                        <div key={index} className={`${classes.words}`} name="words" >
                            {el.word && (
                                <div>
                                    <strong className={`${classes.word}`}>Word: {el.word}</strong>
                                </div>
                            )}
                            {Object.entries(el.example || {}).map(([key, exampleValue], exampleIndex) => (
                                <div key={exampleIndex}>
                                    <span className={`${classes.example}`}> Example {exampleIndex + 1}: {exampleValue} </span>
                                    <Button className={`${classes.practicePageBtns}`}
                                        label={<FaVolumeDown />}
                                        backgroundColor='Blue'
                                        onClick={() => sayTheRandomWord(exampleValue)}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <Button className={`${classes.practiceBtn}`} label='Lets Practice' backgroundColor='Blue' onClick={handleGoPracticePage} hidden={hideLetsPracticeButton} />
            </div>
        )

}

export default MyAssignment;