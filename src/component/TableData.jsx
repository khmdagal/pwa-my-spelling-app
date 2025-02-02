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

                setAssignments(response.data.assignments.reverse())

            } catch (err) {
                console.log('==>> error', err);
            }
        };

        getData()

    }, [formData])


    return (
        <table className={`${classes.table}`}>
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
                            <td className={`${classes.eachRowData}`} >{assignment.name}</td>
                            <td className={`${classes.eachRowData}`} >{assignment.description}</td>
                            <td className={`${classes.wordsTdContainer}`} >{assignment.words.map((word) => {
                                return (<span className={`${classes.eachWord}`}>{word}</span>)
                            })}</td>
                            <td className={`${classes.eachRowData}`} >{getDate(assignment.expires_in)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>)
}

export default TableData