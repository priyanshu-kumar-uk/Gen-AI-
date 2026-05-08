import {createBrowserRouter} from 'react-router-dom'
import Chat from '../features/ai/pages/Chat'

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Chat/>
    }
])