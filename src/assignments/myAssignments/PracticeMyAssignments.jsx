import React, { useEffect, useState, useMemo } from "react";
import { v4 as uuid4 } from 'uuid';
import { MdCheckCircleOutline } from "react-icons/md";
import Button from '../../component/Button';
import { sayTheRandomWord, practiceSessionCalculations, extractwordFromExamples, sanitizeInput } from "../../helpers/Helpers";
import { allOtherAxiosRequest } from '../../api/axios';

import practicePageStyle from '../../css/PracticePage.module.css'


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
        try {
            return JSON.parse(localStorage.getItem('user'))
        } catch {
            return null
        }
    }, [])

    const practice_id = useMemo(() => {
        const practiceId = localStorage.getItem('practice_id');

        if (!practiceId || practiceId === 'undefined') return '';
        return JSON.parse(practiceId);
    }, [])

    const [remainedWords, setRemainedWords] = useState([...words]);
    const [usedWords, setUsedWords] = useState([]);
    const [startButtonLabel, setStartButtonLabel] = useState('Start')
    const [randWord, setRandWord] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const gentleEncouragement = () => {
        const sentences = [
            "Why not try first?",
            "Give it a go!",
            "Let's see an attempt.",
            "Just one try.",
            "Time to take a turn.",
            "Give it a little shot.",
            "Ready to try?",
            "How about a go?"
        ];

        const min = Math.ceil(0);
        const max = Math.floor(sentences?.length);
        const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);

        return sentences[randomIndex];
    };

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

    const getRandomWordAndDelete = async () => {

        if (remainedWords.length === 0) {
            sayTheRandomWord('You have finished all the words. Please restart again, Otherwise , Submit your answers');
            setStartButtonLabel('Restart');
            setHideGetWord(true);
            setIsInputDisabled(true);
            setRestart(false)

            if (practiceSession.length === 0 || listOfWords.length === 0) {
                await sayTheRandomWord(`COME ON, ${user?.name}, ${gentleEncouragement()}`);
                restartPractice();
            };
            return;
        }


        const randomIndex = Math.floor(Math.random() * remainedWords.length);
        const randomWord = remainedWords[randomIndex].toLowerCase();
        setRandWord(randomWord);

        if (!usedWords.includes(randomWord)) {
            setUsedWords(prevUsedWords => [...prevUsedWords, randomWord]);
        }

        setStartButtonLabel('Get New Word')
        const updatedRemainingWords = remainedWords.filter((word, index) => index !== randomIndex);
        setRemainedWords(updatedRemainingWords);
        await sayTheRandomWord(randomWord);

    };

    const formatedExamples = useMemo(() => {
        return extractwordFromExamples(randWord, wordsAndExamples)
    }, [wordsAndExamples, randWord]);

    useEffect(() => {
        setDisplayExamples(formatedExamples?.formatedExamples?.map(el => <p>{el}</p>))
    }, [formatedExamples])

    const checkCorrectWord = async (e) => {
        e.preventDefault();

        if (answer === '') {
            await sayTheRandomWord('No answer recorded')
            return
        }

        if (answer === randWord) {
            setMyScore((prev) => prev + 1)
            setChecked(<MdCheckCircleOutline />)
            setTimeout(() => {
                sayTheRandomWord('Correct ');
                setDisplayExamples(formatedExamples?.originalExample?.map(el => <p>{el}</p>));
                setChecked(null);
            }, 400);

        } else {

            setMyScore((prev) => {
                // This ensures if the score not to go negative number.
                if (prev <= 0) {
                    return prev
                } else {
                    return prev - 1
                }
            });

            setTimeout(() => {
                sayTheRandomWord('Not yet')
            }, 400);

        }

        setAnswer('');
        setPracticeSession(((prev) => [...prev, { [randWord]: answer }]));
        setListOfWords((prev) => [...prev, [randWord, answer]]);


        setTimeout(getRandomWordAndDelete, 2100);

    }

    const restartPractice = async () => {
        if (words.length > 0) {
            setRemainedWords([...words]);
        } else {
            setErrMessage('Please get your the assignment first');
        };

        setPracticeSession([]);
        setListOfWords([]);
        setUsedWords([]);
        setDisplayExamples([]);

        setRestart(true) // This is important, it stops flickering submit button

        await sayTheRandomWord('You are ready to go');
        setDisplayExamples([]);
        setIsInputDisabled(false);

        setRestart(true);
        setErrMessage('');
        setSuccessMessage('')
    }

    const handleCheck = (e) => {
        e.preventDefault()
        let value = e.target.value;
        value = value.toLowerCase();
        setAnswer(value)

        if (sanitizeInput(value)) {
            setErrMessage('Invalid Input')

        } else {
            setAnswer(value)
            setErrMessage('')
        }
    }

    useEffect(() => {
        if (practiceSession.length === usedWords.length && remainedWords.length === 0) {
            setIsInputDisabled(true)
            setRestart(false)
            setAllSessions(((prev) => [...prev, practiceSession]))
        } else {
            setIsInputDisabled(false)

        }
    }, [practiceSession, usedWords, remainedWords])

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
        try {
            if (sanitizeInput(formData)) {
                setErrMessage('Invalid Input')
                return
            }

            const response = await allOtherAxiosRequest.post(`/api/v1/spelling/practicesSessions/createSession`, formData)

            if (response.status === 201) {
                setSuccessMessage('🏆 Well done 💪');
                await sayTheRandomWord(`Good Job, ${user?.name},  KEEP UP`)

                setAllSessions([])
                setMyScore(0)
                setPracticeSession([])
                setFormData({ session_id: '', practice_id: '', school_id: '', sessionData: {}, sessionScore: 0 });

                restartPractice()
            }
        } catch (error) {
            setErrMessage('Please try again !')
        }
    }

    const displayExamplesSection = () => {
        if (startButtonLabel === 'Get New Word') {
            return <div>
                <div className={`${practicePageStyle.examplesBox}`}>
                    {displayExamples ? displayExamples : formatedExamples?.formatedExamples?.map(el => {
                        return (
                            <div>
                                <p>{el} </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        } else {
            return null
        }

    }
    const displayAndAnswersSection = () => {
        if (practiceSession.length >= 1) {
            return <div className={practicePageStyle.wordsAndAnswersContainer}>

                {listOfWords?.map((word) => {
                    return (
                        <div className={`${practicePageStyle.correctWordsContainer}`}>
                            <p>{
                                (word[1] === word[0]) ?
                                    <div>
                                        <p> ✅ </p>
                                        <p> {word[1]} </p>
                                    </div>
                                    :
                                    <div>
                                        <p className={`${practicePageStyle.wrongAnswerRedLight}`}> 🚨 </p>
                                        <p className={`${practicePageStyle.wrongAnswer}`}> {word[1]} </p>
                                        <p>⬇️</p>
                                        <p>{word[0]}</p>
                                    </div>
                            }</p>
                        </div>
                    );
                })}
            </div>
        } else {
            return null
        }

    }

    return (

        <div className={`${practicePageStyle.mainContainer}`}>

            <h1 className={`${practicePageStyle.title}`}>Practice Page</h1>
            {checked && <h1 style={{ color: "gold" }}>{checked}</h1>}
            {errMessage ? <h1 style={{ color: 'red' }}>{errMessage}</h1> : <h1 style={{ color: 'green' }}>{successMessage}</h1>}

            {
                practice_id === null ||
                    practice_id === undefined ||
                    practice_id === ''
                    ? null
                    :
                    <div className={`${practicePageStyle.answerBoxAndButtonsContainer}`}>
                        {myScore && <h1 style={{ color: "gold" }}>Your Score: <strong> {myScore} </strong></h1>}
                        <div className={`${practicePageStyle.answerBox}`}>

                            <input
                                id="answer"
                                type="text"
                                placeholder="Write your Answer here"
                                value={answer}
                                onChange={handleCheck}
                                onKeyDown={(e) => e.key === 'Enter' && checkCorrectWord(e)}
                                required
                                disabled={isInputDisabled}
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                            />
                            <Button className={`${practicePageStyle.checkAnswerButton}`} color="black" label='Check' backgroundColor='lightgreen' onClick={checkCorrectWord} />
                        </div>

                        <div className={`${practicePageStyle.practicePageBtnsContainer}`}>
                            <Button className={`${practicePageStyle.newWordButton}`} label={startButtonLabel} backgroundColor='#3b82f6' onClick={getRandomWordAndDelete} hidden={hideGetWord} />
                            <Button className={`${practicePageStyle.restButton}`} label='Reset ' backgroundColor='#10b981' onClick={restartPractice} hidden={restart} />
                            <Button className={`${practicePageStyle.repeatButton}`} label='Repeat' backgroundColor='#f59e0b' onClick={() => sayTheRandomWord(randWord)} hidden={hideGetWord} />
                            <Button className={`${practicePageStyle.submitButton}`} label='Submit' backgroundColor='#8b5cf6' onClick={handleSubmint} hidden={restart} />
                        </div>

                        <div> {displayExamplesSection()} </div>
                        <div> {displayAndAnswersSection()}</div>
                    </div>
            }

        </div>
    );
}

export default PracticeMyAssignment;