import {Sidebar} from "../components/sidebar/Sidebar"
import Dashboard from "../pages/dashboard/Dashboard"
import UserDetail from "../pages/users/UserDetail"
import Users from "../pages/users/Users"
import {useRoutes} from "react-router-dom"

const Router = () => {
    const routes = [
        {
            path: '/',
            element: <Sidebar/>,
            children: [
                {
                    path: '/',
                    element: <Dashboard/>,
                },
                {
                    path: '/users',
                    element: <Users/>,
                },
                {
                    path: 'users/:id',
                    element: <UserDetail/>,
                }
            ]
        }
    ]
    return useRoutes(routes)
}

export default Router