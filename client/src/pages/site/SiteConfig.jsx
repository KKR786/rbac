import React from 'react'

function SiteConfig() {
  return (
    <div className='p-4'>
      <div className="flex justify-between items-center border-b-2 border-solid border-[#eee] pb-2">
        <h1 className="text-3xl font-bold text-gray-900">Site</h1>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={() => setModalOpen(true)}
        >
          Add New Site
        </button>
      </div>
    </div>
  )
}

export default SiteConfig
