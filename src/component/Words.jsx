import { useState, useEffect } from 'react';
import { allOtherAxiosRequest } from '../api/axios';
import Button from '../component/Button';
import Example from './Example';

import classes from '../css/Words.module.css'

function Words({ onSelectedWordsChange }) {
    const [wordsData, setWordsData] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedWords, setSelectedWords] = useState([])
    const [showHide, setShowHide] = useState(true)
    const [yearWords, setYearWords] = useState('y3and4words');
    const [wordsTtitle, setWordsTtitle] = useState('')
    const [sortedWordsData, setSortedWordsData] = useState([])
    const [search, setSearch] = useState('');
    const [searchedWords, setSearchedWords] = useState([])

    const handleYearWords = (e) => {
        const selectedYearWords = e.target.value
        setYearWords(selectedYearWords)
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
        fetchWords();

        /*
        Keep tracking first state on rendering, and 
        taking the advantage of using one useEffect hook
        */
        switch (yearWords) {
            case 'yr1words':
                setWordsTtitle('Year 1 Words')
                break;

            case 'yr2words':
                setWordsTtitle('Year 2 Words')
                break;

            case 'y3and4words':
                setWordsTtitle('Year 3 and 4 Words')
                break;

            case 'y5and6words':
                setWordsTtitle('Year 5 and 6 Words')
                break;

            default:
                setWordsTtitle('yr1words')
                break;
        };
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


    useEffect(() => {
        // Sort words before displying them
        setSortedWordsData(wordsData.sort((a, b) => a.word_id - b.word_id))

    }, [wordsData])


    
    const handleSearch = (e) => {
        const searchedValue = e.target.value.toLowerCase();
        setSearch(searchedValue)
    }


    useEffect(() => {
        setSearchedWords(sortedWordsData.filter((el) => {
            return el.word.toLowerCase().includes(search) ? el : null
        }));


    }, [sortedWordsData, search, wordsTtitle]);

    if (!wordsData) <p>...loading</p>
    return (

        <div className={`${classes.mainContainer}`}>
            <div className={`${classes.wordsContainer}`}>
                <label>What year words?</label>
                <select
                    value={yearWords}
                    onChange={handleYearWords}
                >
                    {errorMessage && <p>{errorMessage}</p>}
                    <option value='yr1words'>Year 1 Words</option>
                    <option value='yr2words'>Year 2 Words</option>
                    <option value='y3and4words'>Year 3 and 4 Words</option>
                    <option value='y5and6words'>Year 5 and 6 Words</option>
                </select>

                <label>Search Box</label>
                <input
                    type='text'
                    value={search}
                    placeholder='Type the word here'
                    onChange={handleSearch}
                />


                <h2>{wordsTtitle}</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {(searchedWords.length === 0 && search.trim() !== "") ? <b style={{ color: 'red' }}>{`➡️ " ${search} " is not in ${wordsTtitle}`}</b> : ''}
                <Button type='button' className={`${classes.showHideButton}`} backgroundColor='white' label={`${showHide ? '❎ Hide' : '✅ Show'}`} onClick={() => setShowHide((prev) => !prev)} />

                <div className={`${classes.word_list}`} style={{ display: `${showHide ? 'grid' : 'none'}` }}>

                    {(searchedWords.length > 0 ? searchedWords : [])?.map(word => (
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