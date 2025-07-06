// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import TaskSingle from '../components/TaskSingle';
import { FaInfoCircle, FaDotCircle, FaAngleLeft  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TaskArchived from '../components/TaskArchived';

function ArchivePage({ archivedTasks, user }) {
  const [tasks, setTasks] = useState({ pending: [], inprogress: [], completed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.DEV
      ? '/api'
      : import.meta.env.VITE_API_URL;

  const nav = useNavigate()
  
  useEffect(() => {
    // if (user.role == '') {
    //   nav('/sign-in')
    // }

    const fetchTasks = async () => {
      try {
        const response = await fetch(`/${API_URL}/requests-archived`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        console.log(data)
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);


  return (
    <div className="container mx-auto p-1 mt-10">
      <div className="flex justify-between items-start mb-5 mx-5"> 
        
        <Link
          to={'/kanban'}
          className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none ml-2"
          aria-label="Go Back"
        >
          <FaAngleLeft size={35} />
          <h1 className="text-4xl">Канбан</h1>
        </Link>
      </div>

      {/* Grid for archived tasks */}
      
      <div className='bg-gray-100 rounded-lg p-4 '>
        <h2 className="text-3xl font-semibold mb-2 ml-2">Архивированные задачи</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <TaskArchived user={user} task={task} />
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-600 col-span-3">No archived tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArchivePage