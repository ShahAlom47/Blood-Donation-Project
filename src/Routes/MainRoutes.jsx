import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AnimatedLayout from "../SharedComponent/AnimatedLayout";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import RequestDetails from "../Pages/Home/BloodRequest/RequestList/RequestDetails";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div><Root></Root></div>,
      errorElement: <ErrorPage />,
      children:[
        {
            path: "/",
            element: <div><AnimatedLayout><Home></Home></AnimatedLayout></div>,
        },
        {
            path: "/bloodRequest/Details/:id",
            element: <div><AnimatedLayout><RequestDetails></RequestDetails></AnimatedLayout></div>,
        },
        {
            path: "/contact",
            element: <div><AnimatedLayout><ContactUs></ContactUs></AnimatedLayout></div>,
        },
        {
            path: "/register",
            element: <div><AnimatedLayout><Register></Register></AnimatedLayout></div>,
        },
        {
            path: "/login",
            element: <div><AnimatedLayout><Login></Login></AnimatedLayout></div>,
        },
      ]
    },
  ]);

  export default router