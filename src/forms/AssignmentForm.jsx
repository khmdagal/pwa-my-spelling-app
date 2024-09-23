import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from 'uuid';
import Button from '../component/Button';
import { allOtherAxiosRequest } from '../api/axios'

import "react-datepicker/dist/react-datepicker.css";
import '../css/AssignmentsForm.css'



function AssignmentForm({ selectedWords }) {
    const [successMessage, setSuccessMessage] = useState('');
    const [assignmentId, setAssignmentId] = useState(uuidv4());
    const [class_id, setClass_id] = useState('');
    const [created_at, setCreated_at] = useState();
    const [expires_in, setExpires_in] = useState();
    //const [errors, setErrors] = useState('');



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

    function handleClassChange(e) {
        e.preventDefault()
        setClass_id(e.target.value)
    }
    async function handleSubmit(e) {
        e.preventDefault()

        const updatedFormData = {
            school_id: localStorage.getItem('school_id'),
            assignmentId,
            class_id,
            selectedWords,
            created_at,
            expires_in
        }
        try {
            const response = await allOtherAxiosRequest.post('/api/v1/spelling/words/practice-sessions', updatedFormData)
            if (response.status === 201) {
                setSuccessMessage('Assignment has successfully created ✔')

                setAssignmentId(uuidv4())
                setClass_id('')
                setCreated_at('')
                setExpires_in('')

            }
          
       
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <form className="assignmentForm" onSubmit={handleSubmit}>
            {/* {errors && <p className="errorMessage">{errors}</p>} */}
            <h1>Spelling Assignment Form (SAF)</h1>
            <select onChange={handleClassChange}>
                <option value="">Select a class</option>
                {schoolClasses?.map((assignedYear => {

                    return (
                        <option key={assignedYear.class_id} value={assignedYear.class_id}>{assignedYear.class_name}</option>)
                }))}
            </select>


            <div>
                <label htmlFor="words">Selected Words to assign to </label>
                <div className="selectedWordsContainer">

                    {selectedWords?.map(word => {
                        return (<div className="words" name="words" >{word}</div>)
                    })}
                </div>

            </div>
            <div>
                <label htmlFor="created_at">Created at</label>
                <DatePicker name="created_at" selected={created_at} onChange={(date) => setCreated_at(date)} />
            </div>
            <div>
                <label htmlFor="expires_in">Created at</label>
                <DatePicker name="expires_in" selected={expires_in} onChange={(date) => setExpires_in(date)} />
            </div>

            <Button type='submit' label='Submit' backgroundColor='green' color='white' />
            {successMessage && <p className="successMessage">{successMessage}</p>}

        </form>
    )
}



export default AssignmentForm




/*
function AssignmentForm({ selectedWords }) {
    const [selectedClass, setSelectedClass] = useState('')
    const { register } = useForm()
    const newAssignmentId = uuidv4()


    const schoolClasses = ['year1', 'year2', 'year3', 'year4', 'year5', 'year6']



const handleClassChange = (e) => {
    e.preventDefault()
    setSelectedClass(e.target.value)
}

// const onSubmit = (data) => {
//     console.log(data)
// }

const assignmedWords = selectedWords?.map(word => {
    return (<div className="words" name="words" >{word}</div>)
})

return (
    <Form
        action="/api"
        method="post"
        onSubmit={() => console.log(FormData)}
    >
        <select {...register('select Class')} onChange={handleClassChange}>
            <option value=''>===Select Class===</option>
            {schoolClasses?.map((assignedYear => {
                return (<option key={assignedYear} value={assignedYear}>{assignedYear}</option>)
            }))}
        </select>
        <input {...register('AssignmentId')} value={newAssignmentId} disabled />
        <div>
            <label htmlFor="words">Selected Words to assign to {selectedClass}</label>
            <input {...register('Words')} value={assignmedWords} />

        </div>
        <input type="submit" {...register('Submit')} />
    </Form>
)
}

export default AssignmentForm
*/
