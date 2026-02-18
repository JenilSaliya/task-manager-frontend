import AdminDashboard from "../components/AdminDashboard";
import EmpDashboard from "../components/EmpDashboard";
import TaskFilter from "../components/TaskFilter";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Home from "../pages/Home";
import CreateAdmin from "../pages/CreateAdmin";


const AppRoutes = () => {

    return (

        <Routes>

            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createAdmin" element={<CreateAdmin />} />
            <Route path="/dashboard" element={<Dashboard />} >

                <Route path="taskfilter" element={<TaskFilter />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="employee" element={<EmpDashboard />} />

            </Route>

            <Route path="/user" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />

        </Routes>

    )

}

export default AppRoutes