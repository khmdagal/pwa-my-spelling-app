import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { allOtherAxiosRequest } from '../../api/axios'
import Button from '../../component/Button'
import { sanitizeInput } from '../../helpers/Helpers'
import Words from "../../component/Words";


import classes from '../../css/SetAssignment.module.css';

const user = localStorage.getItem('user');
const schoolId = JSON.parse(user)?.school_id;


const initialForm = {
    title: '',
    targetgroup: '',
    school_id: schoolId,
    practice_id: uuidv4(),
    description: '',
    words: [],
    created_at: '',
    expires_in: ''
}


function SetAssignment() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialForm)
    const [schoolClasses, setSchoolClasses] = useState([])
    const [selectedWords, setSelectedWords] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [assignmentId, setAssignmentId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        const getAllClass = async () => {
            try {
                const response = await allOtherAxiosRequest.get(`/api/v1/spelling/classes/getAllClassBySchool/${schoolId}`);
                if (response.status === 200) {
                     setSchoolClasses(response.data.allClasses)
                }

            } catch (error) {
                console.log(error)
                console.log(error.response.data.message || "Classes not found.")

            }
        }

        getAllClass()
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectedWordsChange = useCallback((words) => {
        setSelectedWords(words)
        setFormData((prev) => ({ ...prev, words }))
    }, []);

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const rejectEmptyFormSubmission = (formData) => {
        if (Object.values(formData).some((value) => value === '' || (Array.isArray(value) && value.length === 0))) {
            setErrors('Please fill in all fields and select at least one word to assign.')
            return true
        }
        return false
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (rejectEmptyFormSubmission(formData)) return


        if (sanitizeInput(formData)) {
            setErrors('Invalid input 💪💪')
            localStorage.clear()
            setTimeout(() => { navigate('/login') }, 3000)
        }

        try {
            const payload = {
                ...formData,
                words: JSON.stringify(formData.words)
            }

            const response = await allOtherAxiosRequest.post('/api/v1/spelling/words/weeklypractice', payload)

            if (response.status === 201) {
                setAssignmentId(formData.practice_id)
                setSuccessMessage('Assignment has successfully created ✔')
                setFormData({ ...initialForm, practice_id: uuidv4() })
                setSelectedWords([])

            }
        } catch (error) {
            setErrors(error.response.data.message || "Something went wrong.")
        }

    }



    return (
        <div>
            <form className={`${classes.assignmentForm}`} onSubmit={handleSubmit}>
                {errors && <p className={`${classes.errorMessage}`}>{errors}</p>}
                <h2>Set Up New Assignment</h2>
                {assignmentId && <div className={`${classes.successMessage}`}>
                    <p>This is the practice id, please copy and send to the class</p>
                    <p>ID:{assignmentId}</p>
                </div>}
                <input name="practice_id" type="text" value={formData.practice_id} disabled hidden />
                <div>
                    <label>Title</label>
                    <input name="title" type="text" value={formData.title} onChange={handleChange} required />
                </div>
                <select name="targetgroup" onChange={handleChange} required>
                    <option value=''> == Select the class to assign ==</option>
                    {schoolClasses?.map((assignedYear) => {

                        return (
                            <option key={assignedYear.class_id} value={assignedYear.class_id}> {assignedYear.class_name} </option>
                        )
                    })}
                </select>
                <div>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="words">Selected Words to assign to </label>
                    <select value={selectedOption} onChange={handleDropdownChange}>
                        <option value=''>== Words List ==</option>
                        <option value='wordsList'>Words</option>
                    </select>

                    {selectedOption === 'wordsList' && <Words onSelectedWordsChange={handleSelectedWordsChange} />}

                    <div className={`${classes.selectedWordsContainer}`}>

                        {selectedWords?.map(word => {
                            return (<div key={word.word_id} className={`${classes.words}`} name="words" >
                                <p>{word.word}</p>
                                <p>{word.example.example1}</p>
                                <p>{word.example.example2}</p>
                            </div>)
                        })}
                    </div>

                </div>
                <div className={`${classes.dateDiv}`}>
                    <div>
                        <label>Today</label>
                        <input className={`${classes.dateInput}`} name="created_at" type="date" value={formData.created_at} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Due Date</label>
                        <input className={`${classes.dateInput}`} name="expires_in" type="date" value={formData.expires_in} onChange={handleChange} required />
                    </div>
                </div>

                <Button color='Golden' onClick={handleSubmit} type='submit' label='Submit' />
                {successMessage && <p className={`${classes.successMessage}`}>{successMessage}</p>}
            </form>
        </div>
    )
}

export default SetAssignment;