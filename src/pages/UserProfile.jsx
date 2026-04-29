import React, { useEffect, useState, useMemo } from "react";
import Avatars from "../component/Avatars";
import { allOtherAxiosRequest } from "../api/axios";
import { sanitizeInput } from "../helpers/Helpers";


import classes from '../css/Profile.module.css'


function UserProfile({ years }) {
  const [profile, setProfile] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [avatarName, setAvatarName] = useState('Adventurer');
  const [newProfile, setNewProfile] = useState({});
  const [spellingGroup, setspellingGroup] = useState([]);
  const [avatarsList, setAvatarsList] = useState([]);
  const [hide, setHide] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(false)


  const user = localStorage.getItem('user')
  const parsedUser = useMemo(() => {
    return JSON.parse(user) || "";
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));

    if (name === 'avatarName') {
      setAvatarName(value);
    }
  }

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

        if (myProfile.status !== 200) {
          setErrorMessage(myProfile.data.message || 'Please Create your profile')
        }

        setProfile(myProfile.data.profile);
        localStorage.setItem('userProfile', JSON.stringify(myProfile.data.profile));
        setAvatarName(myProfile.data.profile.avatar_name)
        setShowCreateButton(true)

      } catch (error) {
        console.log(error)
        setErrorMessage(error.response.data.message || 'An error occurred')
      }
    };

    getMyprofile()
  }, [])

  useEffect(() => {
    const getAllSpellingGroups = async () => {
      try {
        const response = await allOtherAxiosRequest.get(`/api/v1/spelling/years/getSpellingGroupsByYear/${newProfile.year_id}`);
        if (response.status === 200) {
          setspellingGroup(response.data.allGroups)
        }
      } catch (error) {
        console.log(error.response.data.message || "Spelling groups not found.")
      }
    }

    if (newProfile.year_id) {
      getAllSpellingGroups();
    }

  }, [newProfile.year_id])

  const createMyprofile = async () => {
    try {
      if (sanitizeInput(newProfile.avatarName)) {
        setErrorMessage('Invalid input 💪💪')
        return
      };

      const response = await allOtherAxiosRequest.post(`/api/v1/spelling/profile/createProfile`, newProfile);

      if (response.status === 201) {
        setAvatarName(newProfile.avatarName);
        setErrorMessage('');
        setShowCreateButton(true);
      }
    } catch (error) {
      setErrorMessage(error.message || "Unexpected error occured, please try again!");
    }
  };

  const updateMyprofile = async () => {
    try {

      if (sanitizeInput(avatarName) || !profile?.profile_id) {
        setErrorMessage('Invalid input or missing profileId');
        return
      };

      const response = await allOtherAxiosRequest.put(`/api/v1/spelling/profile/updateProfile/${profile?.profile_id}`, { avatarName });

      if (response.status === 204) {
        setAvatarName(newProfile.avatarName);
        setHide(false);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(error.message || "Unexpected error occured, please try again!");
    }
  };


  return (
    <div className={`${classes.profile}`}>
      {errorMessage && <p>{errorMessage}</p>}
      <div className={`${classes.profileAvatarAndName}`}>

        <div className={`${classes.profileAvatar}`} onClick={() => setHide((prev) => !prev)}>
          <Avatars avatarName={avatarName} />
        </div>

        <div>
          <p className={`${classes.profileName}`}>{parsedUser?.name || ''}</p>
          {parsedUser.admin ? "" : <p className={`${classes.profileName}`}>{profile?.year_name}</p>}
        </div>


      </div>
      {hide && (
        <div className={`${classes.profileAvatarUpdate}`}>
          <div className={`${classes.dropDownContainer}`}>
            <label htmlFor="avatarName">Select avatar: </label>
            <select name="avatarName" id="avatarName" onChange={handleChange}>
              <option value=''>== Select ==</option>
              {
                avatarsList?.map(el => {
                  return (<option key={el.avatar_name} value={el.avatar_name}>{el.avatar_name}</option>)
                })
              }
            </select>
          </div>

          {parsedUser.admin ? null : !profile &&

            <div className={`${classes.profileCreationContainer}`}>
              <div className={`${classes.dropDownContainer}`}>
                <label htmlFor="years">Select year: </label>
                <select name="year_id" onChange={handleChange} >
                  <option value=''>== Select year ==</option>
                  {
                    years?.map(el => {
                      return (<option key={el.year_id} value={el.year_id}>{el.year_name}</option>)
                    })
                  }
                </select>
              </div>

              <div>
                <label>Select you spelling spelling group</label>
                <select name="group_id" onChange={handleChange} required>
                  <option value=''> Select</option>
                  {spellingGroup?.map((groups) => {
                    return (
                      <option key={groups.group_id} value={groups.group_id}> {groups.group_name} </option>
                    )
                  })}
                </select>
              </div>


            </div>

          }
          {showCreateButton ?
            <button onClick={updateMyprofile}>Update Avatar</button> :
            <button onClick={createMyprofile} >Create profile</button>}

        </div>
      )}

    </div>
  );

}

export default UserProfile;