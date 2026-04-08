import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { sanitizeInput } from "../helpers/Helpers";
import { allOtherAxiosRequest, axiosForLoginAndSignUpOnly } from '../api/axios';
import Button from "../component/Button";

import classes from '../css/Dashboard.module.css'

const user = localStorage.getItem('user');
const schoolId = JSON.parse(user)?.school_id;

const initialForm = {
    year_name: '',
    school_id: schoolId,
}

function CreateYear() {

    const [formData, setFormData] = useState(initialForm);
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
                setSuccessMessage(response.data.message+' ✔')
                setFormData({ ...initialForm })
            }

        } catch (error) {
            setErrors(error.response.data.message || "Something went wrong.")

        }

    }


    return (
        <div>
            <form className={`${classes.newClassForm}`} onSubmit={handleSubmit}>
                {errors && <p style={{'backgroundColor':'red', 'color':'white'}}>{errors}</p>}
                {successMessage && <p style={{'backgroundColor':'#4CAF50', 'color':'white'}}>{successMessage}</p>}
                <h2>Create a new year or Spelling Group </h2>
                <div>
                    <label>Class/Group name</label>
                    <input
                        name="year_name"
                        type="text"
                        value={formData.year_name}
                        onChange={handleChange}
                        required />
                </div>
                <Button color='Golden' type='submit' label='Submit' />
            </form>
        </div>
    )

}

export default CreateYear