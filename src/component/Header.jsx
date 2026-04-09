import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import UserProfile from "../pages/UserProfile";
import { axiosForLoginAndSignUpOnly, allOtherAxiosRequest } from '../api/axios';

import classes from '../css/Header.module.css';

function Header() {
    const [years, setYears] = useState([]);
    const [errors, setErrors] = useState('');
    const schoolId = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).school_id : null;

    const navigate = useNavigate();

    useEffect(() => {
        const getAllYearsBySchool = async () => {
            try {
                const response = await allOtherAxiosRequest.get(`/api/v1/spelling/years/getAllYearsBySchool/${schoolId}`);
                setYears(response.data.allYears);
            } catch (err) {
                setErrors(err.response.data.message || 'Failed to fetch years.');
            }
        };

        if (schoolId !== null && schoolId !== undefined) {
            getAllYearsBySchool();
        }
    }, [schoolId]);


    const isLoggedIn = localStorage.getItem('user');
    const pages = ['Home', isLoggedIn ? localStorage.getItem('dashboard') : ''].filter(Boolean);

    const handleLogout = async () => {
        try {
            await axiosForLoginAndSignUpOnly.get('/api/v1/spelling/users/logout', {
                withCredentials: true,
            });
            localStorage.removeItem('user');
            localStorage.removeItem('words');
            localStorage.removeItem('wordsAndExamples');
            localStorage.removeItem('profile');
            localStorage.removeItem('practice_id');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('years');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className={`${classes.header}`}>
            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            {isLoggedIn && <UserProfile years={years} />}
            <nav className={`${classes.nav} ${classes.container}`}>
                <ul className={`${classes.navList}`}>
                    {pages.map(page => (
                        <li
                            key={page}
                            className={`${classes.navItem}`}
                            onClick={() => {
                                if (page === 'Home') {
                                    navigate('/');
                                } else {
                                    navigate(`/${page}`);
                                }
                            }}
                        >
                            {page}
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="buttonsContainer">
                {isLoggedIn ? (
                    <Button
                        backgroundColor="lightgreen"
                        color="black"
                        label="Logout"
                        onClick={handleLogout}
                    />
                ) : (
                    <>
                        <Button
                            backgroundColor="green"
                            color="white"
                            label="Login"
                            onClick={() => navigate('/login')}
                        />
                        <Button
                            backgroundColor="blue"
                            color="white"
                            label="Sign up"
                            onClick={() => navigate('/signUp')}
                        />
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
