import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button'

import '../css/Header.css'


function Header() {
    const pages = ['Home', 'Contact', 'About-Us','Dashboard']
    const navigate = useNavigate();

    return (

        <header className="header">
            <nav className="nav container">
                <ul className="navList">
                    {pages.map(page => {
                        return (
                            <li className="navItem" onClick={() => {
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