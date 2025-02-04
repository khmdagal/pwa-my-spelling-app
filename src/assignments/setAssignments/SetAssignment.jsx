import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { allOtherAxiosRequest } from '../../api/axios'
import Button from '../../component/Button'
import TableData from "../../component/TableData";
import {sanitizeInput} from '../../helpers/Helpers'


import classes from '../../css/SetAssignment.module.css';

function SetAssignment({ selectedWords }) {
    const navigate = useNavigate()

    const [words, setWords] = useState()
    const [formData, setFormData] = useState({ name: '', assignedYear: '', school_id: localStorage.getItem('school_id'), practice_id: uuidv4(), description: '', words: [], expires_in: '' })
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState('');

    // reading exiting classes for current school
    const schoolClasses = [
        {
            class_id: 1,
            class_name: 'year1'
        },
        {
            class_id: 2,
            class_name: 'year2'
        },
        {
            class_id: 3,
            class_name: 'year3'
        },
        {
            class_id: 4,
            class_name: 'year4'
        },
    ]
    

    useEffect(() => {
        setWords(selectedWords)
    }, [selectedWords])

    useEffect(() => {
        formData.words = words
    }, [words, formData])

    async function handleChange(e) {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

   useEffect(() => {
           if (sanitizeInput(formData)) {
               setErrors('Invalid input 💪💪')
               localStorage.clear()
               setTimeout(() => {
                   navigate('/login')
               }, 3000)
   
           } else {
               return
           }
   
       }, [formData, navigate])
   


    async function handleSubmit(e) {
        try {
            e.preventDefault()
            const response = await allOtherAxiosRequest.post('/api/v1/spelling/words/weeklypractice', formData)
            if (response.status === 201) {
                setSuccessMessage('Assignment has successfully created ✔')
                setFormData({ name: '', class_id: '', practice_id: uuidv4(), description: '', words: [], created_at: '', expires_in: '' })
            }
        } catch (error) {
            setErrors(error.response.data.message)
        }

    }


    return (
        <div>
            <form className={`${classes.assignmentForm}`} onSubmit={handleSubmit}>
                {errors && <p className={`${classes.errorMessage}`}>{errors}</p>}
                <h2>Set Up New Assignment</h2>
                <input name="practice_id" type="text" value={formData.practice_id} disabled hidden />
                <div>
                    <label>Title</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange} />
                </div>
                <select name="class_id" onChange={handleChange}>
                    <option value=''> == Select the class to assign ==</option>
                    {schoolClasses?.map((assignedYear) => {

                        return (
                            <option key={assignedYear.class_id} value={assignedYear.class_id}> {assignedYear.class_name} </option>
                        )
                    })}
                </select>
                <div>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="words">Selected Words to assign to </label>
                    <div className={`${classes.selectedWordsContainer}`}>

                        {selectedWords?.map(word => {
                            return (<div className={`${classes.words}`} name="words" >{word}</div>)
                        })}
                    </div>

                </div>
                <div className={`${classes.dateDiv}`}>
                    <div>
                        <label>Today</label>
                        <input className={`${classes.dateInput}`} name="created_at" type="date" value={formData.created_at} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Due Date</label>
                        <input className={`${classes.dateInput}`} name="expires_in" type="date" value={formData.expires_in} onChange={handleChange} />
                    </div>
                </div>

                <Button color='Golden' onClick={handleSubmit} type='submit' label='Submit' />
                {successMessage && <p className={`${classes.successMessage}`}>{successMessage}</p>}
            </form>
            <div hidden>
                <TableData formData={formData} />
            </div>

        </div>
    )


}

export default SetAssignment;