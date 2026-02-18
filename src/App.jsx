import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppRoutes from "./routes/AppRoutes"



function App() {

  return (

    <>

      <BrowserRouter>

        <AppRoutes />
        <ToastContainer />

      </BrowserRouter>

    </>

  )
  
}

export default App
