// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import TaskSingle from '../components/TaskSingle';
import { FaInfoCircle, FaDotCircle, FaArchive  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Kanban = ({user}) => {
  const [tasks, setTasks] = useState({ pending: [], inprogress: [], completed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nav = useNavigate()

  const API_URL = import.meta.env.DEV
      ? '/api'
      : import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user.role == '') {
      nav('/sign-in')
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch(`/${API_URL}/requests/`);
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

  const moveTask = async (task, newStatus) => {
    const oldStatus = task.status;
  
    // Clone the existing tasks object and ensure arrays for old and new statuses
    const updatedTasks = {
      ...tasks,
      [oldStatus]: [...(tasks[oldStatus] || [])],
      [newStatus]: [...(tasks[newStatus] || [])],
    };
  
    // console.log("Before update:", updatedTasks);
  
    // Remove the task from the old status array
    updatedTasks[oldStatus] = updatedTasks[oldStatus].filter((t) => t.id !== task.id);
  
    // Create a copy of the task with the new status
    const updatedTask = { ...task, status: newStatus };
  
    // Add the task to the new status array
    updatedTasks[newStatus].push(updatedTask);
  
    // console.log("After update (before state):", updatedTasks);
  
    // Update the state to reflect the optimistic UI change
    setTasks(updatedTasks);
    
    // console.log("State after update:", tasks);
  
    const API_URL = import.meta.env.DEV
      ? '/api'
      : import.meta.env.VITE_API_URL;

    try {
      // Send the updated status to the server
      const response = await fetch(`/${API_URL}/request-edit-status/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newStatus: newStatus,
          sessionID: user.sessionID,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task status on the server');
      }
    } catch (err) {
      // Handle error and rollback changes
      setError(err.message);
  
      // Roll back the task if the update fails
      const rollbackTasks = {
        ...tasks,
        [newStatus]: updatedTasks[newStatus].filter((t) => t.id !== task.id),
        [oldStatus]: [...(tasks[oldStatus] || []), task],
      };
  
      setTasks(rollbackTasks);
    }
  };
  
  
  
  function getGreeting() {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 5 && currentHour < 12) {
      return 'Доброе утро';  // Good morning
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Добрый день';  // Good afternoon
    } else {
      return 'Добрый вечер'; // Good evening
    }
  }


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-1 mt-10">
      <div className="flex justify-between items-start mb-5 mx-5 "> 
        <h1 className="text-4xl">{getGreeting() + ", " + user.firstName}</h1>
        <Link
          to={'/request-archive'}
          className="text-gray-600 hover:text-gray-900 focus:outline-none ml-2"
          aria-label="More Info"
        >
          <FaArchive  
            size={35} 
          />
        </Link>
      </div>
      {/* <h1 className="text-2xl font-bold mb-4">Task List</h1> */}
      <div className="grid grid-cols-1  md:grid-cols-3 gap-1">
        {/* Pending Tasks Column */}
        <div className='bg-orange-100 rounded-lg p-2'>
          <div className='flex items-center p-2 '>
            <FaDotCircle  
              size={40}  
              className={`text-orange-500 flex items-center pr-2 mb-2`}
            />
            <h2 className="text-3xl font-semibold mb-2">Ожидается</h2>
          </div>
          {tasks.pending.map((task) => (
            <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <TaskSingle user={user} task={task} moveTask = {moveTask} />
            </div>
          ))}
        </div>

        {/* In Progress Tasks Column */}
        <div className='bg-blue-100 rounded-lg p-2'>
          <div className='flex items-center p-2'>
            <FaDotCircle  
              size={40}  
              className={`text-blue-500 flex items-center pr-2 mb-2`}
            />
            <h2 className="text-3xl font-semibold mb-2">В процессе</h2>
          </div>
          {tasks.inprogress.map((task) => (
            <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <TaskSingle user={user} task={task} moveTask = {moveTask} />
            </div>
          ))}
        </div>

        {/* Completed Tasks Column */}
        <div className='bg-green-100 rounded-lg p-2' >
          <div className='flex items-center p-2'>
            <FaDotCircle  
              size={40}  
              className={`text-green-500 flex items-center pr-2 mb-2`}
            />
            <h2 className="text-3xl font-semibold mb-2">Завершено</h2>
          </div>
          {tasks.completed.map((task) => (
            <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <TaskSingle user={user} task={task} moveTask = {moveTask} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default Kanban;
