import Lottie from "lottie-react";
import { useNavigate, useRouteError } from "react-router-dom";
import errorAni from '../../assets/Animation/errorAni.json'

import PropTypes from 'prop-types';
import { FaArrowLeft } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";





export default function ErrorPage({ btn }) {
    const error = useRouteError();
    const navigate = useNavigate()

    return (
        <div id="error-page" className="min-h-screen max-w">
            <div className="  flex flex-col justify-center items-center">
                <Lottie className="w-4/12 m-auto text-red-500" animationData={errorAni} />
                <p className=" font-semibold">Sorry, an unexpected error has occurred.</p>

                <i className=" font-semibold text-xl">{error.statusText || error.message}</i>
                {
                    btn ? '' : <div className=" flex gap-5 items-center justify-center">
                        <button onClick={() => navigate(-1)} className="btn  btn-sm  my-3 rounded-sm  bg-red-500 text-white hover:text-black  "> <FaArrowLeft /> Back </button>
                        <button onClick={() => navigate('/')} className="btn  btn-sm  my-3 rounded-sm bg-red-500 text-white hover:text-black "><IoHomeOutline /> Home</button>
                    </div>
                }
            </div>



        </div>
    );
}
ErrorPage.propTypes = {
    btn: PropTypes.bool
  };