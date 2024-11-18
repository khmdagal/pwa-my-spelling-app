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




/*

import React, { useState } from "react";
import Button from '../../component/Button';

function PracticeMyAssignment({ words }) {
    const copyWords = Array.isArray(words) ? [...words] : [];

    const [remainedWords, setRemainedWords] = useState([]);
    const [usedWords, setUsedWords] = useState([]);
    const [randWord, setRandWord] = useState('');

    if (copyWords.length > 0) {

        setRemainedWords(copyWords);

    }


    const getRandomWordAndDelete = () => {
        const randomIndex = Math.floor(Math.random() * remainedWords.length);
        const randomWord = remainedWords[randomIndex];
        setRandWord(randomWord);
        remainedWords.splice(randomIndex, 1);
    };

    if (!usedWords.includes(randWord) && randWord !== '') {
        setUsedWords([...usedWords, randWord]);
    }

    console.log(remainedWords)

    return (
        <div>
            <h3 className="title">Words Practice Page</h3>
            <p className="words">{randWord}</p>
            <div className="selectedWordsContainer">
                {remainedWords?.map((word, index) => (
                    <div key={index} className="words">{word}</div>
                ))

                }
            </div>
            <div className="selectedWordsContainer">
                {usedWords?.map((word, index) => (
                    <div key={index} className="words">{word}</div>
                ))}
            </div>

            <Button label='Get word' backgroundColor='Blue' onClick={getRandomWordAndDelete} />
        </div>
    );
}

export default PracticeMyAssignment;


*/


// import React, { useState, useEffect } from "react";
// import Button from '../../component/Button'


// function PracticeMyAssignment({ assignment }) {

//     const [remainedWords, setRemainedWords] = useState(assignment.words || [])
//     const [usedWords, setUsedWords] = useState([])
//     const [randomWord, setRandomWord] = useState('')
//     const [wordsFinished, setWordsFinished]= useState('')
//     if (remainedWords) console.log("++++>>>", remainedWords)

//     const getRendomWord = () => {
//         const randomIndex = Math.floor(Math.random() * remainedWords.length)
//         const randomWord = remainedWords[randomIndex]

//         setRandomWord(randomWord)

//         if (!usedWords.includes(randomWord)) {
//             setUsedWords((previousWords) => [...previousWords, randomWord])
//         }


//         if (remainedWords?.length > 0) {
//             setRemainedWords(remainedWords?.filter(((word) => word !== randomWord)))
//         } else {
//             setWordsFinished('You have used all words')
//         }

//     }


//     useEffect(() => {

//         getRendomWord()

//     }, [assignment])

//     if (remainedWords)

//     return (
//         <div>
//             <h3>Words Practice Page</h3>
//             {/* <p className="words">{words}</p> */}
//             <p className="words">{randomWord}</p>
//              {/* <div className="selectedWordsContainer">
//                 {usedWords?.map(word => {
//                     return (<div className="words" name="words" >{word}</div>)
//                 })}
//             </div>  */}
//             <div className="selectedWordsContainer">
//                 {remainedWords?.map(word => {
//                     return (<div className="words" name="words" >{word ? word : wordsFinished}</div>)
//                 })}
//             </div>
//             <Button label='Get word' backgroundColor='Blue' onClick={getRendomWord} />
//         </div>
//     )
// }

// export default PracticeMyAssignment


/*

 console.log(copyWords)
        // Update the used words and remove the random word from remained words
       
       setUsedWords(prevUsedWords => [...prevUsedWords, randomWord]); 
        

        const updatedRemainingWords = copyWords.filter((_, index) => index !== randomIndex)
        setRemainedWords(updatedRemainingWords);
      
        
        console.log(copyWords.indexOf(randomWord));
        console.log(updatedRemainingWords)





        <div className="selectedWordsContainer">
                <p className="title">This is used words</p>
                {usedWords?.map((word, index) => (
                    <div key={index} className="words">{word}</div>
                ))}
            </div>
            <div className="selectedWordsContainer">
                <p className="title">Indices</p>
                {copyWords?.map((word, index) => (
                    <div key={index} className="words">{index}</div>
                ))}
            </div>
            <div className="selectedWordsContainer">
                <p className="title">Remaining Words</p>
                {remainedWords?.map((word, index) => (
                    <div key={index} className="words">{word}</div>
                ))}
            </div>


*/