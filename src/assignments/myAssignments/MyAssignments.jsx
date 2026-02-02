import React, { useEffect, useState, useMemo } from "react";
import { FaVolumeDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { allOtherAxiosRequest } from '../../api/axios'
import Button from "../../component/Button";
import Spinner from "../../component/Spinner";
import { sanitizeInput, sayTheRandomWord } from "../../helpers/Helpers"

import classes from '../../css/Dashboard.module.css'

function MyAssignment() {
    const [assignment, setAssignment] = useState(undefined)
    const [practice_id, setPractice_id] = useState('')
    const [words, setWords] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const user = localStorage.getItem('user');
    const school_id = JSON.parse(user)?.school_id;


    const navigate = useNavigate()

    const handleChange = e => {
        e.preventDefault();
        setPractice_id(e.target.value)

    }

       const handleGetData = async (practice_id) => {
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
       


        const listOfWords = assignment?.words?.map(wordObj => wordObj.word) || [];


        useEffect(() => {
            Array.isArray(assignment?.words) ? setWords([...assignment.words]) : setWords([])
        }, [assignment])


      const wordAssignment = useMemo(()=>{
        return words
      },[words])



            localStorage.setItem('words', JSON.stringify(listOfWords))
            localStorage.setItem('wordsAndExamples', JSON.stringify(words))
            localStorage.setItem('practice_id', JSON.stringify(practice_id))
        

        return (
            <div className={`${classes.assignmentForm}`}>
                {spinner && <Spinner />}
                {errorMessage && <p className={`${classes.errorMessages}`}>{errorMessage}</p>}
                <button className={`${classes.getAssignmentBtn}`} onClick={()=> handleGetData(practice_id)}>Get the Assignment</button>
                <div>
                    <label htmlFor="practice_id">Enter your Assignment Code</label>
                    <input id="practice_id" name="practice_id" type="text" onChange={handleChange} />
                </div>
                {assignment && (
                    <div className={`${classes.assignmentInfo}`}>
                        <div> 
                            <label>Title</label>
                             <p>{assignment.title}</p>
                        </div>
                       
                        <div> 
                            <label>Description</label>
                            <p>{assignment.description}</p>
                        </div>
                        
                        <div> 
                            <label>Due Date</label>
                            <p>{assignment.expires_in && (new Date(assignment.expires_in).toLocaleDateString())}</p>
                        </div>
                        
                    </div>
                )}
                <label className={`${classes.wordsLabel}`}>Words :</label>
                <div className={`${classes.selectedWordsContainer}`}>
                    {wordAssignment?.map((el, index) => (
                        <div key={index} className={`${classes.words}`} name="words" >
                            {el.word && (
                                <div>
                                    <strong className={`${classes.word}`}>{el.word}</strong>
                                </div>
                            )}
                            {Object.entries(el.example || {}).map(([key, exampleValue], exampleIndex) => (
                                <div key={exampleIndex}>
                                    <p className={`${classes.example}`}> {exampleValue} </p>
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

            </div>
        )

    }

export default MyAssignment;