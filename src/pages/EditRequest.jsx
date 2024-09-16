import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function EditRequest({ user}) {

    const navigate = useNavigate()
    const { id } = useParams();
    const [status, setStatus] = useState ('')
    const [time, setTime] = useState ('')
    const [title, setTitle] = useState ('')
    const [type, setType] = useState ('')
    const [description, setDescription] = useState ('')
    const [location, setLocation] = useState ('')
    const [contact, setContact] = useState ('')

    const [task, setTask] = useState({
      id: '',
      status: '',
      time: '',
      title: '',
      type: '',
      description: '',
      location: '',
      contact: ''
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/request/'+id);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTask(data);
        setStatus(data.status)
        setTitle(data.title)
        setType(data.type)
        setDescription(data.description)
        setLocation(data.location)
        setContact(data.contact)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedRequest = {
      status,
      title,
      type,
      description, 
      location,
      contact
    };

    const res = await fetch(`/api/request-edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updatedRequest: updatedRequest,
        sessionID: user.sessionID
      }),
    });
    return navigate('/kanban');
  };

    
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



  return (
    <section className="">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form onSubmit={ submitHandler }>
            <h2 className="text-3xl text-gray-600 text-center font-semibold mb-6">Редактировать Запрос ID: {id}</h2>
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
                value={ contact }
                onChange={ ( e ) => setContact ( e.target.value ) }
              />
            </div>


            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Разместить
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EditRequest