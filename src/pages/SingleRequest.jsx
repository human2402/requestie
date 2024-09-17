import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FaDotCircle } from "react-icons/fa";
import CommentSingle from '../components/CommentSingle';
import MakeComment from '../components/MakeComment';
import { toast } from 'react-toastify';

function SingleRequest({ user }) {
    const navigate = useNavigate()
    const { id } = useParams();
    const [status, setStatus] = useState ('')
    const [time, setTime] = useState ('')
    const [title, setTitle] = useState ('')
    const [type, setType] = useState ('')
    const [description, setDescription] = useState ('')
    const [location, setLocation] = useState ('')
    const [contact, setContact] = useState ('')
    const [latestComment, setLatestComment] = useState('')

    const [comments, setComments] = useState ([])

    const hasShownToast = useRef(false);
    
    const addComment = (newComment) => {
        const isSupport = (user.role != '') ? (1) : (0)
        let oldComments = comments
        oldComments.push({
            ...newComment,
            created: "Сейчас",
            fromsupport: isSupport
        })
        setComments (oldComments)
        setLatestComment('!')
    }


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('/api/comments/'+id);
                if (!response.ok) {
                  throw new Error('Failed to fetch tasks');
                  setTime(0)
                }
                const data = await response.json();
                setComments (data)
              } catch (err) {
                
                setError(err.message);
              } finally {
                setLoading(false);
              }
            
        }

        const fetchTasks = async () => {
          try {
            const response = await fetch('/api/request/'+id);
            if (!response.ok) {
                if (!hasShownToast.current) {
                    hasShownToast.current = true; // Set flag to true to prevent future toasts
                    toast.error('Запрос #' + id + " не найден");
                    navigate("/request-search");
                }
              setTime(0)
            }
            const data = await response.json();
            setTime(data.time)
            setStatus(data.status)
            setTitle(data.title)
            setType(data.type)
            setDescription(data.description)
            setLocation(data.location)
            setContact(data.contact)
            setStatus(data.status)
            setLatestComment(data.latestcomment)
            if (data.latestcomment != null) {fetchComments()}
          } catch (err) {

            
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchTasks();
      }, []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  return (
    <section className="">
    <div className="container m-auto max-w-2xl py-24 pb-1">
      <div className="bg-white px-6 py-8 mb-1 shadow-md rounded-md border m-1 md:m-0">
        
            <>
            <p className="text-sm text-gray-600">{time}</p>
                <form >
                  <h2 className="text-3xl text-gray-600 text-center font-semibold mb-6"> Запрос #{id}</h2>
                  <div className="mb-4">
                    
                    <label for="type" className="block text-gray-700  font-bold mb-2">Вид</label>
                    <p className="border rounded w-full py-2 px-3  text-gray-700">
                        {type}
                    </p>
                  </div>
        
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Заголовок</label>
        
                    <p className="border rounded w-full py-2 px-3  text-gray-700">
                        {title}
                    </p>
                  </div>
                  <div className="mb-4">
                    <label
                      for="description"
                      className="block text-gray-700 font-bold mb-2"
                      >Описание</label
                    >
                    <p className="border rounded w-full py-2 px-3  text-gray-700">
                        {description}
                    </p>
                  </div>
        
                  <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2'>
                      Местоположение
                    </label>
                    <p className="border rounded w-full py-2 px-3  text-gray-700">
                        {location}
                    </p>
                  </div>
        
        
                  <div className="mb-4">
                    <label for="company" className="block text-gray-700 font-bold mb-2"
                      >Контакт</label
                    >
                    <p className="border rounded w-full py-2 px-3  text-gray-700">
                        {contact}
                    </p>
                  </div>
        
                      {
                          (status == 'pending') &&
                          (
                              <div className='flex items-center '>
                                  <FaDotCircle  
                                  size={40}  
                                  className={`text-orange-500 flex items-center pr-2`}
                                  />
                                  <h2 className="text-3xl font-semibold ">Ожидается</h2>
                              </div>
                          )
                      }{
                          (status == 'inprogress') && (
                              <div className='flex items-center '>
                                  <FaDotCircle  
                                  size={40}  
                                  className={`text-blue-500 flex items-center pr-2 `}
                                  />
                                  <h2 className="text-3xl font-semibold">В процессе</h2>
                              </div>
                          )
                      }{
                          (status == 'completed') && (
                              <div className='flex items-center '>
                                  <FaDotCircle  
                                  size={40}  
                                  className={`text-green-500 flex items-center pr-2 `}
                                  />
                                  <h2 className="text-3xl font-semibold">Завершено</h2>
                              </div>  
                          )
                      }
                </form>
                </>
        
        
      </div>
    </div>
    <div className="container m-auto max-w-2xl py-24 pt-2">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            {comments.map(comment => (
                <CommentSingle comment = {comment} />
            ))}
            {
                (latestComment!=null)&&
                (
                    <div className='bg-gray-400 w-100 h-1 mb-4 mt-2 rounded-md' ></div>
                )
            }
        <MakeComment  user = {user} id = {id} addComment = {addComment} name = {contact}/>
        </div>

    </div>
  </section>
  
  )
}

export default SingleRequest
