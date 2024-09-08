import React from 'react'
import { FaInfoCircle, FaDotCircle } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

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

const TaskSingle = ({ task, onMoreInfo }) => (
  <>
    <div className="flex justify-between items-start mb-2">
      <p className="text-xs text-gray-500">ID: {task.id}</p>
      <p className="text-sm text-gray-600">{task.time}</p>
    </div>
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-xl font-semibold text-gray-900 flex">
        <span className={`${getStatusClass(task.status)}  flex items-center pr-2`}><FaDotCircle  size={20}/>   </span> {task.title}
      </h2>
      {/* Button with info icon */}
      <div className='flex items-center'>
        <button
          onClick={onMoreInfo}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
          aria-label="More Info"
        >
          <FaDeleteLeft size={20}  className="text-black hover:text-red-800"  />
        </button>
        <button
          onClick={onMoreInfo}
          className="text-blue-500 hover:text-blue-700 focus:outline-none ml-2"
          aria-label="More Info"
        >
          <FaInfoCircle size={20}  className="text-black hover:text-blue-800"  />
        </button>
      </div>
    </div>
    <p className="text-sm2 text-gray-900 mb-3">{task.description}</p>
    <p className="text-sm mb-2 text-gray-800">Тип: {task.type}</p>
    <p className="text-sm mb-2 text-gray-800">Место: {task.location}</p>
    <p className="text-sm  text-gray-800">Контакт: {task.contact}</p>
  </>
);

const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-red-500';
      case 'Completed':
        return 'text-green-500';
      case 'In Progress':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };
export default TaskSingle