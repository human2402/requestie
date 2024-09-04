// // src/components/TaskList.js
// import React from 'react';

// const TaskList = ({ tasks }) => {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Task List</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {tasks.map((task) => (
//           <div key={task.id} className="bg-white shadow-md rounded-lg p-4">
//             <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
//             <p className="text-sm text-gray-500 mb-2">{task.time}</p>
//             <p className={`text-sm mb-2 ${getStatusClass(task.status)}`}>
//               Status: {task.status}
//             </p>
//             <p className="text-sm mb-2">Type: {task.type}</p>
//             <p className="text-sm mb-2">Location: {task.location}</p>
//             <p className="text-sm mb-2">Contact: {task.contact}</p>
//             <p className="text-sm text-gray-700">{task.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const getStatusClass = (status) => {
//   switch (status) {
//     case 'Pending':
//       return 'text-yellow-500';
//     case 'Completed':
//       return 'text-green-500';
//     case 'In Progress':
//       return 'text-blue-500';
//     default:
//       return 'text-gray-500';
//   }
// };

// export default TaskList;

// src/components/TaskList.js
import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState({ pending: [], inprogress: [], completed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/requests/');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Tasks Column */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Pending</h2>
          {tasks.pending.map((task) => (
            <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <TaskCard task={task} />
            </div>
          ))}
        </div>

        {/* In Progress Tasks Column */}
        <div>
          <h2 className="text-xl font-semibold mb-2">In Progress</h2>
          {tasks.inprogress.map((task) => (
            <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <TaskCard task={task} />
            </div>
          ))}
        </div>

        {/* Completed Tasks Column */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Completed</h2>
          {tasks.completed.map((task) => (
            <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({ task }) => (
  <div className="text-left">
    <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
        <p className="text-xs text-gray-500">ID: {task.id}</p>
    </div>
    <div className="flex justify-between items-start mb-2">
    <p className={`text-sm mb-2 ${getStatusClass(task.status)}`}> {task.status}</p>
    <p className="text-sm text-gray-600 mb-2">{task.time}</p>
    </div>
    <p className="text-sm mb-2 text-gray-800">Type: {task.type}</p>
    <p className="text-sm mb-2 text-gray-800">Location: {task.location}</p>
    <p className="text-sm mb-2 text-gray-800">Contact: {task.contact}</p>
    <p className="text-sm text-gray-900">{task.description}</p>
</div>





);

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
