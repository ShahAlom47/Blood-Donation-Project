import { Link, useLocation, useNavigate, } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import usePasswordChange from "../../../CustomHocks/usePasswordChange";

const VerifyAccountEmail = () => {
    const location = useLocation();
    const { otp, email } = location.state || {};
    const inputsRef = useRef([]);
    const [seconds, setSeconds] = useState(59);
    const [isVerified, setVerify] = useState(false)
    const [isNotMatch, setNotMatch] = useState(false)
    const [passwordError, setPasswordError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const { changePassword } = usePasswordChange()
    const navigate = useNavigate()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();



    useEffect(() => {
        let timer = null;

        if (seconds > 0) {
            timer = setInterval(() => setSeconds(prev => prev - 1), 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [seconds]);


    const handleChange = (index, value) => {
        if (value.length === 1 && index < 3) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && !e.target.value) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleOtp = (e) => {
        e.preventDefault();
        const OTP = inputsRef.current.map(input => input.value).join('');
        console.log(typeof OTP, typeof otp);
        if (otp === OTP) {

            setVerify(true)
            setNotMatch(false)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Otp Verified",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }
        setVerify(false)
        setNotMatch(true)
        return

    };

    const onSubmit = async (data) => {
        if (data.password != data.confirmPassword) {
            setPasswordError('Confirm Password is not match')
            return
        }
        const res = await changePassword(email, data.password)

        if (res.data?.status) {
            reset()
            Swal.fire(res.data.message)
            setTimeout(() => {
                navigate('/login')
            }, 1200);
            return
        }
        Swal.fire(res.data.message)

    }

    console.log(email, otp);
    return (
        <div className="min-h-screen flex justify-center items-center flex-col">
            <div className="lg:w-6/12 md:w-8/12 w-full mx-auto shadow-4-side p-5 mb-5 text-center">
                <h1 className="font-bold text-xl mb-2">Verify Your Account</h1>
                <p className="mb-2 text-lg text-gray-800">We are sending an OTP to verify your email address.</p>

                {isVerified ?
                    <form onSubmit={handleSubmit(onSubmit)} className=" w-full my-4">

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">New Password</label>
                            <div className='relative input input-bordered rounded w-full mt-1'>
                                <input
                                    type={`${showPass ? 'text' : 'password'}`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters long"
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                            message: "Password must contain at least one letter and one number"
                                        }
                                    })}
                                    className=" mt-1 w-full h-full "
                                />
                                <button type="button" className='absolute top-1/4 right-5' onClick={() => setShowPass(!showPass)}>{showPass ? <IoIosEyeOff /> : <IoIosEye />}</button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Confirm Password</label>
                            <div className='relative input input-bordered rounded w-full mt-1'>
                                <input
                                    type={`${showPass ? 'text' : 'password'}`}
                                    {...register("confirmPassword", {
                                        required: "Confirm Password is required",

                                    })}
                                    className=" mt-1 w-full h-full "
                                />
                                <button type="button" className='absolute top-1/4 right-5' onClick={() => setShowPass(!showPass)}>{showPass ? <IoIosEyeOff /> : <IoIosEye />}</button>
                            </div>
                            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        </div>

                        <button style={{ width: '100%' }} type="submit" className="btn-p w-full mt-4">Confirm</button>
                    </form>
                    :
                    <form onSubmit={handleOtp} className="my-4 flex flex-col items-center gap-5">
                        <div className="flex justify-center gap-2">
                            {Array.from({ length: 4 }, (_, index) => (
                                <input
                                    key={index}
                                    className="h-16 w-16 border-2 border-black rounded-sm font-bold text-center text-xl"
                                    type="text"
                                    required
                                    autoFocus={index === 0}
                                    maxLength={1}
                                    ref={el => inputsRef.current[index] = el}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                />
                            ))}
                        </div>

                        {isNotMatch && <p className="text-color-p my-3 text-lg text-center ">OTP Not Match</p>}
                        <div className="mt-4">
                            <p>{seconds > 0 ? `Resend OTP in ${seconds} seconds` : "Not receive OTP?"}</p>
                            {seconds === 0 && (
                                <Link to={-1} className=" btn btn-link">Try Again</Link>
                            )}
                        </div>
                        {
                            // !timeOut &&
                            <button type="submit" className="mx-auto btn btn-md rounded-sm bg-green-700 hover:bg-green-600 text-white">Verify</button>
                        }
                    </form>
                }
            </div>

        </div>
    );
};

export default VerifyAccountEmail;
