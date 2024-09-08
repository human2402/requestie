import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import kot from '../assets/kot1.jpg';

function NotFoundPage() {
  return (
    <div className='flex justify-center h-[94vh]'>
      <section className="flex flex-col justify-center items-center text-center">
        
        <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
        <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
        <p className="text-xl mb-5">Такая страница ещё не существует!!!</p>
        <img
          src={ kot }
          alt="Тут смешной кот, но он не пришел"
          className="h-[30vh] w-auto mb-4r rounded-full  border border-gray-300"
        />
        <Link
          to="/"
          className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
        >
          Вернуться в безопасность 🥺
        </Link>
      </section>
    </div>
  );
}

export default NotFoundPage;
