import React, { useState, useEffect } from "react";
import classes from '../css/Time.module.css'

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
        <div className={`${classes.clock_container}`}>
            <div className={`${classes.date}`}>
                {day}, {date} {month} {year}
            </div>
            <div className={`${classes.time}`}>
                {hours}:{minutes}:{seconds}
            </div>
        </div>
    );
}

export default Time