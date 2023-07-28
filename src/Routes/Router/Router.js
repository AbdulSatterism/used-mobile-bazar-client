import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../pages/Home/Home/Home";
import Signup from "../../pages/Signup/Signup";
import Login from "../../pages/Login/Login";
import DashboardLayout from "../../Layout/DashboardLayout";
import AddProduct from "../../pages/Dashboard/AddProduct/AddProduct";
import Products from "../../pages/Products/Products/Products";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyOrdersProduct from "../../pages/Dashboard/MyOrdersProduct/MyOrdersProduct";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/products/:id',
                element: <PrivateRoute><Products></Products></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrdersProduct></MyOrdersProduct>
            }
        ]
    }

]);

export default router;