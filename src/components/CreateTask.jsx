import { createTask, deleteTask, findAssignTo, getAllTask, updateTask } from '../services/taskService'
import React, { useEffect, useState } from 'react'
import { getUser } from '../services/authService'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { toastError, toastSuccess } from '../services/toast'

const CreateTask = () => {

  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])
  const [updateRequest, setUpdateRequest] = useState(false)
  const [updateTaskId, setUpdateTaskId] = useState("")
  const priority = ["Low", "Medium", "High"]
  const [showAllTask, setShowAllTask] = useState(false)
  const [defaultColor, setDefaultColor] = useState(true)

  const fetchUser = async () => {

    try {

      const getUsers = await getUser()

      if (getUsers) {

        setUsers(getUsers.result)

      }

    }
    catch (err) {

      toastError("Server error can't load data")

    }

  }

  const fetchTask = async () => {

    try {

      const getTasks = await getAllTask()

      if (getTasks) {

        setTasks(getTasks.result)

      }

    }
    catch (err) {

      toastError("Server error can't load data")

    }

  }

  const getDate = (storeDate) => {

    const date = new Date(storeDate)
    const day = String(date.getDate()).padStart(2, 0)
    const month = String(date.getMonth() + 1).padStart(2, 0)
    const year = date.getFullYear()
    return `${day}-${month}-${year}`

  }

  const getFormateDate = (storeDate) => {

    const date = new Date(storeDate)
    const day = String(date.getDate()).padStart(2, 0)
    const month = String(date.getMonth() + 1).padStart(2, 0)
    const year = date.getFullYear()
    return `${year}-${month}-${day}`

  }

  const {

    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },

  } = useForm()

  const onSubmit = async (data) => {

    if (updateRequest) {

      try {

        const result = await updateTask(updateTaskId, data, undefined, undefined)

        if (result.success) {

          toastSuccess(result.message)

          setUpdateRequest(false)
          setUpdateTaskId("")
          reset({ title: "" })
          fetchTask()

        }
        else {

          toastError(result.message)

        }
      }
      catch (err) {

        toastError("Server error try again later")

      }

    }
    else {

      try {

        const result = await createTask(data)

        if (result.success) {

          toastSuccess(result.message)

          reset({ title: "" })
          fetchTask()

        }
        else {

          toastError(result.message)

        }

      }
      catch (err) {

        toastError("Server error try again later")

      }

    }

  }

  useEffect(() => {

    fetchTask()
    fetchUser()

  }, [])

  const reqUpdateTask = async (item) => {

    reset({

      assignTo: await findAssignTo(item._id),
      title: item.title,
      desc: item.desc,
      priority: item.priority,
      dueDate: getFormateDate(item.dueDate)

    })

    setUpdateRequest(true)
    setUpdateTaskId(item._id)

  }

  const deleteTaskReq = async (item) => {

    const confirmed = confirm("Sure you want to delete this task")

    if (confirmed) {

      try {

        const result = await deleteTask(item._id)

        if (result) {

          toastSuccess(result.message)

          fetchTask()

        }
        else {

          toastError(result.message)

        }

      }
      catch (err) {

        toastError("Server error try again later")

      }

    }

  }

  const resetAll = () => {

    setUpdateRequest(false)
    setUpdateTaskId("")
    reset({ title: "" })

  }

  return (

    <>

      <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col md:flex-row items-start justify-between flex-wrap'>

        <div className='md:w-1/2 w-full'>

          {updateRequest && <div className='cursor-pointer' onClick={() => resetAll()}>{'<'} back</div>}

          <div>

            <h3 className='text-sm text-gray-300 mt-1 mb-0.5'>Assign To</h3>

            <select className='bg-[#1c1c1c] text-white border outline-none px-2 md:w-4/5 w-full border-gray-400 py-1 rounded'{...register('assignTo', { required: { value: true, message: 'select employee' } })}>
              <option value="">Select...</option>
              {users && users.map((item) => { if (item.name != 'admin') { return <option key={item._id} value={item._id}>{item.name}</option> } })}
            </select>

            {errors.assignTo && <div className='text-sm text-red-500'>{errors.assignTo.message}</div>}

          </div>

          <div>

            <h3 className='text-sm text-gray-300 mb-0.5 mt-1'>Task title</h3>
            <input type="text" className='md:w-4/5 w-full text-sm py-1 rounded outline-none bg-transparent border-[1px] px-2 border-gray-400' {...register('title', { required: { value: true, message: 'Enter task title' } })} placeholder='Enter title' />
            {errors.title && <div className='text-sm text-red-500'>{errors.title.message}</div>}

          </div>

          <div>

            <h3 className='text-sm text-gray-300 mb-0.5 mt-1'>Due Date</h3>
            <input type="date" className='md:w-4/5 w-full text-sm py-1 rounded outline-none bg-transparent border-[1px] px-2 border-gray-400' {...register('dueDate')} />

          </div>

          <div>

            <h3 className='text-sm text-gray-300 mb-0.5 mt-1'>Priority</h3>

            <select className='bg-[#1c1c1c] text-white border outline-none border-gray-400 px-2 md:w-4/5 w-full py-1 rounded' defaultValue={0} {...register('priority')}>
              <option value={0} defaultValue={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </select>

          </div>

          <input type="hidden" className='text-sm py-1 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400' value={'pending'} {...register('status')} />

        </div>
        <div className='md:w-1/2 flex flex-col items-start'>

          <h3 className='text-sm text-gray-300 mb-0.5'>Task description</h3>
          <textarea className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400' cols={60} rows={7} {...register('desc')} ></textarea>
          <button disabled={isSubmitting} className='bg-emerald-500 disabled:bg-emerald-400 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full cursor-pointer' type="submit">{updateRequest ? (isSubmitting ? "updating..." : "update") : (isSubmitting ? "Creating..." : "Create")}</button>

        </div>

      </form>

      <button className='mt-10 font-semibold  active:inset-shadow-sm/30 px-2 md:text-sm xl:text-lg rounded bg-teal-600 cursor-pointer py-1' onClick={() => setShowAllTask(!showAllTask)}>{showAllTask ? 'hide' : 'show all'}</button>
      <button className='mt-10 font-semibold active:inset-shadow-sm/30 px-2 mx-4 md:text-sm xl:text-lg rounded bg-teal-600 cursor-pointer py-1 ' onClick={() => setDefaultColor(!defaultColor)}>{defaultColor ? 'Colored Theme' : 'Default Theme'}</button>
      <div className='bg-[#1c1c1c] mt-2 md:p-5 overflow-auto rounded relative h-64'>


        <div className='bg-teal-600  py-2 lg:px-4 px-1 2xl:text-lg text-sm font-semibold overflow-auto xl:w-full w-[900px] flex justify-between rounded mb-2 '>

          <div className='w-full flex justify-between overflow-auto  items-center'>

            <h2 className='w-1/12 shrink-0'>Priority</h2>
            <h2 className='w-3/12 shrink-0'>Title</h2>
            <h3 className='w-4/12 shrink-0'>description</h3>
            <h2 className='w-1/12 shrink-0'>Status</h2>
            <h2 className='w-1/12 shrink-0'>Created At</h2>
            <h5 className='w-1/12 shrink-0'>dueDate</h5>

          </div>

          <h2 className='text-center w-1/12 shrink-0'>Delete</h2>

        </div>

        {tasks && tasks.map((item, i) => {

          if (!showAllTask && !(item.status == 'pending' || item.status == 'accept')) {
            // bg-teal-600
            return null
          }

          return <div key={i} className={`${defaultColor ? 'bg-teal-600' : (item.status == 'pending' ? 'bg-blue-400' : (item.status == 'accept' ? 'bg-yellow-400' : (item.status == 'complete' ? 'bg-green-400' : 'bg-red-400')))} text-sm 2xl:text-lg py-2 px-1 w-[900px] xl:w-full md:flex-row lg:px-4 flex items-center rounded mb-2 gap-2`}>
            <div className='w-full flex gap-2 justify-between items-center' onClick={() => { 
              
              if(item.status=='complete' || item.status=='accept'){
                if(item.status=='accept'){
                  return toastError("task was accepted")
                }
                return toastError("can't update completed task")
              }else{
                reqUpdateTask(item)
              }

             }}>
              
              <h2 className='w-1/12'>{priority[item.priority]}</h2>
              <h2 className='w-3/12'>{item.title}</h2>
              <h3 className='w-4/12 '>{item.desc}</h3>
              <h5 className='w-1/12'>{item.status}</h5>
              <h2 className='w-1/12'>{getDate(item.createdAt)}</h2>
              <h2 className='w-1/12'>{getDate(item.dueDate)}</h2>

            </div>

            <button className='w-1/12 bg-red-500 shrink-0 shadow-lg/30 rounded-md py-1  cursor-pointer active:shadow-none active:inset-shadow-sm/30' onClick={() => { deleteTaskReq(item) }}>delete</button>

          </div>

        }

        )}

      </div>

    </>

  )

}

export default CreateTask
