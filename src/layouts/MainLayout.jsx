import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

function MainLayout({ user }) { 
  
  return (
    <>
        <Navbar user = {user} />
        <Outlet />
        <ToastContainer />
    </>
  )
}

export default MainLayout