// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import TaskSingle from '../components/TaskSingle';

const Kanban = () => {
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
    <div className="container mx-auto p-4 mt-10">
      {/* <h1 className="text-2xl font-bold mb-4">Task List</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Tasks Column */}
        <div>
          <h2 className="text-3xl font-semibold mb-2">Ожидается</h2>
          {tasks.pending.map((task) => (
            <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <TaskSingle task={task} />
            </div>
          ))}
        </div>

        {/* In Progress Tasks Column */}
        <div>
          <h2 className="text-3xl font-semibold mb-2">В процессе</h2>
          {tasks.inprogress.map((task) => (
            <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <TaskSingle task={task} />
            </div>
          ))}
        </div>

        {/* Completed Tasks Column */}
        <div>
          <h2 className="text-3xl font-semibold mb-2">Завершено</h2>
          {tasks.completed.map((task) => (
            <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <TaskSingle task={task} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default Kanban;
