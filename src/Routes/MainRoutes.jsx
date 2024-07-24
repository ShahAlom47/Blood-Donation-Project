import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AnimatedLayout from "../SharedComponent/AnimatedLayout";

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
            path: "/contact",
            element: <div><AnimatedLayout><ContactUs></ContactUs></AnimatedLayout></div>,
        }
      ]
    },
  ]);

  export default router