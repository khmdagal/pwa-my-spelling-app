import React, { useMemo, useState } from "react";
import { createAvatar } from '@dicebear/core';
import {
    adventurer, avataaars, adventurerNeutral,
    avataaarsNeutral, bigEars, bigEarsNeutral, bigSmile,
    bottts, botttsNeutral, croodles, croodlesNeutral,
    funEmoji, icons, identicon, lorelei, loreleiNeutral,
    micah, miniavs, openPeeps, personas, pixelArt, pixelArtNeutral,
    shapes, thumbs
} from '@dicebear/collection';
import { allOtherAxiosRequest } from "../api/axios";
import { sanitizeInput } from "../helpers/Helpers"
//import style from '../css/Profile.module.css';

const listAvatas = [adventurer, avataaars, adventurerNeutral,
    avataaarsNeutral, bigEars, bigEarsNeutral, bigSmile,
    bottts, botttsNeutral, croodles, croodlesNeutral,
    funEmoji, icons, identicon, lorelei, loreleiNeutral,
    micah, miniavs, openPeeps, personas, pixelArt, pixelArtNeutral,
    shapes, thumbs];



function Avatars({ avatarName }) {
    const [errorMessage, setErrorMessage] = useState();
    const [newAvatarName, setNewAvatarName] = useState('')
    const [selectedAvatar, setSelectedAvatar] = useState(listAvatas.find((el) => el.meta.title === avatarName));

    const myprofile = useMemo(() => {
        const profile = localStorage.getItem('profile');
        return  JSON.parse(profile)
    }, [])

    const updateMyprofile = async () => {
        try {
            if (sanitizeInput(newAvatarName)) {
                setErrorMessage('Invalid input 💪💪')
                return
            };

            const response = await allOtherAxiosRequest.put(`/api/v1/spelling/profile/updateProfile/${myprofile?.profile_id}`, { newAvatarName });

            if (response.status === 201) {
                setSelectedAvatar(listAvatas.find((el) => el.meta.title === newAvatarName))
            }
        } catch (error) {
            console.log(error.message)
            setErrorMessage(error.message)
        }
    };



    const selectAvatar = (e) => {
        e.preventDefault()
        const value = e.target.value
        setSelectedAvatar(listAvatas.find((el) => el.meta.title === value) || adventurer)
        setNewAvatarName(value)
    }


    const avatar = useMemo(() => {
        return createAvatar(selectedAvatar, {
            size: 100,
            seed: 'demo-user-seed',
        }).toDataUri();
    }, [selectedAvatar]);


    const user = localStorage.getItem('user')
    const userName = JSON.parse(user)?.name

    if (user)
        return (
            <div >
                {errorMessage && <p>{errorMessage}</p>}
                <img src={avatar} alt="Avatar" />
                <h2 style={{ color: 'white' }}> {userName} </h2>

                <select onChange={selectAvatar}>
                    <option value=''>== Select ==</option>
                    {
                        listAvatas.map(el => {
                            return (<option key={el.meta.title} value={el.meta.title}>{el.meta.title}</option>)
                        })
                    }
                </select>
                <button onClick={updateMyprofile}>Update profile</button>
            </div>
        );

}

export default Avatars;