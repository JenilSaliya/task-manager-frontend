import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import userContext from '../context/userContext'
import Header from '../components/Header'
import Cookies from 'js-cookie'


const Dashboard = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(undefined)

  useEffect(() => {

    const storedUser = Cookies.get('user')

    if (storedUser) {

      setUser(JSON.parse(storedUser))

    }
    else {

      setUser(null)

    }

  }, [navigate])

  useEffect(() => {

    if (user === undefined) return

    if (!user) {

      navigate('/login')

    }
    else if (user && location.pathname == '/dashboard') {

      if (user.name == 'admin') {

        navigate('/dashboard/admin')

      }
      else {

        navigate('/dashboard/employee')

      }

    }

  }, [user, navigate, location])

  const logout = () => {

    Cookies.remove('user')
    navigate('/login')

  }

  return (

    <>

      <userContext.Provider value={user}>

        <section className='h-screen w-screen p-4 md:p-20 overflow-auto'>

          <Header name={user ? user.name : ""} logout={logout} />
          <Outlet />

        </section>

      </userContext.Provider>

    </>

  )

}

export default Dashboard
