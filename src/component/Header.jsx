import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button'

import classes from '../css/Header.module.css'

function Header() {
//
    const navigate = useNavigate();


    const pages = ['Home', 'Contact', 'About_us', `${localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : ''}`]
    return (

        <header className={`${classes.header}`}>
            <nav className={`${classes.nav} ${classes.container}`}>
                <ul className={`${classes.navList}`}>
                    {pages.map(page => {
                        return (
                            <li key={page} className={`${classes.navItem}`} onClick={() => {
                                if (page === 'Home') {
                                    navigate('/')
                                } else {
                                    navigate(`/${page}`)
                                }

                            }}>
                                {page}
                            </li>
                        )
                    })}


                </ul>

            </nav>
            <div className="buttonsContainer">
                <Button backgroundColor={'green'} color={'white'} label={'Login'} onClick={() => navigate('/login')} />
                <Button backgroundColor={'blue'} color={'white'} label={'Sign up'} onClick={() => navigate('/signup')} />
            </div>

        </header>
    )

}

export default Header