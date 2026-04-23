import { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { sanitizeInput } from "../helpers/Helpers";
import { allOtherAxiosRequest, axiosForLoginAndSignUpOnly } from '../api/axios';
import Button from "../component/Button";

import createYearPageStyle from '../css/Dashboard.module.css'

function CreateYear() {

    const schoolId = useMemo(() => {
        const user = localStorage.getItem('user');
        return JSON.parse(user)?.school_id;
    }, []);


    const [formData, setFormData] = useState({
        year_name: '',
        school_id: schoolId,
    });
    const [errors, setErrors] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate()

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

    const handleLogout = async () => {
        try {
            await axiosForLoginAndSignUpOnly.get('/api/v1/spelling/users/logout', {
                withCredentials: true,
            });
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.log('Logout failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (rejectEmptyFormSubmission(formData)) return

        if (sanitizeInput(formData)) {
            setErrors('Invalid input 💪💪')
            handleLogout()
            setTimeout(() => { navigate('/login') }, 3000)
        }

        try {

            const response = await allOtherAxiosRequest.post(`/api/v1/spelling/years/createYear/${schoolId}`, formData);


            if (response.status === 201) {
                setSuccessMessage(response.data.message + ' ✔')
                setFormData({
                    year_name: '',
                    school_id: schoolId,
                });
                setErrors('');
            }

        } catch (error) {
            setErrors(error.response.data.message || "Something went wrong.")

        }

    }


    return (
       
            <form className={`${createYearPageStyle.newClassForm}`} onSubmit={handleSubmit}>
                {errors && <p style={{ 'backgroundColor': 'red', 'color': 'white' }}>{errors}</p>}
                {successMessage && <p style={{ 'backgroundColor': '#4CAF50', 'color': 'white' }}>{successMessage}</p>}
                <h2>Create a new year </h2>
                <div>
                    <label>Year name</label>
                    <input
                        name="year_name"
                        type="text"
                        value={formData.year_name}
                        onChange={handleChange}
                        required />
                </div>
                <Button className={`${createYearPageStyle.submitButton}`}  color='Golden' type='submit' label='Submit' />
            </form>
       
    )

}

export default CreateYear