import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import Time from '../component/Time';
import GetWords from '../component/Words';
import Header from '../component/Header';
import '../css/Dashboard.module.css';
import { sanitizeInput } from '../helpers/Helpers'

function Dashboard() {
    const [yearWords, setYearWords] = useState('year3and4words')
    const [errorMessage, setErrorsMessage] = useState('')

    const navigate = useNavigate()
     

    const handleYearWords = (e) => {
        e.preventDefault()
        const selectedYearWords = e.target.value
        if (sanitizeInput(selectedYearWords)) {
            setErrorsMessage('Invalid selection 💪💪')
            localStorage.clear()
            setTimeout(() => {
                navigate('/login')
            }, 3000)

        } else {
            setYearWords(selectedYearWords)
        }

    }
    return (
        <div>
            <Header />
            <Time />
            <h1>Dashboard</h1>
            <select onChange={handleYearWords}>
                {errorMessage && <p>{errorMessage}</p>}
                <option value='year3and4words'>Year 3 and 4 spelling words</option>
                <option value='year5and6words'>Year 5 and 6 spelling words</option>
            </select>
            <GetWords yearWords={yearWords} />
        </div>
    )

}
export default Dashboard;