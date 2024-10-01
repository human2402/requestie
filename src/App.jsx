import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Cookies from 'js-cookie';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Kanban from "/src/pages/Kanban.jsx"
import NotFoundPage from './pages/NotFoundPage'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import MakeRequest from './pages/MakeRequest'
import SigninPage from './pages/SigninPage'
import EditRequest from './pages/EditRequest'
import Profile from './pages/Profile'
import RequestSearch from './pages/RequestSearch'
import SingleRequest from './pages/SingleRequest'
import ArchivePage from './pages/ArchivePage';

function App() {

  const [user, setUser] = useState ({
    firstName: '',
    secondName: '',
    sessionID: '',
    role: ''
  })

  useEffect(() => {
    // Retrieve user data from cookies if available
    const firstName = Cookies.get('firstName');
    const secondName = Cookies.get('secondName');
    const sessionID = Cookies.get('sessionID');
    const role = Cookies.get('role');

    if (sessionID) {
      setUser({
        firstName: firstName || '',
        secondName: secondName || '',
        sessionID: sessionID,
        role: role || ''
      });

      // Optionally, redirect the user to another page if logged in
      
    }
  }, []);

  const signOut = () => {
    setUser(
      {
        firstName: '',
        secondName: '',
        sessionID: '',
        role: ''
      }
    )
  }

//  const [count, setCount] = useState(0)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = '/' element = {<MainLayout user  = {user} />} >


        {/* <Route index element = {<Kanban />} /> */}

        <Route path = '/request-search' element = {<RequestSearch />} />
        <Route path = '/request-single/:id' element  = {<SingleRequest user = {user}/>} />
        <Route path = '/request-archive' element = {<ArchivePage user = {user} />} />

        <Route path = '/kanban' element = {<Kanban user = {user} />} />
        <Route  index element = {<MakeRequest />} />
        <Route path = '/sign-in' element = {
          <SigninPage setUser={ setUser } user = {user} />
        } />

        <Route path = '/profile' element = {<Profile signOut = {signOut}/>} />

        <Route path = '/request-edit/:id' element  = {<EditRequest user = {user}/>} />
        <Route 
        path='*' 
        element = {<NotFoundPage />}
       />
      </Route>
    )
  )


  return (
    <>
      
      <RouterProvider router={router} />
      {/*<div>*/}
      {/*  <a href="https://vitejs.dev" target="_blank">*/}
      {/*    <img src={viteLogo} className="logo" alt="Vite logo" />*/}
      {/*  </a>*/}
      {/*  <a href="https://react.dev" target="_blank">*/}
      {/*    <img src={reactLogo} className="logo react" alt="React logo" />*/}
      {/*  </a>*/}
      {/*</div>*/}
      {/*<h1>Vite + React</h1>*/}
      {/*<div className="card">*/}
      {/*  <button onClick={() => setCount((count) => count + 1)}>*/}
      {/*    count is {count}*/}
      {/*  </button>*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.jsx</code> and save to test HMR*/}
      {/*  </p>*/}
      {/*</div>*/}
      {/*<p className="read-the-docs">*/}
      {/*  Click on the Vite and React logos to learn more*/}
      {/*</p>*/}
    </>
  )
}

export default App
