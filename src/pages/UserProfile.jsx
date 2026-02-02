import React, { useEffect, useState, useMemo } from "react";
import Avatars from "../component/Avatars";
import { allOtherAxiosRequest } from "../api/axios";
import { sanitizeInput } from "../helpers/Helpers"

import classes from '../css/Profile.module.css'


function UserProfile() {
  const [profile, setProfile] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [newAvatarName, setNewAvatarName] = useState('');
  const [avatarName, setAvatarName] = useState('Adventurer');
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
        console.log(error.message)
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
          setProfile(myProfile.data.profile)
          setAvatarName(myProfile.data.profile.avatar_name)
          setShowCreateButton(true)

        }
      } catch (error) {
        console.log(error.message)
        setErrorMessage(error.message)
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

      const response = await allOtherAxiosRequest.post(`/api/v1/spelling/profile/createProfile`, { newAvatarName });

     
      if (response.status === 201) {
        setAvatarName(newAvatarName)
        setErrorMessage('')
        setShowCreateButton(true)
      }
    } catch (error) {
      console.log(error)
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
      console.log(error.message)
      setErrorMessage(error.message)
    }
  };

  const handleAvatarName = (e) => {
    e.preventDefault()
    const value = e.target.value
    setAvatarName(value)
    setNewAvatarName(value)

  }

 

  return (
    <div className={`${classes.profile}`}>
      {errorMessage && <p>{errorMessage}</p>}
      <div className={`${classes.profileAvatarAndName}`}>
        <p className={`${classes.profileName}`}>{userName}</p>
        <div className={`${classes.profileAvatar}`} onClick={()=> setHide((prev)=> !prev)}>
          <Avatars avatarName={avatarName} />
        </div>

      </div>
      {hide && (
          <div className={`${classes.profileAvatarUpdate}`}>
        <select onChange={handleAvatarName}>
          <option value=''>== Select ==</option>
          {
            avatarsList?.map(el => {
              return (<option key={el.avatar_name} value={el.avatar_name}>{el.avatar_name}</option>)
            })
          }
        </select>
        {showCreateButton ?  <button onClick={updateMyprofile}>Update Avatar</button>:<button onClick={createMyprofile} >Create profile</button>}
       
      </div>
      )}

    </div>
  );

}

export default UserProfile;