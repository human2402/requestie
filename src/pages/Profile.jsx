import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

function Profile({signOut}) {
  const hasShownToast = useRef(false)
  const nav = useNavigate()
    useEffect(() => {
        const fetchTasks = async () => {
          Cookies.remove('firstName');
          Cookies.remove('secondName');
          Cookies.remove('sessionID');
          Cookies.remove('role');
          
          signOut()
          if (!hasShownToast.current) {
            hasShownToast.current = true; // Set flag to true to prevent future toasts
            toast.info ('Сессия закончена')
             nav("/sign-in");
        }
        };
    
        fetchTasks();
      }, [nav, hasShownToast]);
    
  return (
    <div>
      
    </div>
  )
}

export default Profile
