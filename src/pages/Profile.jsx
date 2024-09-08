import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile({signOut}) {
    useEffect(() => {
        const fetchTasks = async () => {
            signOut()
            const nav = useNavigate()
            return nav ('/') 
        };
    
        fetchTasks();
      }, []);
    
  return (
    <div>
      
    </div>
  )
}

export default Profile
