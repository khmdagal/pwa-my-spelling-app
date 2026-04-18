import React, { useEffect, useState, useMemo } from "react";
import { FaVolumeDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { allOtherAxiosRequest } from '../../api/axios'
import Button from "../../component/Button";
import Spinner from "../../component/Spinner";
import { sanitizeInput, sayTheRandomWord } from "../../helpers/Helpers"

import classes from '../../css/Dashboard.module.css'

function MyAssignment() {
    const [assignment, setAssignment] = useState('')
    const [practice_id, setPractice_id] = useState('')
    const [words, setWords] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const user = localStorage.getItem('user');
    const userProfile = localStorage.getItem('userProfile');

    const parsedUser = useMemo(() => {
        try { return JSON.parse(user); } catch { return null; }
    }, [user]);

    const parsedProfile = useMemo(() => {
        try { return JSON.parse(userProfile); } catch { return null; }
    }, [userProfile]);

    const school_id = parsedUser?.school_id;
    const year_id = parsedProfile?.year_id;
    const group_id = parsedProfile?.group_id;

    const navigate = useNavigate()

    const handleChange = e => {
        e.preventDefault();
        setPractice_id(e.target.value)
    }

    const getSingleAssignment = async () => {
        try {

            if (sanitizeInput([practice_id, school_id])) {
                setErrorMessage('Invalid input 💪💪')
                localStorage.clear()
                setTimeout(() => {
                    navigate('/login')
                }, 3000)

                return
            }

            setSpinner(true)
            if (!practice_id.trim()) {
                setErrorMessage('Please enter the assignment code 💪💪')
                setSpinner(false)
                return;
            }
            const response = await allOtherAxiosRequest.get(`/api/v1/spelling/words/myweeklypractice/${practice_id}/${school_id}`);
            if (response.status === 200) {
                setSpinner(false)

                setAssignment(response?.data?.myAssignment[0]?.assignment ?? "")
                setPractice_id(response?.data?.myAssignment[0]?.practice_id ?? "")
            }

        } catch (err) {
            setErrorMessage(err?.response?.data?.message || 'Something went wrong');
            setPractice_id('')
            setSpinner(false)
        }
    };

    useEffect(() => {
        const myGroupdAssignment = async () => {
            try {
                if (sanitizeInput([year_id, group_id, school_id])) {
                    setErrorMessage('Invalid input 💪💪')
                    localStorage.clear()
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000)

                } else {
                    setSpinner(true)
                    const response = await allOtherAxiosRequest.get(`/api/v1/spelling/words/weeklypractice/group/${school_id}/${year_id}/${group_id}`);
                    if (response.status === 200) {
                        setSpinner(false);
                        setPractice_id(response?.data?.myGroupAssignments[0]?.practice_id ?? "")
                        setAssignment(response?.data?.myGroupAssignments[0]?.assignment ?? "")
                    }


                }

            } catch (err) {
                setErrorMessage(err?.response?.data?.message || 'Something went wrong');
                setSpinner(false)
            }
        }


        if (school_id !== undefined && year_id !== undefined && group_id !== undefined) {
            myGroupdAssignment();
        }


    }, [school_id, year_id, group_id, navigate]);

    const listOfWords = useMemo(() => {
        return assignment?.words?.map(wordObj => wordObj.word) || []
    }, [assignment]);

    useEffect(() => {
        Array.isArray(assignment?.words) ? setWords([...assignment.words]) : setWords([])
    }, [assignment])

    const wordAssignment = useMemo(() => {
        return words
    }, [words])

    useEffect(() => {
        localStorage.setItem('words', JSON.stringify(listOfWords));
        localStorage.setItem('wordsAndExamples', JSON.stringify(words));
        localStorage.setItem('practice_id', JSON.stringify(practice_id));
    }, [listOfWords, words, practice_id]);


    return (
        <div className={`${classes.assignmentForm}`}>
            {spinner && <Spinner />}
            {errorMessage && <p className={`${classes.errorMessage}`}>{errorMessage}</p>}
            <button className={`${classes.getAssignmentBtn}`} onClick={() => getSingleAssignment(practice_id)}>Get the Assignment</button>
            <div>
                <label htmlFor="practice_id">Enter your Assignment Code</label>
                <input 
                id="practice_id" 
                name="practice_id" 
                type="text"
                value={practice_id}
                onChange={handleChange} 
                />
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
                    <div key={el.word} className={`${classes.words}`} name="words" >
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