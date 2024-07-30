import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageHeading from "../../Components/PageHeading";
import img from '../../assets/image/register-bg.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import useUser from '../../CustomHocks/useUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { login } = useUser()
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPass,setShowPass]=useState(false)
    const navigate =useNavigate()
    const location = useLocation();
    console.log(location);
    const onSubmit = async (data) => {
        setEmailError('');
        setPasswordError('');
        try {
        const res = await login(data.email, data.password)
      
        if (res.message === 'Login successful') {
       
            toast.success(res.message)
            reset()
            setTimeout(() => {
                navigate(location.state?.from|| location.state || '/', { replace: true });
            }, 2000);
            return
        }

        else if(res.message === 'Invalid email'){
            setEmailError(res.message)
            return
        }
        else if(res.message === 'Invalid  password'){
            setPasswordError(res.message)
            return
        }
        else{
            toast.warn(res.message)
        }



   

           

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div>
            <ToastContainer />
            <PageHeading img={img} title={'Login As a Blood Donor'} />
            <div className="max-w py-10">
                <div className="border-2 lg:p-8 md:p-6 p-3 lg:w-8/12 md:w-10/12 w-full m-auto mb-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                        message: "Invalid email address"
                                    }
                                })}
                                placeholder='Your Email'
                                className="input input-bordered rounded w-full mt-1"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Password</label>
                            <div className="input input-bordered rounded w-full mt-1 relative">
                            <input
                                type={`${showPass?'text':'password'}`}
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                placeholder='Your Password'
                                className="my-auto w-full mt-2"
                            />
                            <button className='absolute top-1/4 right-5' onClick={()=>setShowPass(!showPass)}>{showPass?<IoIosEyeOff />:<IoIosEye />}</button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        </div>
                        <button style={{ width: '100%' }} type="submit" className="btn-p w-full mt-4">Login</button>
                    </form>
                    <p className=' text-center my-7 font-semibold '>Don`t have an account?<Link to={'/register'}><button className='btn btn-link '> Register Now</button></Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
