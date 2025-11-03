import React, { useEffect, useState } from "react";
import Button from '../../component/Button';
import { sayTheRandomWord } from "../../helpers/Helpers";

import classes from '../../css/PracticePage.module.css'

function PracticeMyAssignment() {
    const words = JSON.parse(localStorage.getItem('words'));
    const [remainedWords, setRemainedWords] = useState([...words]);
    const [usedWords, setUsedWords] = useState([]);
    const [randWord, setRandWord] = useState('');
    const [hideGetWordsButton, setHideGetWordsButton] = useState('');
    const [hideResetButton, setHideResetButton] = useState('');
    const [answer, setAnswer] = useState('')


    useEffect(() => {
        if (words.length === 0) {
            sayTheRandomWord('No words found to practice, please get the assignment first');
            setHideGetWordsButton('hidden');
        }
    }, [words])

    //This function insures that the random word is not repeated until all the words are used
    const getRandomWordAndDelete = () => {
        if (remainedWords.length === 0) {
            sayTheRandomWord('You have finished all the words, please reset to start again');
            setHideGetWordsButton('hidden');
            setHideResetButton('');

            return;
        }

        const randomIndex = Math.floor(Math.random() * remainedWords.length);
        const randomWord = remainedWords[randomIndex];
        setRandWord(randomWord.toLowerCase());


        if (!usedWords.includes(randomWord)) {
            setUsedWords(prevUsedWords => [...prevUsedWords, randomWord]);
        }


        const updatedRemainingWords = remainedWords.filter((word, index) => index !== randomIndex);
        setRemainedWords(updatedRemainingWords);

        sayTheRandomWord(randomWord)

        //This is to hide the reset button when practice is started again
        setHideResetButton('hidden');

    };

    const checkCorrectWord = (e) => {
        e.preventDefault()
        if (answer === randWord) {
            console.log('Correct')
            setTimeout(() => {
                sayTheRandomWord('Correct, you get it')
            }, 1000)

        } else {
            setTimeout(() => {
                sayTheRandomWord('Not yet, try again')
            }, 1000)

        }
        setAnswer('')
        
        setTimeout(() => {
            getRandomWordAndDelete()
        }, 1500)

    }

    const resetPractice = () => {
        setRemainedWords([...words]);
        setUsedWords([]);
        sayTheRandomWord('You are ready to go');
        setHideGetWordsButton('');
    }
    const handleCheck = (e) => {
        e.preventDefault()
        let value = e.target.value;
        value = value.toLowerCase();
        setAnswer(value)
    }

    return (
        <>
            <div className={`${classes.mainContainer}`}>

                <h1 className={`${classes.title}`}>Practice Page</h1>

                <div className={`${classes.answerBox}`}>

                    <input
                        id="answer"
                        type="text"
                        placeholder="Write your Answer here"
                        value={answer}
                        onChange={handleCheck}
                        onKeyDown={(e) => e.key === 'Enter' && checkCorrectWord(e)}
                    />
                    <Button color="black" label='Check' backgroundColor='' onClick={checkCorrectWord} />
                </div>

                <div className={`${classes.practicePageBtnsContainer}`}>
                    <Button className={`${classes.practicePageBtns}`} label='Get Next Word' backgroundColor='Blue' onClick={getRandomWordAndDelete} hidden={hideGetWordsButton} />
                    <Button className={`${classes.practicePageBtns}`} label='Reset' backgroundColor='Green' onClick={resetPractice} hidden={hideResetButton} />
                    <Button className={`${classes.practicePageBtns}`} label='Repeat the word' backgroundColor='Red' onClick={() => sayTheRandomWord(randWord)} hidden={hideGetWordsButton}/>

                </div>

            </div>
        </>

    );
}

export default PracticeMyAssignment;