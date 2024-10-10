import React, { useState } from 'react';

import Time from '../component/Time';
import GetWords from '../component/Words';
import Header from '../component/Header';
import '../css/Dashboard.css'

function Dashboard() {
    const [yearWords, setYearWords] = useState('year3and4words')

    const handleYearWords = (e) => {
        e.preventDefault()
        const selectedYearWords = e.target.value
        setYearWords(selectedYearWords)
    }
    return (
        <div>
            <Header />
            <Time />
            <h1>Dashboard</h1>
            <select onChange={handleYearWords}>
                <option value='year3and4words'>Year 3 and 4 spelling words</option>
                <option value='year5and6words'>Year 5 and 6 spelling words</option>
            </select>
            <GetWords yearWords={yearWords} />
        </div>
    )

}
export default Dashboard;