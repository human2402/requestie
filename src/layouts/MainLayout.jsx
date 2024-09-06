import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

function MainLayout({ userFirstName }) { 
  
  return (
    <>
        <Navbar userFirstName = {userFirstName}/>
        <Outlet />
        <ToastContainer />
    </>
  )
}

export default MainLayout