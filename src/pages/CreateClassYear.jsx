import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { sanitizeInput } from "../helpers/Helpers";
import { allOtherAxiosRequest, axiosForLoginAndSignUpOnly } from '../api/axios';
import Button from "../component/Button";

const user = localStorage.getItem('user');
const schoolId = JSON.parse(user)?.school_id;

const initialForm = {
    class_name: '',
    school_id: schoolId,
    enrolled_students: ''
}

function CreateClassYear() {

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
            console.error('Logout failed:', error);
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

            const response = await allOtherAxiosRequest.post(`/api/v1/spelling/classes/createClass${schoolId}`, formData);

            if (response.status === 201) {
                setSuccessMessage('The new class or group has been successfully created ✔')
                setFormData({ ...initialForm })
            }

        } catch (error) {
            console.log(error)
            setErrors(error.response.data.message || "Something went wrong.")

        }

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                {errors && <p>{errors}</p>}
                {successMessage && <p>{successMessage}</p>}
                <h3>Create a new Class or Spelling Group </h3>
                <div>
                    <label>Class/Group name</label>
                    <input
                        name="class_name"
                        type="text"
                        value={formData.class_name}
                        onChange={handleChange}
                        required />
                    <div>
                        <label>Number of Enrolled Students</label>
                        <input name="enrolled_students"
                            type="number"
                            value={formData.enrolled_students}
                            onChange={handleChange}
                            required />
                    </div>
                </div>
                <Button color='Golden' type='submit' label='Submit' />
            </form>
        </div>
    )

}

export default CreateClassYear