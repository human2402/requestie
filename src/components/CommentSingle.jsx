import React from 'react'
import { FaLaptopMedical, FaLaptop } from "react-icons/fa";

function CommentSingle({comment}) {
  return (
    <div className="mb-4">
        <div className='flex justify-between items-start mb-2 hover:text-red-800 mb-3'>
            <div className='flex items-center space-x-2 text-gray-700  font-bold '>
                {
                    (comment.fromsupport)?
                    (<FaLaptopMedical size={29}  /> ):
                    (<FaLaptop size={29}/>)
                }
                        
                <label for="type" className="block ">{comment.username}</label>
            </div>
            <p className="text-sm text-gray-600 pt-2">{comment.created}</p>
        </div>
        <p className="border rounded w-full py-2 px-3  text-gray-700">
           {comment.maintext}
        </p>
    </div>
  )
}

export default CommentSingle
