import React, { useContext, useEffect, useState } from 'react'
import { getTask, updateTask } from '../services/taskService'
import userContext from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastError, toastSuccess } from '../services/toast'


const EmpDashboard = () => {

  const user = useContext(userContext)
  const priority = ["Low", "Medium", "High"]
  const navigate = useNavigate()
  const [task, setTask] = useState([])
  const [newCount, setNewCount] = useState(0)
  const [acceptCount, setAcceptCount] = useState(0)
  const [completeCount, setCompleteCount] = useState(0)
  const [failedCount, setFailedCount] = useState(0)
  const [overDueTaskId, setOverDueTaskId] = useState([])
  const [showAllTask, setShowAllTask] = useState(false)
  const [defaultColor, setDefaultColor] = useState(false)

  const fetchTask = async () => {

    try {

      const result = await getTask(user.id)
      const { tasks, assignTo } = result.result
      setTask(tasks)

    }
    catch (err) {

      toastError("Server error can't load data")

    }

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

  useEffect(() => {

    if (task.length) {

      const today = new Date()
      const overDuesId = task.filter(t => new Date(t.dueDate) < today && t.status != 'complete' && t.status != 'failed' && t.status != 'overdue').map(t => t._id)
      setOverDueTaskId(overDuesId)
      const newTasks = task.filter(t => t.status == 'pending')
      setNewCount(newTasks.length)
      const acceptCount = task.filter(t => t.status == 'accept')
      setAcceptCount(acceptCount.length)
      const completeCount = task.filter(t => t.status == 'complete')
      setCompleteCount(completeCount.length)
      const failedCount = task.filter(t => t.status == 'failed')
      setFailedCount(failedCount.length)

    }

  }, [task])

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

      toastError("Server error try again later ")

    }

  }

  return (

    <>

      <section className='flex mt-10 justify-between gap-5 w-full md:flex-row flex-col sm:flex-wrap lg:flex-nowrap'>

        <div onClick={() => navigate('/dashboard/taskfilter', { state: { Task: "pending" } })} className='bg-blue-400 md:p-10 p-5 md:w-[48%] lg:w-[25%] rounded-2xl cursor-pointer'>

          <h2 className='xl:text-3xl text-xl font-semibold'>{newCount}</h2>
          <h3 className='xl:text-xl text-lg font-medium'>New Task</h3>

        </div>

        <div onClick={() => navigate('/dashboard/taskfilter', { state: { Task: "accept" } })} className='bg-yellow-400 md:p-10 p-5  lg:w-[25%] md:w-[48%] rounded-2xl cursor-pointer'>

          <h2 className='xl:text-3xl text-xl  font-semibold'>{acceptCount}</h2>
          <h3 className='xl:text-xl text-lg  font-medium'>Accepted</h3>

        </div>

        <div onClick={() => navigate('/dashboard/taskfilter', { state: { Task: "complete" } })} className='bg-green-400 md:p-10 p-5  lg:w-[25%] md:w-[48%] rounded-2xl cursor-pointer'>

          <h2 className='xl:text-3xl text-xl  font-semibold'>{completeCount}</h2>
          <h3 className='xl:text-xl text-lg  font-medium'>completed</h3>

        </div>

        <div onClick={() => navigate('/dashboard/taskfilter', { state: { Task: "failed" } })} className='bg-red-400 md:p-10 p-5  lg:w-[25%] md:w-[48%] rounded-2xl cursor-pointer'>

          <h2 className='xl:text-3xl text-xl  font-semibold'>{failedCount}</h2>
          <h3 className='xl:text-xl text-lg  font-medium'>Failed</h3>

        </div>

      </section>

      <button className='mt-16 font-semibold active:inset-shadow-sm/30 px-5 rounded bg-teal-600 cursor-pointer py-2' onClick={() => setShowAllTask(!showAllTask)}>{showAllTask ? 'hide' : 'show all'}</button>
      <button className='mt-16 font-semibold active:inset-shadow-sm/30 px-5 mx-4 rounded bg-teal-600 cursor-pointer py-2' onClick={() => setDefaultColor(!defaultColor)}>{defaultColor ? 'Colored Theme' : 'Default Theme'}</button>
      <div className='md:h-[50%] h-[40%] lg:h-[55%] 2xl:h-[430px] mt-3 flex-col lg:flex-row flex gap-5 overflow-x-auto'>
        {task && task.map((item) => {


          {

            if (!showAllTask && !(item.status == 'pending' || item.status == 'accept')) {
              // bg-teal-600
              return null
            }

            return <div key={item._id} className={` ${defaultColor ? 'bg-teal-600' : (item.status == 'pending' ? 'bg-blue-400' : (item.status == 'accept' ? 'bg-yellow-400' : (item.status == 'complete' ? 'bg-green-400' : 'bg-red-400')))} h-full w-full  lg:w-[424px] shrink-0 rounded-2xl p-8 relative flex flex-col justify-between overflow-hidden`}>
              <div>

                {overDueTaskId.includes(item._id) && <h1 className='xl:text-xl text-lg font-semibold mb-3 text-center bg-red-600 absolute top-0 left-0 w-full'>overdue</h1>}

                <div className='flex items-center justify-between'>

                  <h2 className='bg-red-600 px-4 py-1 font-semibold rounded-md shadow-lg/40'>{priority[item.priority]}</h2>
                  <h3 className='border font-medium px-3 rounded-md py-1'>{getDate(item.dueDate)}</h3>

                </div>

                <h2 className='md:text-2xl text-lg mt-16 font-bold text-shadow-lg'>{item.title}</h2>
                <p className='md:text-lg text-sm mt-3 overflow-y-auto text-shadow-sm font-medium '>{item.desc}</p>

              </div>

              <div>

                {item.status == 'pending' && <button className='rounded-lg w-full bg-blue-50 text-black font-semibold py-1 mb-3 shadow-lg/40 active:shadow-none active:inset-shadow-sm/30' onClick={() => updateTaskStatus(item._id, item, user.id, 'accept')}>Accept</button>}
                {item.status == 'accept' && <div className='w-full flex gap-2 items-center'> <button className='rounded-lg w-1/2 bg-blue-50 text-black font-semibold py-1 mb-3 shadow-lg/40 active:shadow-none active:inset-shadow-sm/30' onClick={() => updateTaskStatus(item._id, item, user.id, 'complete')}>Complete</button>
                  <button className='rounded-lg w-1/2 bg-blue-50 text-black font-semibold py-1 mb-3 shadow-lg/40 active:shadow-none active:inset-shadow-sm/30' onClick={() => updateTaskStatus(item._id, item, user.id, 'failed')}>Failed</button></div>}
                {(item.status == 'complete'||item.status=='failed') && <div className='w-full flex gap-2 items-center'> <button className='rounded-lg w-full bg-blue-50 text-black font-semibold py-1 mb-3 shadow-lg/40 active:shadow-none active:inset-shadow-sm/30' onClick={() => updateTaskStatus(item._id, item, user.id, 'accept')}>{`Reopen (status : ${item.status})`}</button></div>}

              </div>

            </div>

          }

        }

        )}

      </div>

    </>

  )

}

export default EmpDashboard
