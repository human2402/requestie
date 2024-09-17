import React, { useState } from 'react'
import { FaExpand, FaDotCircle, FaEdit  } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// const TaskSingle = ({ task }) => (
//   //   <div className="text-left">
//   //     <div className="flex justify-between items-start mb-2">
//   //       <p className="text-xs text-gray-500">ID: {task.id}</p>
//   //       <p className="text-sm text-gray-600">{task.time}</p>
//   //     </div>
//   //     <h2 className="text-xl font-semibold text-gray-900 mb-2"> 
//   //       <span className={`  ${getStatusClass(task.status)}`}>•   </span>
//   //       {task.title}
//   //     </h2>
//   //     <p className="text-sm mb-2 text-gray-800">Type: {task.type}</p>
//   //     <p className="text-sm mb-2 text-gray-800">Location: {task.location}</p>
//   //     <p className="text-sm mb-2 text-gray-800">Contact: {task.contact}</p>
//   //     <p className="text-sm text-gray-900">{task.description}</p>
//   // </div>
// )

const TaskSingle =  ({user ,task, moveTask}) => {
  const [isDeleted, setDeleted] = useState (false) 

  let navigate = useNavigate();
  let deleteATask = async (e) => {
    const confirm = window.confirm ("Вы уверенны, что хотите удалить это размещение?")
    
    if (!confirm) return;

    e.preventDefault()
    const res = await fetch(`/api/delete-request`, {
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
    navigate('/kanban')
    return ;

    
  }


  let dotColors = getStatusClass(task.status)
  return (<>
    {(isDeleted)? 
    (<></>):
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
    <div className="flex justify-between items-center mb-3 space-x-2">
      <h2 className="text-xl font-semibold text-gray-900 flex">
         {task.title}
      </h2>
      {/* Button with info icon */}
      <div className='flex items-center'>
        {(user.role == 'admin')?
        (<><button
          onClick={deleteATask}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
          aria-label="More Info"
        >
          <FaDeleteLeft size={20}  className="text-gray-400 hover:text-red-800"  />
        </button>
        <Link
          to={'/request-edit/'+task.id}
          className="text-blue-500 hover:text-blue-700 focus:outline-none ml-2"
          aria-label="More Info"
        >
          <FaEdit size={19}  className="text-gray-400 hover:text-blue-800"  />
        </Link></>): (<></>)}
      </div>
    </div>
    <p className="text-sm2 text-gray-900 mb-3">{task.description}</p>
    <div className='flex justify-between '>
      <div>
        <p className="text-sm mb-2 text-gray-800">{task.type}</p>
        <p className="text-sm mb-2 text-gray-800">{task.location}</p>
        <p className="text-sm  text-gray-800">{task.contact}</p>
      </div>
      <div className='flex flex-col justify-end items-center'>
        <div className='flex'>
          <FaDotCircle  
            size={30}  
            className={`${dotColors[0]}  flex items-center pl-2`}
            onClick={ () => moveTask(task, dotColors[2])}
          />
          <FaDotCircle  
            size={30}  
            className={`${dotColors[1]}  flex items-center pl-2`}
            onClick={ () => moveTask(task, dotColors[3])}
          />
        </div>
      </div>
    </div>
      {
        (task.latestcomment!=null)&&
        (
          <>
            <div className='flex justify-between items-start hover:text-red-800 mt-4 items-center space-x-2 text-gray-700  font-bold '>
              <div className='bg-blue-200 w-11 h-10 rounded-full flex items-center justify-center'>      
                <label for="type" className="block text-l ">{task.latestcommentby[0]}</label>
              </div>
              <p className="border rounded w-full py-2 px-3 text-sm text-gray-700">
              {task.latestcomment}
              </p>
            
            </div>
        </>
        )
      }
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
export default TaskSingle