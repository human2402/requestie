import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


import Kanban from "/src/pages/Kanban.jsx"
import NotFoundPage from './pages/NotFoundPage'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import MakeRequest from './pages/MakeRequest'
import SigninPage from './pages/SigninPage'

function App() {
  const [user, setUser] = useState ({
    firstName: '',
    sessionID: '',
    role: ''
  })
  const [sessionID, setSessionID] = useState ('') 
  const [userFirstName, setUserFirstName] = useState('')
//  const [count, setCount] = useState(0)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = '/' element = {<MainLayout userFirstName  = {userFirstName}/>} >


        <Route index element = {<Kanban />} />
        <Route path = '/make-request' element = {<MakeRequest />} />
        <Route path = '/sign-in' element = {
          <SigninPage setUser={ setUser } />
        } />
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
