import React, { useState } from "react";
import { allOtherAxiosRequest } from '../../api/axios'

function MyAssignment() {
   const [words, setWords] = useState([])
    const [practice_id, setPractice_id] = useState('')

    const school_id = localStorage.getItem('school_id');

    const handleChange = e => {
        e.preventDefault();
        setPractice_id(e.target.value)

    }

    const handleGetData = async () => {
        try {
            console.log({practice_id},{school_id})
            const response = await allOtherAxiosRequest.get(`/api/v1/spelling/words/myweeklypractice/${practice_id}/${school_id}`);
            setWords(response.data.myAssignment[0].words)
            console.log({ response })
        } catch (err) {
            console.log('==>> error', err.message);
        }
    };

    if(words) console.log({words})
    
    return (
        <div>
            <button onClick={handleGetData}>Get the Assignment</button>
            <input name="practice_id" type="text" onChange={handleChange} />
            <p>{practice_id }</p>
            {words?.map((word) => {
                return (<p>{word}</p>)
            })}
        </div>
    )

}

export default MyAssignment;