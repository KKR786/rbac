import React from 'react'

function Profile() {
  return (
    <div className='p-4 flex items-center justify-center'>
      <div className="w-1/2 border border-solid border-gray-700 rounded-md box">
        <div className="p-3 flex flex-col">
        <div class="flex justify-center items-center mb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s" alt="User DP" className='text-center rounded-full w-28 h-28'/>
          </div>
          <h1 className="text-2xl mb-2 text-center font-bold">KKR</h1>
          <span>Email: </span>
          <span>Role: </span>
          <span>Phone: </span>
          <span>Address: </span>
        </div>
      </div>
    </div>
  )
}

export default Profile
