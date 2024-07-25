import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageHeading from "../../Components/PageHeading";
import img from '../../assets/image/register-bg.jpg';
import 'react-datepicker/dist/react-datepicker.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onSubmit = async (data) => {
        setEmailError('');
        setPasswordError('');

      
        try {
            
            if (data.email !== "test@example.com") {
                setEmailError("Invalid email address");
            } else if (data.password !== "password123") {
                setPasswordError("Incorrect password");
            } else {
                console.log('Login successful:', data);
            }

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div>
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
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                placeholder='Your Password'
                                className="input input-bordered rounded w-full mt-1"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        </div>
                        <button style={{ width: '100%' }} type="submit" className="btn-p w-full mt-4">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
