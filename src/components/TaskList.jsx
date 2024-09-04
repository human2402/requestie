// src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{task.time}</p>
            <p className={`text-sm mb-2 ${getStatusClass(task.status)}`}>
              Status: {task.status}
            </p>
            <p className="text-sm mb-2">Type: {task.type}</p>
            <p className="text-sm mb-2">Location: {task.location}</p>
            <p className="text-sm mb-2">Contact: {task.contact}</p>
            <p className="text-sm text-gray-700">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-500';
    case 'Completed':
      return 'text-green-500';
    case 'In Progress':
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
};

export default TaskList;
