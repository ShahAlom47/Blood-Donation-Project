import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div><Root></Root></div>,
      errorElement: <ErrorPage />,
      children:[
        {
            path: "/",
            element: <div><Home></Home></div>,
        }
      ]
    },
  ]);

  export default router