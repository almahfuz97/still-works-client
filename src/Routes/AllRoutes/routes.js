import DashboardLayout from "../../Layouts/DashboardLayout/DashboardLayout";
import Login from "../../Pages/Authentication/Login/Login";
import Register from "../../Pages/Authentication/Register/Register";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import HomPage from "../../Pages/Home/HomePage/HomPage";
import Products from "../../Pages/Products/Products";
import PrivateRoute from "../PrivateRoute.js/PrivateRoute";

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
            {
                path: '/category/:id',
                element: <Products />,
                loader: ({ params }) => fetch(`${process.env.REACT_APP_url}/category/${params.id}`)
            },
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard/addproduct',
                element: <AddProduct />
            }
        ]

    }
])