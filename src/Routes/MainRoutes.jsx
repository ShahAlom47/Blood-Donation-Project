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
import BloodRequest from "../Pages/Home/BloodRequest/BloodRequest";
import DonateBlood from "../Pages/DonateBlood/DonateBlood";
import PrivetRouter from "./PrivetRouter/PrivetRouter";
import DashBoard from "../Pages/DashBoard/DashBoard";
import EditProfile from "../Pages/DashBoard/Componets/EditProfile/EditProfile";
import AboutUs from "../Pages/AboutUs/AboutUs";
import BloodBank from "../Pages/BloodBank/BloodBank";
import DonateMoney from "../Pages/DonateMoney/DonateMoney";
import PaymentPage from "../Pages/DonateMoney/MainContant/MoneyDonationForm/PaymentPage/PaymentPage";
import EditPassword from "../Pages/DashBoard/Componets/EditPassword/EditPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Root></Root></div>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <div><AnimatedLayout><Home></Home></AnimatedLayout></div>,
      },
      {
        path: "/allRequest",
        element: <div><AnimatedLayout><BloodRequest></BloodRequest></AnimatedLayout></div>,
      },


      {
        path: "/contact",
        element: <div><AnimatedLayout><ContactUs></ContactUs></AnimatedLayout></div>,
      },
      {
        path: "/about",
        element: <div><AnimatedLayout><AboutUs></AboutUs></AnimatedLayout></div>,
      },
      {
        path: "/register",
        element: <div><AnimatedLayout><Register></Register></AnimatedLayout></div>,
      },
      {
        path: "/login",
        element: <div><AnimatedLayout><Login></Login></AnimatedLayout></div>,
      },
      // privet Route 
      {
        path: "/bloodBank",
        element: <div><AnimatedLayout><BloodBank></BloodBank></AnimatedLayout></div>,
      },
      {
        path: "/dashBoard",
        element: <div><AnimatedLayout> <PrivetRouter><DashBoard></DashBoard></PrivetRouter></AnimatedLayout></div>,
      },
      {
        path: "/donateMoney",
        element: <div><AnimatedLayout> <DonateMoney></DonateMoney></AnimatedLayout></div>,
      },
      {
        path: "/paymentPage",
        element: <div><AnimatedLayout><PaymentPage></PaymentPage></AnimatedLayout></div>,
      },
      {
        path: "/donateBlood",
        element: <div><AnimatedLayout> <PrivetRouter><DonateBlood></DonateBlood></PrivetRouter></AnimatedLayout></div>,
      },
      {
        path: "/donateBlood/user/editProfile",
        element: <div><AnimatedLayout> <PrivetRouter><EditProfile></EditProfile></PrivetRouter></AnimatedLayout></div>,
      },
      {
        path: "/donateBlood/user/change-password",
        element: <div><AnimatedLayout> <PrivetRouter><EditPassword></EditPassword></PrivetRouter></AnimatedLayout></div>,
      },

    ]
  },
]);

export default router