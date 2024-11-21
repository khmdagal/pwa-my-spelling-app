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
    const [answer, setAnswer] = useState('')


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
        if (answer === randWord) {
            console.log('Correct you get it')
            setTimeout(() => {
                sayTheRandomWord('Correct you get it')
            }, 1000)
        } else {
            console.log('Not yet, try again')
            setTimeout(() => {
                sayTheRandomWord('Not yet, try again')
            }, 1000)
        }

        setAnswer('')
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
        <div className="mainContainer">
            <h1 className="title">Practice Page</h1>

            <div className="answerBox">

                <input
                    id="answer"
                    type="text"
                    placeholder="Write your Answer here"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkCorrectWord(e)}
                />
                <Button color="black" label='Check' backgroundColor='' onClick={checkCorrectWord} />
            </div>

            <div className="practicePageBtnsContainer">
                <Button className="practicePageBtns" label='Get Next Word' backgroundColor='Blue' onClick={getRandomWordAndDelete} hidden={hideGetWordsButton} />
                <Button className="practicePageBtns" label='Reset' backgroundColor='Green' onClick={resetPractice} hidden={hideResetButton} />
                <Button className="practicePageBtns" label='Repeat the word' backgroundColor='Red' onClick={() => sayTheRandomWord(randWord)} />

            </div>

        </div>
    );
}

export default PracticeMyAssignment;