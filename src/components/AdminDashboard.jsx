import React, { useState } from 'react'
import CreateTask from './CreateTask'
import CreateUser from './CreateUser'

const AdminDashboard = () => {

  const [activeBtn, setActiveBtn] = useState('btn1')

  return (

    <>

      <div className='bg-[#1c1c1c] mt-15  w-full p-5 rounded lg:text-lg text-xs '>

        <div className='flex items-center text-black'>

          <button className={`lg:w-1/5 w-1/2 text-xs xl:text-lg py-1 cursor-pointer md:font-semibold  ${activeBtn == 'btn1' ? 'bg-gray-400 inset-shadow-sm/50' : ' bg-gray-400'}  `} onClick={() => setActiveBtn('btn1')}>Create Task</button>
          <button className={`lg:w-1/5 w-1/2 text-xs xl:text-lg py-1 cursor-pointer md:font-semibold  ${activeBtn == 'btn2' ? 'bg-gray-400 inset-shadow-sm/50' : ' bg-gray-400'} `} onClick={() => setActiveBtn('btn2')}>Create User</button>

        </div>


        {activeBtn == 'btn1' && <CreateTask />}
        {activeBtn == 'btn2' && <CreateUser />}

      </div>

    </>

  )

}

export default AdminDashboard
