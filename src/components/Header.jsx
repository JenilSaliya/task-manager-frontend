import React from 'react'

const Header = ({ name, logout }) => {

  return (

    <div className='w-full flex justify-between items-center'>

      <div className='text-xl'><div>Hello</div><div>{name} 👋</div></div>
      <button className='bg-red-700 rounded-lg px-6 py-2 cursor-pointer text-center text-md font-semibold hover:bg-orange-700' onClick={() => logout()}>Logout</button>

    </div>

  )

}

export default Header
