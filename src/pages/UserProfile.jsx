import React, { useState, useEffect } from "react"

function UserProfile() {
  const [user, setUser] = useState('');


  useEffect(() => {
    setUser(localStorage.getItem('name'))

  }, [user]);
  return (
    <div className="user-profile">
      <h2>User: {user} </h2>

    </div>
  );

}

export default UserProfile