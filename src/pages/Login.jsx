import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosForLoginAndSignUpOnly } from '../api/axios';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import Button from '../component/Button';

import '../css/Login.css'

function LogIn() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        try {
            const response = await axiosForLoginAndSignUpOnly.post('/api/v1/spelling/users/login', formData);
            // Handle success, maybe clear the form or show a success message

            setFormData({
                username: '',
                password: ''
            });

            const token = await response.data.token;

            if (!token) {
                setErrors(response.data.message)

            } else {
                console.log(` response data ${response.data} `)
                localStorage.setItem('token', token)
                navigate('/dashboard')
            }



        } catch (error) {
            setErrors(error.response.data.message)
        }


    };

    return (
        <div className="mainContainer">
            <header className="pageHeader">
                <p className="pageHeaderParagraph">Welcome Back, please long in</p>
            </header>

            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            <form onSubmit={handleSubmit}>

                <div className="inputDive">
                    <label htmlFor="usernameInput">Username </label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="inputDive">
                    <label htmlFor="password">Password </label>
                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required />
                    <img src={visibilityIcon} alt='Show password icon' onClick={() => setShowPassword((previous) => !previous)} />
                </div>

                {/* <button type="submit">Login</button> */}
                <Button backgroundColor={'#2196f3'} color={'white'} type={'submit'} label={'Login'} />
            </form>
        </div>
    );
}

export default LogIn;
