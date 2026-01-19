import React, { useEffect, useState } from "react";
import classes from '../css/Table.module.css';

function TableData({ formData }) {
    const [tableData, setTableData] = useState([]);
    const [searchInfo, setsearchInfo]=  useState(false)
    



    const filterData = (e) =>{
         e.preventDefault()
        const value = e.target.value.toLowerCase()
      

        setsearchInfo(formData.filter(el =>{
        return(
             el.practice_id?.toLowerCase().includes(value) ||
             el.assignment.title?.toLowerCase().includes(value) ||
             el.assignment.description?.toLowerCase().includes(value) ||
             el.assignment.description?.toLowerCase().includes(value) ||
             el.assignment.words?.some(word =>{
                return (
                    word.word?.toLowerCase().includes(value)
                )
             })
        )
       
       }))

    }

    useEffect(() => {
        setTableData(searchInfo? searchInfo: formData);
    }, [formData, searchInfo]);



    return (
        <div className={`${classes.tableContainer}`}>

           <div className={`${classes.searchBar}`}>
            <strong>Search</strong> 
            <input name="search" onChange={filterData}/>
            </div> 

            <table className={`${classes.table}`}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Words & Examples</th>
                        <th>Due Date</th>
                        <th>Assignment ID</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item) => (
                        <tr key={item.practice_id}>
                            <td className={`${classes.eachRowData}`}> 
                                {item.assignment.title}
                            </td>
                            <td className={`${classes.eachRowData}`}> 
                                {item.assignment.description}
                            </td>
                            <td className={`${classes.wordsTdContainer}`}> 
                                {item.assignment.words?.map((word) => (
                                    <div className={`${classes.eachWord}`} key={word.word_id}>
                                        <strong>{word.word}</strong>
                                        <p className={`${classes.examples}`}>{word.example.example1}</p>
                                        <p className={`${classes.examples}`}>{word.example.example2}</p> 
                                    </div>
                                ))}
                            </td>
                            <td className={`${classes.eachRowData}`}>
                                {item.assignment.expires_in}
                            </td>
                            <td>{item.practice_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableData;
