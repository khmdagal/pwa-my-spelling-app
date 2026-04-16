import React, { useState, useEffect, useMemo } from 'react';
import { allOtherAxiosRequest } from '../../api/axios';
import { organiseStudentPracticeRecord } from '../../helpers/Helpers'

import classes from '../../css/StudentRecord.module.css';

function StudentsRecord() {

    const [studentsRecord, setStudentsRecord] = useState([]);
    const [allowedInCorrectPercentage, setAllowedInCorrectPercentage] = useState(5);
    const [practiceTitleOptions, setpracticeTitleOptions] = useState([]);
    const [practiceTitles, setPracticeTitles] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchStudentsRecord = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await allOtherAxiosRequest.get(`/api/v1/spelling/practicesSessions/activities`);
                if (response.status === 200) {
                    setStudentsRecord(response.data.activityData);
                }
            } catch (error) {
                setErrorMessage('Failed to fetch students record. Please try again later.');
            }
        };

        fetchStudentsRecord();
    }, []);


    const groupedAndOrgnisedStudentData = useMemo(() => {
        const data = organiseStudentPracticeRecord(allowedInCorrectPercentage, studentsRecord);
        const groupedData = Object.entries(data);

        setPracticeTitles(groupedData.map((el) => el[0].split('*')[1]));

        if (filtered) {
            return groupedData.filter((el) => el[0].split('*')[1] === practiceTitleOptions);
        } else {
            return groupedData;
        }

    }, [allowedInCorrectPercentage, studentsRecord, practiceTitleOptions, filtered])


    const handlePracticeTitleFilter = (e) => {
        const selectedPracticeTitle = e.target.value;
        setpracticeTitleOptions(selectedPracticeTitle);
        if (selectedPracticeTitle === "all" || selectedPracticeTitle === "") {
            setFiltered(false);
        } else {
            setFiltered(true);
        };
    };

    return (
        <div className={classes.container}>
            {errorMessage && <p className={`${classes.errorMessages}`}>{errorMessage}</p>}
            <h1 className={classes.title}>Students Record</h1>
            <div className={`${classes.filtersContainer}`}>
                <div className={`${classes.filterGroup}`}>
                    <label className={`${classes.filterLabel}`}>Filter by Practice Title:</label>
                    <select
                        className={`${classes.SelectDropdown}`}
                        value={practiceTitleOptions}
                        onChange={(e) => handlePracticeTitleFilter(e)}

                    >
                        <option value="">🔎 Select Practice 🔎</option>
                        <option value="all">All Practices</option>
                        {practiceTitles?.map((option) => {
                            return (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className={`${classes.filterGroup}`}>
                    <label className={`${classes.filterLabel}`}>Mistake Rate:</label>
                    <select
                        className={`${classes.SelectDropdown}`}
                        value={allowedInCorrectPercentage}
                        onChange={(e) => setAllowedInCorrectPercentage(e.target.value)}
                    >
                        {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((percentage) => (
                            <option key={percentage} value={percentage}>
                                {percentage}%
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {

                groupedAndOrgnisedStudentData.map((el) => {
                    return (
                        <div key={el[0].split('*')[0]} className={`${classes.practiceContainer}`}>

                            <details className={`${classes.practiceDetails}`}>
                                <summary className={`${classes.practiceSummary}`}>
                                    Title: {el[0].split('*')[1]}
                                </summary>
                                <h3 className={`${classes.studentsTitle}`}>Students:</h3>
                                <ul className={`${classes.studentsList}`}>
                                    {Object.entries(el[1]).map((student) => {
                                        return (
                                            <details key={student[0]} className={`${classes.studentDetails}`}>
                                                <summary className={`${classes.studentSummary}`}>
                                                    {student[0]} {student[1]?.focusWord ? `- Word to focus on: ${student[1]?.focusWord}` : ''}
                                                </summary>
                                                <table className={`${classes.activityTable}`}>
                                                    <thead>
                                                        <tr>
                                                            <th>Word</th>
                                                            <th>Attempts</th>
                                                            <th>Go Right</th>
                                                            <th>Not Yet</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Object.entries(student[1]?.activity).map((activity) => {
                                                                return (
                                                                    <tr key={activity[0]}>
                                                                        <td>{activity[0]}</td>
                                                                        <td>{activity[1]?.attempts}</td>
                                                                        <td>{activity[1]?.correct}</td>
                                                                        <td>{activity[1]?.inCorrect}</td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </details>
                                        );
                                    })}
                                </ul>
                            </details>
                        </div>
                    );
                })
            }
        </div>
    );

}

export default StudentsRecord;