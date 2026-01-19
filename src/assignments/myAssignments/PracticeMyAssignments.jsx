import React, { useEffect, useState, useMemo } from "react";
import { v4 as uuid4 } from 'uuid';
//import { FaVolumeDown } from 'react-icons/fa';
import { MdCheckCircleOutline } from "react-icons/md";
import Button from '../../component/Button';
import { sayTheRandomWord, practiceSessionCalculations, extractwordFromExamples, sanitizeInput } from "../../helpers/Helpers";
import { allOtherAxiosRequest } from '../../api/axios'

import classes from '../../css/PracticePage.module.css'




function PracticeMyAssignment() {

    const words = useMemo(() => {
        const myWords = localStorage.getItem('words') 
        return myWords ? JSON.parse(myWords) : [];
    }, [])

    const wordsAndExamples = useMemo(() => {
        const examples = localStorage.getItem('wordsAndExamples')
        return examples ? JSON.parse(examples) : [];
    }, [])
    const user = useMemo(() => {
        return JSON.parse(localStorage.getItem('user'))
    }, [])

    const practice_id = useMemo(() => {
        return JSON.parse(localStorage.getItem('practice_id'))
    }, [])

    const [remainedWords, setRemainedWords] = useState([...words]);
    const [usedWords, setUsedWords] = useState([]);
    const [randWord, setRandWord] = useState('');
    const [errMessage, setErrMessage] = useState('')

    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [restart, setRestart] = useState(true);
    const [hideGetWord, setHideGetWord] = useState(true)

    const [answer, setAnswer] = useState('')
    const [myScore, setMyScore] = useState(0)
    const [checked, setChecked] = useState('')
    const [displayExamples, setDisplayExamples] = useState([])
    const [practiceSession, setPracticeSession] = useState([])
    const [allSessions, setAllSessions] = useState([]);
    const [formData, setFormData] = useState({ session_id: '', practice_id: '', school_id: '', sessionData: {}, sessionScore: 0 })

    const [listOfWords, setListOfWords] = useState([])
    const [listOfAnswers, setListOfAnswers] = useState([])



    useEffect(() => {
        if (words.length === 0) {
            setErrMessage('Please get the assignment first')
            setHideGetWord(true);
            setPracticeSession([]);
            setDisplayExamples([])
        }

        if (remainedWords.length > 0) {
            setHideGetWord(false);
        }
    }, [words, remainedWords])


    const getRandomWordAndDelete = () => {
        if (remainedWords.length === 0) {
            sayTheRandomWord('You have finished all the words, please reset to start again');
            setHideGetWord(true);
            return;
        }

        const randomIndex = Math.floor(Math.random() * remainedWords.length);
        const randomWord = remainedWords[randomIndex].toLowerCase();
        setRandWord(randomWord);

        if (!usedWords.includes(randomWord)) {
            setUsedWords(prevUsedWords => [...prevUsedWords, randomWord]);
        }

        const updatedRemainingWords = remainedWords.filter((word, index) => index !== randomIndex);
        setRemainedWords(updatedRemainingWords);
        sayTheRandomWord(randomWord)
    };


    const formatedExamples = useMemo(() => {
        return extractwordFromExamples(randWord, wordsAndExamples)
    }, [wordsAndExamples, randWord]);


    useEffect(() => {
        setDisplayExamples(formatedExamples?.formatedExamples?.map(el => <p>{el}</p>))
    }, [formatedExamples])

    const checkCorrectWord = (e) => {
        e.preventDefault()

        if (answer === randWord) {
            setMyScore((prev) => prev + 1)
            setChecked(<MdCheckCircleOutline />)
            setTimeout(() => {
                sayTheRandomWord('Correct ')
                setDisplayExamples(formatedExamples?.originalExample?.map(el => <p>{el}</p>))
                setChecked(null)
            }, 400)

        } else {
            setMyScore((prev) => prev - 1)
            setTimeout(() => {
                sayTheRandomWord('Not yet')
            }, 400)

        }

        setAnswer('')
        setPracticeSession(((prev) => [...prev, { [randWord]: answer }]))
        setListOfWords((prev) => [...prev, randWord])
        setListOfAnswers((prev) => [...prev, answer])

        setTimeout(getRandomWordAndDelete, 1500)

    }

    const restartPractice = () => {
        if (words.length > 0) {
            setRemainedWords([...words]);
        } else {
            setErrMessage('Please get your the assignment first')
        }

        setPracticeSession([]);
        setListOfAnswers([])
        setListOfWords([])
        setUsedWords([]);

        sayTheRandomWord('You are ready to go');
        setDisplayExamples([])
        setIsInputDisabled(false)

        setRestart(true)
        setErrMessage('')
    }

    const handleCheck = (e) => {
        e.preventDefault()
        let value = e.target.value;
        value = value.toLowerCase();
        setAnswer(value)

        if(sanitizeInput(value)){
            setErrMessage('Invalid Input')
            
        }else{
            setAnswer(value)
            setErrMessage('')
        }
    }

   useEffect(()=>{
     if (practiceSession.length === usedWords.length && remainedWords.length === 0) {
            setIsInputDisabled(true)
            setRestart(false)
            setAllSessions(((prev) => [...prev, practiceSession]))
        } else {
            setIsInputDisabled(false)

        }
   },[practiceSession, usedWords, remainedWords])


    const calculatedData = useMemo(() => {
        return practiceSessionCalculations(allSessions)
    }, [allSessions])

    const values = Object.values(calculatedData)
    const score = useMemo(() => {
        return values.reduce((acc, cur) => acc += cur.wordScore, 0)
    }, [values])


    useEffect(() => {
        const newSessionId = uuid4();
        setFormData((prev) => ({
            ...prev,
            session_id: newSessionId,
            practice_id: practice_id,
            school_id: user?.school_id,
            sessionData: calculatedData,
            sessionScore: myScore,
        }));

    }, [calculatedData, score, myScore, user, practice_id])

    const handleSubmint = async () => {
        if(sanitizeInput(formData)){
            setErrMessage('Invalid Input')
            return
        }
        
        const response = await allOtherAxiosRequest.post(`/api/v1/spelling/practicesSessions/createSession`, formData)

        if (response.status === 201) {
            setErrMessage('Well done you have submitted your practice GOOD JOOOOOB')
            setAllSessions([])
            setMyScore(0)
            setPracticeSession([])
            setFormData({ session_id: '', practice_id: '', school_id: '', sessionData: {}, sessionScore: 0 })
        }
        
    }

    return (

        <div className={`${classes.mainContainer}`}>

            <h1 className={`${classes.title}`}>Practice Page</h1>
            {checked && <h1 style={{ color: "gold" }}>{checked}</h1>}
            {myScore && <h1 style={{ color: "gold" }}>{myScore}</h1>}
            {errMessage && <h1 style={{ color: 'red' }}>{errMessage}</h1>}

            <div className={`${classes.answerBox}`}>

                <input
                    id="answer"
                    type="text"
                    placeholder="Write your Answer here"
                    value={answer}
                    onChange={handleCheck}
                    onKeyDown={(e) => e.key === 'Enter' && checkCorrectWord(e)}
                    required
                    disabled={isInputDisabled}
                />
                <Button color="black" label='Check' backgroundColor='' onClick={checkCorrectWord} />
            </div>

            <div className={`${classes.examplesBox}`}>

                {displayExamples ? displayExamples : formatedExamples?.formatedExamples?.map(el => {
                    return <div>
                        <p>{el} </p>
                    </div>
                })}

            </div>

            <div className={`${classes.wordsBox}`}>
                {listOfWords?.map((word) => {
                    return <strong>{word}</strong>
                })}
            </div>
            <div className={`${classes.wordsBox}`}>
                {listOfAnswers?.map((word) => {
                    return <strong>{word}</strong>
                })}
            </div>

            <div className={`${classes.practicePageBtnsContainer}`}>
                <Button className={`${classes.practicePageBtns}`} label='Get Next Word' backgroundColor='Blue' onClick={getRandomWordAndDelete} hidden={hideGetWord} />
                <Button className={`${classes.practicePageBtns}`} label='Reset' backgroundColor='Green' onClick={restartPractice} hidden={restart} />
                <Button className={`${classes.practicePageBtns}`} label='Repeat the word' backgroundColor='Red' onClick={() => sayTheRandomWord(randWord)} hidden={hideGetWord} />
                <Button label='Submit' backgroundColor='blue' onClick={handleSubmint} />
            </div>
        </div>
    );
}

export default PracticeMyAssignment;