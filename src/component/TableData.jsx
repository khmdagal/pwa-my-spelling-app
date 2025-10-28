import React, { useEffect, useState } from "react";
import { getDate } from '../helpers/Helpers'

import { allOtherAxiosRequest } from '../api/axios'
import classes from '../css/Table.module.css'


function TableData({ formData }) {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        async function fetchWords() {
            try {
                const response = await allOtherAxiosRequest.get('/api/v1/spelling/words/weeklypractice/all')

                setTableData(response.data.assignments.reverse())

            } catch (error) {
                console.log(error)
            }

        }

        fetchWords()

    }, [formData])


    return (
        <div className={`${classes.tableContainer}`}>
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
                    
                       {tableData && tableData.map((item)=>{ 
                        return (
                            <tr key={item.practice_id}>
                                <td className={`${classes.eachRowData}`} > {item.assignment.title}</td>
                                <td className={`${classes.eachRowData}`}> {item.assignment.description}</td>
                                <td className={`${classes.wordsTdContainer}`}> {item.assignment.words?.map((word)=>{
                                    return (
                                        <div className={`${classes.eachWord}`} key={word.word_id}>
                                            <strong>{word.word}</strong>
                                            <p>{word.example.example1}</p>
                                             <p>{word.example.example1}</p>
                                        </div>
                                    )
                                })}</td>
                                <td className={`${classes.eachRowData}`} >{getDate(item.assignment.expires_in)}</td>
                            </tr>
                        )
                       })}
                    
                </tbody>
            </table>
        </div>
    )
}

export default TableData
