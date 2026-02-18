import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import arrow from '../assets/Images/left-arrow.png'
import { getTask, updateTask } from '../services/taskService'
import userContext from '../context/userContext'
import { toastError, toastSuccess } from '../services/toast'


const TaskFilter = () => {

  const priority = ["Low", "Medium", "High"]
  const user = useContext(userContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [allTask, setAllTask] = useState([])
  const task = location.state.Task
  
  const fetchTask = async () => {

    const result = await getTask(user.id)
    const { tasks, assignTo } = result.result
    setAllTask(tasks)

  }

  useEffect(() => {

    if (user) {

      fetchTask()

    }

  }, [user])

  const getDate = (storeDate) => {

    const date = new Date(storeDate)
    const day = String(date.getDate()).padStart(2, 0)
    const month = String(date.getMonth() + 1).padStart(2, 0)
    const year = date.getFullYear()
    return `${day}-${month}-${year}`

  }

  const updateTaskStatus = async (id, task, assignTo, status) => {
  
      try {
  
        const result = await updateTask(id, task, assignTo, status)
  
        if (result.success) {
  
          toastSuccess(`Mark task as a ${status}ed`)
  
          fetchTask()
  
        }
        else {
  
          toastError('Try again later')
  
        }
  
      }
      catch (err) {
  
        toastError("Server error try again later " +err.message)
  
      }
  
    }
  


  return (

    <>

      <span className='flex justify-start items-center text-[15px] my-5 cursor-pointer' onClick={() => { navigate('/dashboard/employee') }}><img src={arrow} className='h-[10px] mr-1 invert' />back</span>

      <div className=' py-5 h-[90%]'>

        <div className='h-[60%]  mt-20 w-full flex gap-5 overflow-x-auto'>

          {allTask && allTask.map((item, i) => {

            {

              if (item.status == task) {

                return <div key={i} className={`${task == 'pending' ? 'bg-blue-400' : (task == 'accept' ? 'bg-yellow-400' : (task == 'complete' ? 'bg-green-400' : 'bg-red-400'))}  h-full w-[424px] shrink-0 rounded-2xl p-8 relative flex flex-col justify-between overflow-hidden`}>
                  <div>
                    <div className='flex items-center justify-between'>

                      <h2 className='bg-red-600 px-4 py-1 font-semibold rounded-md shadow-lg/40'>{priority[item.priority]}</h2>
                      <h3 className='border font-medium px-3 rounded-md py-1'>{getDate(item.dueDate)}</h3>

                    </div>

                    <h2 className='text-2xl mt-16 font-bold text-shadow-lg'>{item.title}</h2>
                    <p className='text-md mt-3 overflow-y-auto text-shadow-sm font-medium '>{item.desc}</p>

                  </div>

                  <div>

                  {item.status == 'pending' && <button className='rounded-lg w-full bg-blue-50 text-black font-semibold py-1 mb-3 shadow-lg/40 active:shadow-none active:inset-shadow-sm/30' onClick={() => updateTaskStatus(item._id, item, user.id, 'accept')}>Accept</button>}
                {item.status == 'accept' && <div className='w-full flex gap-2 items-center'> <button className='rounded-lg w-1/2 bg-blue-50 text-black font-semibold py-1 mb-3 shadow-lg/40 active:shadow-none active:inset-shadow-sm/30' onClick={() => updateTaskStatus(item._id, item, user.id, 'complete')}>Complete</button>
                  <button className='rounded-lg w-1/2 bg-blue-50 text-black font-semibold py-1 mb-3 shadow-lg/40 active:shadow-none active:inset-shadow-sm/30' onClick={() => updateTaskStatus(item._id, item, user.id, 'failed')}>Failed</button></div>}
                {(item.status == 'complete'||item.status=='failed') && <div className='w-full flex gap-2 items-center'> <button className='rounded-lg w-full bg-blue-50 text-black font-semibold py-1 mb-3 shadow-lg/40 active:shadow-none active:inset-shadow-sm/30' onClick={() => updateTaskStatus(item._id, item, user.id, 'accept')}>Reopen</button></div>}

                  </div>

                </div>

              }

            }

          }

          )}

        </div>

      </div>

    </>

  )

}

export default TaskFilter
