import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RequestSearch() {
    const [searchID, setSeatchID] = useState('')
    const nav = useNavigate()


  return (
    <section className=""> 
        <div className="container m-auto max-w-2xl py-24">
            <div
            className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
            >
                <form onSubmit={ () => {nav('/request-single/'+searchID)} }>
                    <h2 className="text-3xl text-gray-600 text-center font-semibold mb-6">Найти Запрос</h2>


                    <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">ID</label>
                    <input
                        type="text"
                        id="title"
                        name="ID"
                        className="border rounded w-full  py-2 px-3 mb-2  text-gray-700"
                        placeholder="666"
                        required
                        value={ searchID }
                        onChange={ ( e ) => setSeatchID ( e.target.value ) }
                    />
                    </div>

                    <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                        type="submit"
                        style = {{backgroundColor: '#ff6600'}}
                    >
                        Найти
                    </button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default RequestSearch
