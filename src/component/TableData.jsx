import React, { useEffect, useState } from "react";
import { getDate } from '../helpers/Helpers'

import { allOtherAxiosRequest } from '../api/axios'
import classes from '../css/Table.module.css'


function TableData({ formData }) {
    const [assignments, setAssignments] = useState([])


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await allOtherAxiosRequest.get('/api/v1/spelling/words/weeklypractice/all');

                //const assignmentData = Object.entries(response.data.result).map(el => el[1]);

                setAssignments(response.data.assignments.reverse())

            } catch (err) {
                console.log('==>> error', err);
            }
        };

        getData()

    }, [formData])


    return (<table className={`${classes.styled_table}`}>
        <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Words</th>
                <th>Due Date</th>
            </tr>
        </thead>

        <tbody>
            {assignments && assignments.map((assignment, index) => {

                return (
                    <tr key={index}>
                        <td>{assignment.name}</td>
                        <td>{assignment.description}</td>
                        <td>{assignment.words.map((word) => {
                            return (<p className="eachWord">{word}</p>)
                        })}</td>
                        <td>{getDate(assignment.expires_in)}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>)
}

export default TableData