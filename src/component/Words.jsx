import { useState, useEffect } from 'react';
import { allOtherAxiosRequest } from '../api/axios';

import '../css/Words.css'

function GetWords({yearWords}) {
    const [wordsData, setWordsData] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedWords, setSelectedWords] = useState([])


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

    if (!wordsData) <p>...loading</p>
    
    return (
        <div className="word-list">
            <>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {selectedWords && <p style={{ color: 'black' }}>{selectedWords}</p>}
            {wordsData?.map(word => (
                <div className="word-container" key={word.word_id}>
                    <input
                        type="checkbox"
                        onClick={(e) => {
                            const checkedWords = e.target.value;
                            const isChecked = e.target.checked;
                            setSelectedWords((previous) =>
                                isChecked ?
                                    [...previous, checkedWords]
                                    : previous.filter((word) => word !== checkedWords)
                            );
                        }}
                        id={word.word_id}
                        value={word[yearWords]}
                    />
                    <label htmlFor={word.word_id}>
                        {word.word_id}: {word[yearWords]}
                    </label>
                </div>
            ))}
            </>
        </div>
    );


}

export default GetWords;