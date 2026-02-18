import { createUser, deleteUser, getUser, updateUser } from '../services/authService'
import { toastError, toastSuccess } from '../services/toast'
import React, { useEffect, useState } from 'react'
import hidden from '../assets/Images/hidden.png'
import eye from '../assets/Images/eye.png'
import { useForm } from 'react-hook-form'

const CreateUser = () => {

  const [users, setUsers] = useState([])
  const [updateRequest, setUpdateRequest] = useState(false)
  const [updateUserId, setUpdateUserId] = useState("")
  const [showPassword, setShowPassword] = useState(false);

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

  const resetAll = () => {

    setUpdateRequest(false)
    setUpdateUserId("")
    reset({ name: "" })

  }

  const reqUpdateUser = (item) => {

    reset({

      name: item.name,
      email: item.email,
      password: item.password

    })

    setUpdateRequest(true)
    setUpdateUserId(item._id)

  }

  const deleteUserReq = async (item) => {

    const confirmed = confirm("Sure you want to delete " + item.name)

    if (confirmed) {

      try {

        const result = await deleteUser(item._id)

        if (result.success) {

          toastSuccess(result.message)

          fetchUser()

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

    fetchUser()

  }, [])

  const handleShowPass = () => {

    const confirmed = confirm(showPassword ? 'Hide password?' : 'Show password?');

    if (confirmed) {

      setShowPassword(!showPassword);

    }

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

        const result = await updateUser(updateUserId, data)

        if (result.success) {
          toastSuccess(result.message)

          setUpdateRequest(false)
          setUpdateUserId("")
          reset({ name: "" })
          fetchUser()

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

      if (data.name.toLowerCase() == 'admin' || data.email.toLowerCase() == 'admin@gmail.com') {

        return toastError("don't try to create admin")

      }
      try {

        const result = await createUser(data)

        if (result.success) {

          toastSuccess(result.message)

          reset()
          fetchUser()

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

  return (

    <>

      <form onSubmit={handleSubmit(onSubmit)} className='h-[258px] w-full  flex items-center justify-center flex-col'>

        {updateRequest && <div className='cursor-pointer' onClick={() => resetAll()}>{'<'} back</div>}

        <div>

          <h3 className='text-sm text-gray-300 mb-0.5 mt-1'>Employee name</h3>
          <input type="text" className='text-sm py-1 w-full rounded outline-none bg-transparent border-[1px] px-2 border-gray-400' {...register('name', { required: { value: true, message: 'Enter employee name' } })} placeholder='Enter name' />
          {errors.name && <div className='text-sm text-red-500'>{errors.name.message}</div>}

        </div>

        <div>

          <h3 className='text-sm text-gray-300 mb-0.5 mt-1'>Employee email</h3>
          <input type="email" className='text-sm py-1 w-full rounded outline-none bg-transparent border-[1px] px-2 border-gray-400' {...register('email', { required: { value: true, message: 'Enter employee email' } })} placeholder='Enter email' />
          {errors.email && <div className='text-sm text-red-500'>{errors.email.message}</div>}

        </div>

        <div >

          <h3 className=' text-sm text-gray-300 mb-0.5 mt-1 '>Employee password</h3>
          <div className=' relative flex  flex-col justify-center'>

            <img src={showPassword ? eye : hidden} alt="show pass icon" className={`absolute w-4 right-2 cursor-pointer invert ${errors.password && 'mb-5'} `} onClick={() => { handleShowPass() }} />
            <input type={showPassword ? 'text' : "password"} className='text-sm py-1 w-full rounded outline-none bg-transparent border-[1px] px-2 border-gray-400' {...register('password', { required: { value: true, message: 'Enter employee password' } })} placeholder='Enter password' />
            {errors.password && <div className='text-sm text-red-500'>{errors.password.message}</div>}

          </div>

        </div>

        <button disabled={isSubmitting} className='bg-emerald-500 disabled:bg-emerald-400 py-1.5 hover:bg-emerald-600 w-[168px] rounded text-sm mt-5 cursor-pointer' type="submit">{updateRequest ? (isSubmitting ? "updating..." : "update") : (isSubmitting ? "Creating..." : "Create")}</button>

      </form>

      <div className='bg-[#1c1c1c] p-5 mt-5 overflow-auto rounded text-sm xl:text-lg h-64 '>

        <div className='bg-teal-600 lg:w-full w-[600px] py-2 px-4 font-semibold flex justify-between rounded mb-2 '>

          <div className='w-full flex justify-between items-center'>

            <h2 className='w-4/12'>Name</h2>
            <h3 className='w-5/12'>Email</h3>
            <h5 className='w-2/12'>Password</h5>

          </div>

          <h2 className='w-1/12 text-center'>Delete</h2>

        </div>

        {users && users.map((item) => {

          if (item.name != 'admin') {

            return <div key={item._id} className='bg-teal-600 lg:w-full w-[600px] py-2 px-4 flex items-center rounded mb-2 ' >
              <div className='flex justify-between w-full items-center' onClick={() => { reqUpdateUser(item) }} >
                <h2 className='w-4/12'>{item.name}</h2>
                <h3 className='w-5/12'>{item.email}</h3>
                <h5 className='w-2/12'>{"*".repeat(item.password.length)}</h5>
              </div>
              <button className='w-1/12 bg-red-500 shadow-lg/30 rounded-md py-1 cursor-pointer active:shadow-none active:inset-shadow-sm/30' onClick={() => { deleteUserReq(item) }}>Delete</button>
            </div>

          }

        })

        }

      </div>

    </>

  )

}

export default CreateUser
