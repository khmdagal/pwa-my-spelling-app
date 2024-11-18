import React, { useEffect, useState } from "react";
import Button from '../../component/Button';
import { sayTheRandomWord } from "../../helpers/Helpers";
import '../../css/PracticePage.css'

function PracticeMyAssignment() {
    const words = JSON.parse(localStorage.getItem('words'));
    const [remainedWords, setRemainedWords] = useState([...words]);
    const [usedWords, setUsedWords] = useState([]);
    const [randWord, setRandWord] = useState('');
    const [hideGetWordsButton, setHideGetWordsButton] = useState('');
    const [hideResetButton, setHideResetButton] = useState('');


    useEffect(() => {
        if (words.length === 0) {
            setRandWord('No words to practice, please get the assignment first');
            setHideGetWordsButton('hidden');
        }
    }, [words])

    //This function insures that the random word is not repeated until all the words are used
    const getRandomWordAndDelete = () => {
        if (remainedWords.length === 0) {
            setRandWord('Reset to start again');
            setHideGetWordsButton('hidden');
            setHideResetButton('');

            return;
        }

        const randomIndex = Math.floor(Math.random() * remainedWords.length);
        const randomWord = remainedWords[randomIndex];
        setRandWord(randomWord);


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
        let value = e.target.value
        if (value === randWord) {
            setTimeout(() => {
                sayTheRandomWord('Correct you get it')
                e.target.value = ''
            }, 1000)

        } else {
            setTimeout(() => {
                sayTheRandomWord('Not yet, try again')
                e.target.value = ''
            }, 1000)
        }
    }



    const resetPractice = () => {
        setRemainedWords([...words]);
        setUsedWords([]);
        setRandWord('You are ready to go');
        setHideGetWordsButton('');
    }

    // I call sayTheRandomWord function to say 'You are ready to go' when the practice is reset and instruct to reset when the practice words are finished.
    sayTheRandomWord(randWord)
    return (
        <div>
            <h3 className="title">Words Practice Page</h3>
            <p className="words">{randWord}</p>
            <input
                id="answer"
                type="text"
                placeholder="Type the word"
                onChange={checkCorrectWord}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') checkCorrectWord(e)
                }}
            />


            <div className="selectedWordsContainer">
                <p className="title">Remaining Words</p>
                {remainedWords?.map((word, index) => (
                    <div key={index} className="words">{word}</div>
                ))}
            </div>

            <div className="selectedWordsContainer">
                <p className="title">Used Words</p>
                {usedWords?.map((word, index) => (
                    <div key={index} className="words">{word}</div>
                ))}
            </div>
            <div className="buttons">
                <Button label='Get Next Word' backgroundColor='Blue' onClick={getRandomWordAndDelete} hidden={hideGetWordsButton} />
                <Button label='Reset' backgroundColor='Green' onClick={resetPractice} hidden={hideResetButton} />
                <Button label='Repeat the word' backgroundColor='Red' onClick={() => sayTheRandomWord(randWord)} />

            </div>

        </div>
    );
}

export default PracticeMyAssignment;