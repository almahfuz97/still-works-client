import Login from "../../Pages/Authentication/Login/Login";
import Register from "../../Pages/Authentication/Register/Register";
import HomPage from "../../Pages/Home/HomePage/HomPage";

const { createBrowserRouter } = require("react-router-dom");
const { default: ErrorPage } = require("../../Components/ErrorPage/ErrorPage");
const { default: MainLayout } = require("../../Layouts/MainLayout/MainLayout");

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomPage />
            },
            {
                path: '/home',
                element: <HomPage />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]

    }
])