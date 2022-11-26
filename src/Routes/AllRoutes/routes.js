import FormModal from "../../Components/Modals/FormModal/FormModal";
import DashboardLayout from "../../Layouts/DashboardLayout/DashboardLayout";
import Login from "../../Pages/Authentication/Login/Login";
import Register from "../../Pages/Authentication/Register/Register";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import Payment from "../../Pages/Dashboard/Payment/Payment";
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
            {
                path: '/formModal',
                element: <FormModal />,
            },

        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard/addproduct',
                element: <AddProduct />
            },
            {
                path: '/dashboard/myProducts',
                element: <MyProducts />
            },
            {
                path: '/dashboard/allBuyers',
                element: <AllBuyers />
            },
            {
                path: '/dashboard/allSellers',
                element: <AllSellers />
            },
            {
                path: '/dashboard/myOrders',
                element: <MyOrders />
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment />,
                loader: ({ params }) => fetch(`${process.env.REACT_APP_url}/dashboard/payment/${params.id}`)
            },
        ]

    }
])