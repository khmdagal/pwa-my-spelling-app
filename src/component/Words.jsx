import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { allOtherAxiosRequest } from '../api/axios';
import Button from '../component/Button';
import { sanitizeInput } from '../helpers/Helpers'
import Example from './Example';

import classes from '../css/Words.module.css'

function Words({ onSelectedWordsChange}) {
    const [wordsData, setWordsData] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedWords, setSelectedWords] = useState([])
    const [showHide, setShowHide] = useState(true)
    const [yearWords, setYearWords] = useState('y3and4words')
    

    const navigate = useNavigate()

    const handleYearWords = (e) => {
        e.preventDefault()
        const selectedYearWords = e.target.value
        if (sanitizeInput(selectedYearWords)) {
            setErrorMessage('Invalid selection 💪💪')
            localStorage.clear()
            setTimeout(() => {
                navigate('/login')
            }, 3000)

        } else {
            setYearWords(selectedYearWords)
        }

    }


    useEffect(() => {
        async function fetchWords() {
            try {
                const response = await allOtherAxiosRequest.get(`api/v1/spelling/words/${yearWords}`)
                setWordsData(response.data.words)
            } catch (error) {
                console.log(error)
                setErrorMessage(error.response.data.message)
            }
        }
        fetchWords()
    }, [yearWords])

    const handleCheckboxChange = (e, wordObj) => {
        const isChecked = e.target.checked;
        setSelectedWords((previous) =>
            isChecked ?
                [...previous, wordObj]
                : previous.filter((word) => word.word_id !== wordObj.word_id)
        );
    }

    // checkbox stay checked after rerender
    const isWordSelected = (word_id) => {
        return selectedWords.some(word => word.word_id === word_id);
    }
    // send selected words to SetAssignment component
    useEffect(() => {
            onSelectedWordsChange(selectedWords);
    }, [selectedWords, onSelectedWordsChange]);
   
    
    
    if (!wordsData) <p>...loading</p>

    // Sort words before displying them
    wordsData.sort((a, b) => a.word_id - b.word_id)


    return (

        <div className={`${classes.mainContainer}`}>
            <div className={`${classes.wordsContainer}`}>
                <select onChange={handleYearWords}>
                    {errorMessage && <p>{errorMessage}</p>}
                    <option value='y3and4words'>Year 3 and 4 spelling words</option>
                    <option value='y5and6words'>Year 5 and 6 spelling words</option>
                </select>
                <h1>Words for {yearWords}</h1>
                <Button type='button' className={`${classes.showHideButton}`} backgroundColor='#04AA6D' label={`${showHide ? 'Hide Words' : 'Show Words'}`} onClick={() => setShowHide((prev) => !prev)} />

                <div className={`${classes.word_list}`} style={{ display: `${showHide ? 'grid' : 'none'}` }}>

                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {wordsData?.map(word => (
                        <div className={`${classes.word_container}`} key={word.word_id}>
                            <input
                                type="checkbox"
                                id={word.word_id}
                                checked={isWordSelected(word.word_id)}
                                onChange={(e) => {
                                    handleCheckboxChange(e, {
                                        word_id: word.word_id,
                                        word: word.word,
                                        example: word.example
                                    })
                                }}
                            />
                            <label htmlFor={word.word_id}>
                                {word.word_id}: {word.word}
                            </label>
                            <br />

                            <Example word_id={word.word_id} existingExamples={word.example} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );


}

export default Words;