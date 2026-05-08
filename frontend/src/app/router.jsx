import {createBrowserRouter, Outlet} from 'react-router-dom'
import Chat from '../features/ai/pages/Chat'
import Register from '../features/auth/pages/Register'
import Sidebar from '../features/ai/pages/Sidebar'

const MainLayout = () => (
    <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
            <Outlet /> 
        </div>
    </div>
)

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Chat /> },
            { path: '/chat/:id', element: <Chat /> }
        ]
    },
    { path: '/register', element: <Register /> }
])