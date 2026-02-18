import { getUser, loginCheck } from '../services/authService'
import React, { useEffect, useState } from 'react'
import hidden from '../assets/Images/hidden.png'
import { useNavigate } from 'react-router-dom'
import eye from '../assets/Images/eye.png'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie';
import { toastError, toastSuccess } from '../services/toast'

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState([])
  const navigate = useNavigate()

  const handleShowPass = () => {

    const confirmed = confirm(showPassword ? 'Hide password?' : 'Show password?');

    if (confirmed) {

      setShowPassword(!showPassword);

    }

  }

  const {

    register,
    handleSubmit,
    formState: { errors, isSubmitting },

  } = useForm()


  const onSubmit = async (data) => {

    try {

      const result = await loginCheck(data)

      if (result.success) {

        toastSuccess(result.message)

        Cookies.set('user', JSON.stringify({ id: result.result._id, name: result.result.name }), { expires: 1, path: '/' })

        navigate('/dashboard')

      }
      else {

        toastError(result.message)

      }

    }
    catch (err) {

      toastError("Server error try again later " + err.message)

    }

  }

  useEffect(() => {

    const storedUser = Cookies.get('user')

    if (storedUser) {

      setUser(JSON.parse(storedUser))

    }
    else {

      setUser(null)

    }

  }, [])


  useEffect(() => {

    if (!user) {

      navigate('/login')

    } else if (user) {

      if (user.name == 'admin') {

        navigate('/dashboard/admin')

      }
      else {

        navigate('/dashboard/employee')

      }

    }

  }, [user, navigate, location])

  return (

    <div className='w-screen h-screen flex items-center flex-col justify-center text-white'>

      <span className='flex justify-start items-center text-[15px] my-5 cursor-pointer' onClick={() => { navigate('/') }}>{`< Home`}</span>
      <div className='border border-emerald-400 flex items-center justify-center flex-col rounded-2xl md:p-20 p-5 '>

        <h1 className='text-3xl font-bold my-4'>Login</h1>
        <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit(onSubmit)}>

          <input type='email' {...register("email", { required: { value: true, message: "Enter email" } })} className='placeholder-gray-400 px-6 my-2 outline-none border-emerald-300 border py-2 rounded-4xl' placeholder='Enter email' />
          {errors.email && <div className='text-red-600 text-[12px] text-left'>{errors.email.message}</div>}
          <div className=' relative flex  flex-col justify-center'>

            <img src={showPassword ? eye : hidden} alt="show pass icon" className='absolute w-4 right-4 cursor-pointer invert' onClick={() => { handleShowPass() }} />
            <input type={showPassword ? 'text' : "password"} {...register("password", { required: { value: true, message: "Enter password" } })} className='placeholder-gray-400 px-6 my-2 outline-none border-emerald-300 border py-2 rounded-4xl' placeholder='Enter password' />
            {errors.password && <div className='text-red-600 text-[12px] text-left'>{errors.password.message}</div>}

          </div >

          <button disabled={isSubmitting} type='submit' className='disabled:bg-emerald-400 bg-emerald-600 px-8 hover:bg-emerald-700 border-none font-semibold text-lg my-4 w-full outline-none py-2 rounded-full cursor-pointer'>{isSubmitting ? "Login..." : "Login"}</button>

        </form>

      </div>

    </div>

  )

}

export default Login