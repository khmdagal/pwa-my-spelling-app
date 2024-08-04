import React, { useState, useEffect } from "react";
import '../css/Time.css'

const Time = () => {

    const [day, setDay] = useState("");
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setDay(now.toLocaleString('en-GB', { weekday: 'short' }));
            setDate(now.getDate());
            setMonth(now.toLocaleString('en-GB', { month: 'long' }));
            setYear(now.getFullYear());
            setHours(now.getHours().toString().padStart(2, '0'));
            setMinutes(now.getMinutes().toString().padStart(2, '0'));
            setSeconds(now.getSeconds().toString().padStart(2, '0'));
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="clock-container">
            <div className="date">
                {day}, {date} {month} {year}
            </div>
            <div className="time">
                {hours}:{minutes}:{seconds}
            </div>
        </div>
    );
}

export default Time