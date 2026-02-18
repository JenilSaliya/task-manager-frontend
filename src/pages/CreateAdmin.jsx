import React, { useEffect, useState } from 'react'
import hidden from '../assets/Images/hidden.png'
import eye from '../assets/Images/eye.png'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toastError, toastSuccess } from '../services/toast'
import { createUser, getUser } from '../services/authService'

const CreateAdmin = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const checkAdmin = async () => {

        // const { result } = await getUser()
        // result.map(i => {

        //     if (i.name == 'admin') {

        //         navigate('/login')

        //     }

        // })
        const res = await getUser();
        const result = Array.isArray(res?.result) ? res.result : [];

        result.forEach(i => {
            if (i.name === 'admin') {
                navigate('/login');
            }
        });

    }

    useEffect(() => {

        checkAdmin()

    }, [])

    const {

        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },

    } = useForm()

    const onSubmit = async (data) => {

        try {

            const result = await createUser(data)

            if (result.success) {

                navigate('/login')
                toastSuccess('admin created')

            }
            else {

                toastError(result.message)

            }

        }
        catch (err) {

            toastError("Server error try again later " + err.message)

        }

    }

    const handleShowPass = () => {

        const confirmed = confirm(showPassword ? 'Hide password?' : 'Show password?');

        if (confirmed) {

            setShowPassword(!showPassword);

        }

    }

    return (

        <div className='w-screen h-screen flex-col flex items-center justify-center text-white'>

            <span className='flex justify-start items-center text-[15px] my-5 cursor-pointer' onClick={() => { navigate('/') }}>{`< Home`}</span>
            <div className='border border-emerald-400 flex items-center justify-center flex-col rounded-2xl md:p-20 p-5 '>

                <h1 className='text-3xl font-bold my-4'>Create Admin</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='h-[258px] w-full  flex items-center justify-center flex-col'>

                    <input type="hidden" className='text-sm py-1 w-full rounded outline-none bg-transparent border-[1px] px-2 border-gray-400' {...register('name')} value={'admin'} />

                    <div>

                        <h3 className='text-sm text-gray-300 mb-0.5 mt-1'>Admin email</h3>
                        <input type="email" className='text-sm py-1 w-full rounded outline-none bg-transparent border-[1px] px-2 border-gray-400' {...register('email', { required: { value: true, message: 'Enter admin email' } })} placeholder='Enter email' />
                        {errors.email && <div className='text-sm text-red-500'>{errors.email.message}</div>}

                    </div>

                    <div >

                        <h3 className=' text-sm text-gray-300 mb-0.5 mt-1 '>Admin password</h3>
                        <div className=' relative flex  flex-col justify-center'>

                            <img src={showPassword ? eye : hidden} alt="show pass icon" className={`absolute w-4 right-2 cursor-pointer invert ${errors.password && 'mb-5'} `} onClick={() => { handleShowPass() }} />
                            <input type={showPassword ? 'text' : "password"} className='text-sm py-1 w-full rounded outline-none bg-transparent border-[1px] px-2 border-gray-400' {...register('password', { required: { value: true, message: 'Enter admin password' } })} placeholder='Enter password' />
                            {errors.password && <div className='text-sm text-red-500'>{errors.password.message}</div>}

                        </div>

                    </div>

                    <button disabled={isSubmitting} className='bg-emerald-500 disabled:bg-emerald-400 py-1.5 hover:bg-emerald-600 w-[168px] rounded text-sm mt-5 cursor-pointer' type="submit">{isSubmitting ? "Creating..." : "Create"}</button>

                </form>

            </div>

        </div>
    )
}

export default CreateAdmin
