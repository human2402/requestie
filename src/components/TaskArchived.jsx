
import React, { useEffect, useState } from 'react'
import { FaExpand, FaDotCircle, FaEdit, FaAngleRight  } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsArchive } from "react-icons/bs";

const TaskArchived =  ({user, task, moveTask}) => {
    const [isDeleted, setDeleted] = useState (false) 
    const [isArchived, setArchived] = useState (false)
    const [dispayDescription, setDispayDescription ] = useState ()
    const [isDescCollapsed, setDescCollapsed] = useState (false)

    const API_URL = import.meta.env.DEV
      ? '/api'
      : import.meta.env.VITE_API_URL;
  
    useEffect(() => {
      let dispayLength = 90
      if (task.description.length>dispayLength) {
        setDispayDescription(task.description.substring(0, dispayLength) + " ")
        setDescCollapsed(true)
      } else {
        setDispayDescription(task.description)
      }
    }, [dispayDescription,isDescCollapsed])
  
    let deleteATask = async (e) => {
      const confirm = window.confirm ("Вы уверенны, что хотите удалить это размещение?")
      
      if (!confirm) return;
  
      e.preventDefault()
      const res = await fetch(`/${API_URL}/delete-request`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: task.id,
          sessionID: user.sessionID
        }),
      });
      if (res.ok) {
        toast.warning('Удалено')
      }
      setDeleted(true)
      return ;
    }
  
    let archiveTask = async (e) => {
      e.preventDefault()
      const res = await fetch(`/${API_URL}/unarchive-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: task.id,
          sessionID: user.sessionID
        }),
      });
      if (res.ok) {
        toast.warning('Восставновлен #'+task.id)
      }
      setDeleted(true)
      setArchived(true)
      return ;
    }
  
    let restoreATask = async (e) => {
      e.preventDefault()
      const res = await fetch(`/${API_URL}/restore-request`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: task.id,
          sessionID: user.sessionID
        }),
      });
      if (res.ok) {
        toast.success('Восстановлено')
        setDeleted(false)
      }
      
      return ;
  
      
    }
  
  
    let dotColors = getStatusClass(task.status)
    return (<>
      {(isDeleted)? 
      (<>
        {(isArchived)?(
          <Link
            to={"/request-archive"}
            className=" flex items-center text-blue-800 hover:text-gray-900 focus:outline-none ml-2 flex"
            aria-label="More Info"
          >В архив <FaAngleRight size = {20}/></Link>
        ):(
          <p 
            className="text-sm2 text-blue-800 hover:text-blue focus:outline-none cursor-pointer" 
            onClick={restoreATask}
          >Восстановить...</p>
        )}
        
      </>):
      (
        <>
      <div className="flex justify-between items-start mb-2 hover:text-red-800">
        <p className="text-xs text-gray-500">ID: {task.id}</p>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-600 ">{task.time}</p>
          
          <Link
            to={'/request-single/'+task.id}
            className="text-gray-600 hover:text-gray-900 focus:outline-none ml-2"
            aria-label="More Info"
          >
            <FaExpand 
              size={19} 
            />
          </Link>
          
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-3 space-y-2 sm:space-y-0 sm:space-x-2">
    <h2 className="text-xl font-semibold text-gray-900">
      {task.title}
    </h2>
    
    {/* Button with info icon */}
    <div className="flex items-center space-x-2 sm:ml-auto ">
      {(user.role === 'admin') && (
        <>
          <button
            onClick={deleteATask}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Delete Task"
          >
            <FaDeleteLeft size={20} className="text-gray-400 hover:text-red-800" />
          </button>
          <Link
            to={'/request-edit/' + task.id}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Edit Task"
          >
            <FaEdit size={19} className="text-gray-400 hover:text-blue-800" />
          </Link>
        </>
      )}
    </div>
  </div>
  
      <p className="text-sm2 text-gray-900 mb-3">
        {dispayDescription}
        {(isDescCollapsed)&&(
          <span 
            className=" cursor-pointer text-blue-500 hover:text-blue-700 focus:outline-none"
          > <Link
            to={'/request-single/'+task.id}
            aria-label="More Info"
            >...Развернуть...</Link>
          </span>
        )}
      </p>
      <div className='flex justify-between '>
        <div>
          <p className="text-sm mb-2 text-gray-800">{task.type}</p>
          <p className="text-sm mb-2 text-gray-800">{task.location}</p>
          <p className="text-sm  text-gray-800">{task.contact}</p>
        </div>
      </div>
        {
          (task.latestcomment!=null)&&
          (
            <Link
            to={'/request-single/'+task.id}
            aria-label="More Info"
          >
          
              <div className='flex justify-between items-start hover:text-red-800 mt-4 items-center space-x-2 text-gray-700  font-bold '>
                <div className='bg-blue-200 w-11 h-10 rounded-full flex items-center justify-center'>      
                  <label for="type" className="block text-l ">{task.latestcommentby[0]}</label>
                </div>
                <p className="border rounded w-full py-2 px-3 text-sm text-gray-700">
                  {task.latestcomment}
                </p>
              
              </div>
              </Link>
          )
        }
        <div 
            onClick={archiveTask}
            className=' flex items-center text-gray-600 hover:text-gray-900 focus:outline-none mt-4 space-x-2 cursor-pointer'
        >
        <BsArchive 
            size={19}
          />

        <p>Вернуть</p>
        </div>
      </>)  
    }
    </>)
  }
  
  
  //Тип Место Контакт
  
  const getStatusClass = (status) => {
      switch (status) {
        case 'pending':
          return ['text-blue-500 hover:text-blue-800', 'text-green-500 hover:text-green-800' , 'inprogress', 'completed'];
        case 'inprogress':
          return ['text-orange-500 hover:text-orange-800', 'text-green-500 hover:text-green-800', 'pending', 'completed'];
        case 'completed':
          return ['text-orange-500 hover:text-orange-800','text-blue-500 hover:text-blue-800', 'pending', 'inprogress'];
        default:
          return 'text-gray-500';
      }
    };

export default TaskArchived