import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Detail from './pages/Detail';
import WatchVideo from './pages/WatchVideo';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useSelector, useDispatch } from 'react-redux'
import PostDetail from './pages/PostDetail';
import MyCourses from './pages/MyCourses';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/course/:id",
        element: <Detail />,
    },
    {
        path: "/watch/:id",
        element: <WatchVideo />
    },
    {
        path: "/mycourses",
        element: <MyCourses />
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/postDetail",
        element: <PostDetail />
    }

]);


const App = () => {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch();
    // if(currentUser.user==null){
    //     return(
    //         <div>
    //             <RouterProvider router={routerSignout} />
    //         </div>
    //     )
    // }
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App;