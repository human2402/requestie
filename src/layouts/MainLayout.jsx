import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({ user }) { 
  const notify = () => toast("This is a toast notification !");
  return (
    <>
        <Navbar user = {user} />
        <Outlet />
        <ToastContainer />
    </>
  )
}

export default MainLayout