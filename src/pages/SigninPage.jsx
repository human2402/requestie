import React, { useEffect } from 'react'
import { useState } from 'react'
import { useActionData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
 
function SigninPage({ setUser, user }) {
    const [inputUserName, setinputUserName] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [loginStat, setLoginStat] = useState(0)

    const navigate = useNavigate();

    const API_URL = import.meta.env.DEV
      ? '/api'
      : import.meta.env.VITE_API_URL;

    useEffect (() => {
      if (user.sessionID != '') {
        navigate('/kanban')
      }
    }, [navigate])

    const loginClickHandle = (e) => {
        
        e.preventDefault();
        const signInAttempt = async () => {
            try {
            const res = await fetch(`${API_URL}/sign-in/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: inputUserName,
                  password: inputPassword
                }),
                });
            const data = await res.json();
            const stat = (res.status)
            console.log (stat,data)
            setLoginStat(stat)
            if (stat == 200) {
              setUser({
                firstName: data.name,
                secondName: data.secondName,
                sessionID: data.sessionID,
                role: data.role
              })
               // Save user data to cookies
              Cookies.set('firstName', data.name, { expires: 30 }); // Expires in 7 days
              Cookies.set('secondName', data.secondName, { expires: 30 });
              Cookies.set('sessionID', data.sessionID, { expires: 30 });
              Cookies.set('role', data.role, { expires: 30 });
                  
              toast.success("Добро пожаловать, "+data.name)
              return navigate('/kanban');
            }
            } catch (error) {
                console.log ('Error fetching data', error)
                setLoginStat(stat)
            }
        }
        
        signInAttempt();
        console.log (loginStat)
        // if (loginStat == 200) {
            
        // } else 
        // if ( loginStat == 401 ) {
        //     // toast.error("Неверная почта или пароль")
        // }

        return 
        
    }

    return (
        <section  >
          <div className="container m-auto max-w-2xl my-24 bg-white shadow-md rounded-md">
          {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-30 w-auto rounded-full  border border-gray-300"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHe5tlWlZALFTzdwV6RknqUsd7xMHAs5ms8Fj1qmPo9g&s"
                alt="Your Company"
              />
              <h2 
                style = {(loginStat == 401)  ? {color: '#ef2424'} : {color: "black"}}
                className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {(loginStat == 401) ? "Попробуйте снова" : 'Зайдите в свой аккаунт'}
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={ loginClickHandle }>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Имя пользователя
                  </label>
                  <div className="mt-2 ">
                    <input

                      id="username"
                      name="username"
                      type="text"
                      required
                      className="block py-2 px-3 mb-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={ inputUserName }
                      onChange={ ( e ) => setinputUserName ( e.target.value ) }
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Пароль
                    </label>
                    <div className="text-sm">
                      <a href="https://t.me/human2402"  className="font-semibold text-indigo-600 hover:text-indigo-500" style = {{сolor: '#164676'}}>
                        Забыли пароль?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full py-2 px-3 mb-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={ inputPassword }
                      onChange={ ( e ) => setInputPassword ( e.target.value ) }
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    style = {{backgroundColor: '#ff6600'}}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Войти
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Ещё не зарегестрирован?{' '}
                <a href="https://t.me/human2402" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Тебе сюда
                </a>
              </p>
            </div>
          </div>
          </div>
        </section>
      )
}

export default SigninPage