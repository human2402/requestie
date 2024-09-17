import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function MakeRequest(  ) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Ремонт');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [autorName, setAutorName] = useState('');

    const [assignedID, assignID] = useState(0)

    const nav = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault();
  
        const res = await fetch(`/api/add-request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            type: type,
            location: location,
            description: description,
            autorName: autorName
          }),
        });
        const data = await res.json()
        console.log (res.status)

        if (res.status == 200){
          assignID (data.assignedID)
          toast.success("Создан запрос #"+data.assignedID)
          nav('/request-single/'+data.assignedID)
        }
        return data;

        // toast.success("Размещение создано!")
        // return navigate('/jobs');
      }




  return (
    <section className="">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form onSubmit={ submitHandler }>
            <h2 className="text-3xl text-gray-600 text-center font-semibold mb-6">Разместить Запрос</h2>

            <div className="mb-4">
              <label for="type" className="block text-gray-700  font-bold mb-2">Вид</label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3  text-gray-700"
                required
                value={ type }
                onChange={ ( e ) => setType ( e.target.value ) }
              >
                <option value="Ремонт">Ремонт</option>
                <option value="Обслуживание">Обслуживание</option>

              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Заголовок</label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full  py-2 px-3 mb-2  text-gray-700"
                placeholder="Очень важная работа и т.п."
                required
                value={ title }
                onChange={ ( e ) => setTitle ( e.target.value ) }
              />
            </div>
            <div className="mb-4">
              <label
                for="description"
                className="block text-gray-700 font-bold mb-2"
                >Описание</label
              >
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3 text-gray-700"
                rows="4"
                placeholder="Добавьте ожидания, требования и т. д."
                value={ description }
                onChange={ ( e ) => setDescription ( e.target.value ) }
              ></textarea>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Местоположение
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2  text-gray-700'
                placeholder='Корпус, кабинет'
                required           
                value={ location }
                onChange={ ( e ) => setLocation ( e.target.value ) }
              />
            </div>


            <div className="mb-4">
              <label for="company" className="block text-gray-700 font-bold mb-2"
                >Контакт</label
              >
              <input
                type="text"
                id="company"
                name="company"
                className="border rounded w-full py-2 px-3  text-gray-700"
                placeholder="Имя, отдел"
                value={ autorName }
                onChange={ ( e ) => setAutorName ( e.target.value ) }
              />
            </div>


            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
                style = {{backgroundColor: '#ff6600'}}
              >
                Разместить
              </button>
            </div>

            {(assignedID != 0)&& (
              <div className="mt-4">
                <h1 className = 'text-green-700 text-xl font-semibold'>Номер запроса: {assignedID}</h1>
             </div>
            )}
            
          </form>
        </div>
      </div>
    </section>
  )
}

export default MakeRequest