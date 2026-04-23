import { useState } from 'react';
import { allOtherAxiosRequest } from '../api/axios';
import { sanitizeInput } from "../helpers/Helpers";
import createGroupPageStyle from '../css/Dashboard.module.css'

function CreateYearGroup() {
    const [formData, setFormData] = useState({ group_name: '' });
    const [errors, setErrors] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const years = JSON.parse(localStorage.getItem('years')) || [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const rejectEmptyFormSubmission = (formData) => {

        if (Object.values(formData).some((value) => value === '')) {
            setErrors('Please fill in all field.')
            return true
        }
        return false

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (rejectEmptyFormSubmission(formData)) return

        if (sanitizeInput(formData)) {
            setErrors('Invalid input 💪💪')
            return
        }

        try {

            const response = await allOtherAxiosRequest.post(`/api/v1/spelling/years/createYearGroup/${formData.year_id}`, formData);
            if (response.status === 201) {
                setSuccessMessage(response.data.message + ' ✔')
                setFormData({ year_group_name: '' })
            }
        } catch (err) {
            setErrors(err.response.data.message || 'Failed to create Year Group.');
        }
    }

    return (


        <form className={`${createGroupPageStyle.newClassForm}`} onSubmit={handleSubmit}>
            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <h2>Create Year Group</h2>
            <p>This is where you can create a new spelling <b>group</b> the chosen <b>year</b></p>

            <label htmlFor="year_id">Select Year:</label>
            <select id="year_id" name="year_id" onChange={handleChange} value={formData.year_id || ''}>
                <option value="">--Select Year--</option>
                {years.map((year) => (
                    <option key={year.year_id} value={year.year_id}>
                        {year.year_name}
                    </option>
                ))}
            </select>

            <label htmlFor="year_group_name">Group Name:</label>
            <input
                type="text"
                id="group_name"
                name="group_name"
                value={formData.group_name}
                onChange={handleChange}
            />
            <button className={`${createGroupPageStyle.submitButton}`} type="submit">Submit</button>
        </form>

    );
}



export default CreateYearGroup;