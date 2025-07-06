import React, { useState, useEffect  } from 'react'
import { FaAngleRight } from "react-icons/fa";

function MakeComment({user, id, addComment, name}) {
    const [username, setUsername] = useState('')
    const [commentText, setCommentText] = useState('')

    const API_URL = import.meta.env.DEV
      ? '/api'
      : import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (user.firstName !== '') {
          setUsername(user.firstName + " " + user.secondName);
        } else {
            setUsername(name)
        }
      }, [user.firstName, user.secondName, name]);


    const submitHandler = async (e) => {
        e.preventDefault();
    console.log ("click")
        const newComment = {
          username: username,
          maintext: commentText
        };
    
        const res = await fetch(`/${API_URL}/comment-add/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newComment: newComment,
            sessionID: user.sessionID
          }),
        });

        const data = await res.json()
        console.log (res.status)

        if (res.status == 200){
            setUsername('')
            setCommentText('')
            addComment(newComment)
        }
      };
    

  return (
    <form onSubmit={ submitHandler } className="mb-4">
        
        <div className='flex justify-between items-start mb-2 hover:text-red-800 mb-3'>
            <div className='flex items-center space-x-2 text-gray-700  font-bold '>    
                <input 
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Имя"
                    required
                    value={ username }
                    onChange={ ( e ) => setUsername ( e.target.value ) }
                    className="block  border p-2 w-auto rounded-md"
                /> 
            </div>
            <p className="text-sm text-gray-600 pt-2">{user.created}</p>
        </div>
        <textarea 
            className="border rounded w-full py-2 px-3  text-gray-700"
            type="text"
            id="commenttext"
            name="commenttext"
            placeholder="Написать коментарий"
            required
            value={ commentText }
            onChange={ ( e ) => setCommentText ( e.target.value ) }
        >
        </textarea>
        <div className="flex justify-end">
            <button
                className="flex items-center justify-center text-white font-bold py-2 px-4 rounded-full mt-4 w-auto focus:outline-none focus:shadow-outline"
                type="submit"
                style={{ backgroundColor: '#ff6600' }}
            >
                Опубликовать
                <FaAngleRight className="ml-1" size={20} />
            </button>
        </div>

    </form>
  )
}

export default MakeComment
