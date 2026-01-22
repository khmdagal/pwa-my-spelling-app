import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosForLoginAndSignUpOnly } from '../api/axios';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import Button from '../component/Button';
import { sanitizeInput } from '../helpers/Helpers'

import classes from '../css/LogInAndSingUp.module.css'


function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        role: '',
        school_id: 0,
        email: '',
        approved: false
    });
    const [schools, setSchools] = useState([])
    const [errors, setErrors] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [debugResponse, setDebugResponse] = useState({})


    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        try {
            if (sanitizeInput(formData)) {
                setErrors('Invalid input 💪💪')
                localStorage.clear()

                setTimeout(() => {
                    setFormData('')
                    navigate('/signUp')
                }, 3000)
            } else {
                setErrors('');
                e.preventDefault();
                const response = await axiosForLoginAndSignUpOnly.post('/api/v1/spelling/users/signUp', formData);

                if (response.status === 201) {
                    setFormData({
                    name: '',
                    username: '',
                    password: '',
                    role: '',
                    school_id: 0,
                    email: '',
                    approved: false
                });
                }

                //if there is no error then navigate to use login page
                navigate('/login')

            }

        } catch (error) {
            setErrors(error.response.data.message)
            console.log(error)
        }


    };

    const roleOptions = ['student', 'teacher', 'parent', 'public'];

    useEffect(() => {
        async function fetchSchools() {
            try {
                const response = await axiosForLoginAndSignUpOnly.get('/api/v1/spelling/schools');
                response.data.schools && setSchools(response.data.schools);
                
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        }
        
        fetchSchools()

    }, [])

    return (
        <div className={`${classes.mainContainer}`}>
            <header className={`${classes.pageHeader}`}>
                <p className={`${classes.pageHeaderParagraph}`}>Sign Up Form</p>
            </header>

            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            <form onSubmit={handleSubmit}>

                <div className={`${classes.inputDive}`}>
                    <label htmlFor="name">Name </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className={`${classes.inputDive}`}>
                    <label htmlFor="usernameInput">Username </label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div className={`${classes.inputDive}`}>
                    <label htmlFor="password">Password </label>
                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required />
                    <img src={visibilityIcon} alt='Show password icon' onClick={() => setShowPassword((previous) => !previous)} />
                </div>

                <div className={`${classes.inputDive}`}>
                    <label htmlFor="email">Email </label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className={`${classes.roleOptions}`}>
                    <label htmlFor="userRole">Select your role </label>
                    <select name='role' onChange={handleChange}>
                        <option>--Select--</option>
                        {roleOptions.map((el) => <option key={el} value={el}>{el}</option>)}
                    </select>
                </div>

                <div className={`${classes.schoolOptions}`}>
                    <label htmlFor="school">Select your school </label>
                    <select name='school_id' onChange={handleChange}>
                        <option>--Select your school--</option>
                        {schools.map(el => <option key={el.school_id} value={el.school_id}>{el.school_name
                        }</option>)}
                    </select>
                </div>


                <Button backgroundColor={'#7CB342'} color={'white'} type={'submit'} label={'Sign Up'} />
                <Button backgroundColor={'green'} color={'white'} label={'Login'} onClick={() => navigate('/login')} />

            </form>
        </div>
    );
}

export default SignUp;
