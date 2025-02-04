import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosForLoginAndSignUpOnly } from '../api/axios';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import Button from '../component/Button';
import Spinner from '../component/Spinner';
import { sanitizeInput } from '../helpers/Helpers'

import classes from '../css/LogInAndSingUp.module.css'

function LogIn() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [spinner, setSpinner] = useState(false)

    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function handleSubmit(e) {
        try {

            if (sanitizeInput(formData)) {
                setErrors('Invalid input 💪💪')
                localStorage.clear()
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            } else {

                setSpinner(true)
                e.preventDefault();
                setErrors('');

                const response = await axiosForLoginAndSignUpOnly.post('/api/v1/spelling/users/login', formData);
                if (response.status === 200) setSpinner(false)

                setFormData({
                    username: '',
                    password: ''
                });
                const { token, approved: admin, school_id } = response.data;


                if (!token) {
                    setErrors(response.data.message);
                    return;
                }

                if (token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('school_id', school_id);

                    if (admin) {
                        localStorage.setItem('admin', admin);
                        localStorage.setItem('dashboard', 'Admin_Dashboard');
                        navigate('/admin_dashboard');
                    } else {
                        localStorage.setItem('dashboard', 'Student_Dashboard');
                        navigate('/student_dashboard');
                    }
                } else {
                    setErrors(response.data.message);
                    navigate('/logIn');
                }

            }

        } catch (error) {
            setErrors(error?.response?.data?.message || 'An unexpected error occurred');
        }
    };

    return (
        <div className={`${classes.mainContainer}`}>
            {spinner && <Spinner />}
            <header className={`${classes.pageHeader}`}>
                <p className={`${classes.pageHeaderParagraph}`}>Long in Form</p>
            </header>

            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            <form onSubmit={handleSubmit}>

                <div className={`${classes.inputDive}`}>
                    <label htmlFor="usernameInput">Username </label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className={`${classes.inputDive}`}>
                    <label htmlFor="password">Password </label>
                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required />
                    <img src={visibilityIcon} alt='Show password icon' onClick={() => setShowPassword((previous) => !previous)} />
                </div>
                <div style={{ display: 'none' }}>
                </div>
                <Button backgroundColor={'#2196f3'} color={'white'} type={'submit'} label={'Login'} />
                <Button backgroundColor={'blue'} color={'white'} label={'Sign up'} onClick={() => navigate('/signUp')} />
            </form>
        </div>
    );
}

export default LogIn;
