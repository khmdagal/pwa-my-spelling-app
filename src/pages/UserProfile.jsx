import React, { useEffect, useState } from "react";
import Avatars from "../component/Avatars";
import { allOtherAxiosRequest } from "../api/axios";


function UserProfile() {
  const [profile, setProfile] = useState();
  const user = localStorage.getItem('user')

  useEffect(() => {

    const getMyprofile = async () => {
      try {
        const response = await allOtherAxiosRequest.get(`/api/v1/spelling/profile/getProfile`);
       
        if (response.status === 200) {
         localStorage.setItem('profile', JSON.stringify(response.data.profile[0]))
          setProfile(response.data.profile[0])
        }
      } catch (error) {
        console.log(error)
      }

    };

    getMyprofile()
  }, [user]);

  if (profile)
    return (
      <div >
        <Avatars avatarName={profile?.avatar_name} />
      </div>
    );

}

export default UserProfile