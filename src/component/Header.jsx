import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';

import classes from '../css/Header.module.css';

function Header() {
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('dashboard'); // or use another key like 'user'
    const pages = ['Home', isLoggedIn ? localStorage.getItem('dashboard') : ''].filter(Boolean);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <header className={`${classes.header}`}>
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
