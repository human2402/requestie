import React from 'react'

const TaskSingle = ({ task }) => (
    <div className="text-left">
      <div className="flex justify-between items-start mb-2">
        <p className="text-xs text-gray-500">ID: {task.id}</p>
        <p className="text-sm text-gray-600">{task.time}</p>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2"> 
        <span className={`  ${getStatusClass(task.status)}`}>•   </span>
        {task.title}
      </h2>
      <p className="text-sm mb-2 text-gray-800">Type: {task.type}</p>
      <p className="text-sm mb-2 text-gray-800">Location: {task.location}</p>
      <p className="text-sm mb-2 text-gray-800">Contact: {task.contact}</p>
      <p className="text-sm text-gray-900">{task.description}</p>
  </div>
)

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