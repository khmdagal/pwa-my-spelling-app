import React, { useEffect, useState } from "react";
import tableDataPageStyle from '../css/Table.module.css';

function TableData({ formData }) {
    const [tableData, setTableData] = useState([]);
    const [searchInfo, setsearchInfo] = useState(false)

    const filterData = (e) => {
        e.preventDefault()
        const value = e.target.value.toLowerCase()

        setsearchInfo(formData.filter(el => {
            return (
                el.practice_id?.toLowerCase().includes(value) ||
                el.assignment.title?.toLowerCase().includes(value) ||
                el.assignment.description?.toLowerCase().includes(value) ||
                el.assignment.description?.toLowerCase().includes(value) ||
                el.assignment.words?.some(word => {
                    return (
                        word.word?.toLowerCase().includes(value)
                    )
                })
            )
        }))
    }

    useEffect(() => {
        setTableData(searchInfo ? searchInfo : formData);
    }, [formData, searchInfo]);

    return (
        <div className={`${tableDataPageStyle.tableContainer}`}>

            <div className={`${tableDataPageStyle.searchBar}`}>
                <h2>Search</h2>
                <input name="search" onChange={filterData} />
            </div>


            <div className={`${tableDataPageStyle.mainContainter}`}>

                {tableData.map((item) => (
                    <details className={`${tableDataPageStyle.practiceDetails}`}>
                        <summary className={`${tableDataPageStyle.practiceSummary}`}>
                          📖  {item.assignment.title}
                        </summary>
                        <div className={`${tableDataPageStyle.assignmentDataContainer}`}>
                            <div className={`${tableDataPageStyle.assignmentInfoContainer}`}>
                                <div>
                                    <h3>Description</h3>
                                    <div>{item.assignment.description}</div>
                                </div>
                                <div>
                                    <h3> Due Date  </h3>
                                    <div>{item.assignment.expires_in}</div>
                                </div>
                                <div>
                                    <h3> Assignment ID </h3>
                                    <div>{item.practice_id}</div>

                                </div>

                            </div>

                            <div className={`${tableDataPageStyle.wordsTdContainer}`}>


                                {item.assignment.words?.map((word) => (

                                    <div className={`${tableDataPageStyle.eachWord}`} key={word.word_id}>
                                        <h3>{word.word}</h3>
                                        <div>
                                            <p className={`${tableDataPageStyle.examples}`}>{word.example.example1}</p>
                                            <p className={`${tableDataPageStyle.examples}`}>{word.example.example2}</p>
                                        </div>

                                    </div>

                                ))}


                            </div>
                        </div>


                    </details>
                ))}
            </div>


        </div>
    );
}

export default TableData;
