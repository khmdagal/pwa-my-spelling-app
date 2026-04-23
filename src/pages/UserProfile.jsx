import React, { useEffect, useState, useMemo } from "react";
import Avatars from "../component/Avatars";
import { allOtherAxiosRequest } from "../api/axios";
import { sanitizeInput } from "../helpers/Helpers";


import classes from '../css/Profile.module.css'


function UserProfile({ years }) {
  const [profile, setProfile] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [newAvatarName, setNewAvatarName] = useState('');
  const [avatarName, setAvatarName] = useState('Adventurer');
  const [year, setYear] = useState({ year_id: '', year_name: '' });
  const [avatarsList, setAvatarsList] = useState([]);
  const [hide, setHide] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(false)


  const userName = useMemo(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.name || ''

  }, [])

  useEffect(() => {
    const getAvatars = async () => {
      try {
        const avatars = await allOtherAxiosRequest.get(`/api/v1/spelling/profile/getAvatars`);

        if (avatars.status === 200) {
          setAvatarsList(avatars.data.avatarNames)
        }
      } catch (error) {

        setErrorMessage(error.message)
      }
    };

    getAvatars()
  }, [])

  useEffect(() => {
    const getMyprofile = async () => {
      try {
        const myProfile = await allOtherAxiosRequest.get(`/api/v1/spelling/profile/getProfile`);

        if (myProfile.status === 200) {
          setProfile(myProfile.data.profile);
          localStorage.setItem('userProfile', JSON.stringify(myProfile.data.profile));
          setAvatarName(myProfile.data.profile.avatar_name)
          setShowCreateButton(true)

        }
      } catch (error) {
        setErrorMessage('An error occurred')
      }
    };

    getMyprofile()
  }, [])


  const createMyprofile = async () => {
    try {
      if (sanitizeInput(newAvatarName)) {
        setErrorMessage('Invalid input 💪💪')
        return
      };

      const response = await allOtherAxiosRequest.post(`/api/v1/spelling/profile/createProfile`, { newAvatarName, year_id: year.year_id });

      if (response.status === 201) {
        setAvatarName(newAvatarName)
        setErrorMessage('')
        setShowCreateButton(true)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  };

  const updateMyprofile = async () => {
    try {

      if (sanitizeInput(newAvatarName) || !profile?.profile_id) {
        setErrorMessage('Invalid input or missing profileId')
        return
      };

      const response = await allOtherAxiosRequest.put(`/api/v1/spelling/profile/updateProfile/${profile?.profile_id}`, { newAvatarName });

      if (response.status === 204) {
        setAvatarName(newAvatarName)
        setHide(false)
        setErrorMessage('')
      }
    } catch (error) {

      setErrorMessage(error.message)
    }
  };

  const handleAvatarName = (e) => {
    e.preventDefault()
    const value = e.target.value
    setAvatarName(value)
    setNewAvatarName(value)

  }

  const handleYears = (e) => {
    e.preventDefault()
    const value = e.target.value
    const selectedText = e.target.selectedOptions[0].text;
    setYear({ year_id: value, year_name: selectedText })
  }

  return (
    <div className={`${classes.profile}`}>
      {errorMessage && <p>{errorMessage}</p>}
      <div className={`${classes.profileAvatarAndName}`}>

        <div className={`${classes.profileAvatar}`} onClick={() => setHide((prev) => !prev)}>
          <Avatars avatarName={avatarName} />
        </div>

        <div>
          <p className={`${classes.profileName}`}>{userName}</p>
          <p className={`${classes.profileName}`}>{profile?.year_name}</p>
        </div>


      </div>
      {hide && (
        <div className={`${classes.profileAvatarUpdate}`}>
          <div className={`${classes.dropDownContainer}`}>
            <label htmlFor="avatarName">Select avatar: </label>
            <select id="avatarName" onChange={handleAvatarName}>
              <option value=''>== Select ==</option>
              {
                avatarsList?.map(el => {
                  return (<option key={el.avatar_name} value={el.avatar_name}>{el.avatar_name}</option>)
                })
              }
            </select>
          </div>

          {!profile && 
            <div className={`${classes.dropDownContainer}`}>
              <label htmlFor="years">Select year: </label>
              <select  onChange={handleYears} >
                <option value=''>== Select year ==</option>
                {
                  years?.map(el => {
                    return (<option key={el.year_id} value={el.year_id}>{el.year_name}</option>)
                  })
                }
              </select>
            </div>}
          {showCreateButton ? <button onClick={updateMyprofile}>Update Avatar</button> : <button onClick={createMyprofile} >Create profile</button>}

        </div>
      )}

    </div>
  );

}

export default UserProfile;