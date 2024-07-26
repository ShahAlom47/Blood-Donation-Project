import  {  useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import PageHeading from "../../Components/PageHeading";
import img from '../../assets/image/register-bg.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useUser from '../../CustomHocks/useUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

const cities = [
    { value: 'Dhaka', label: 'Dhaka' },
    { value: 'Chittagong', label: 'Chittagong' },
    { value: 'Sylhet', label: 'Sylhet' },
];

const countries = [
    { value: 'Bangladesh', label: 'Bangladesh' },
    { value: 'India', label: 'India' },
    { value: 'USA', label: 'USA' },
];

const Register = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [lastDonate,setLatestDonate]=useState(null);
    
    const [showPass,setShowPass]=useState(false)
    const navigate=useNavigate();
    const {addUser}=useUser()

   

    const onSubmit =async data => {
        const formData = { ...data, lastDonate: lastDonate ? lastDonate.toLocaleDateString('en-GB') : null };
        const res= await addUser({...formData,role:'user'})

    
        if(res.token){
                toast.success('Account Created Successfully ')
                reset()
                setTimeout(() => {
                    navigate('/')
                }, 2000);
                return

        }
        else if(res.message){
            toast.error(res.message)
                
        }
      
    };

    const handleDateChange = (date) => {
        setLatestDonate(date)
    };

    const handleCityChange = (selectedOption) => {
        setValue('city', selectedOption.value);
    };

    const handleCountryChange = (selectedOption) => {
        setValue('country', selectedOption.value);
    };
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999
        })
    };
    return (
        <div>
            <PageHeading img={img} title={'Register As a Blood Donor'} />
            <ToastContainer />
            <div className="max-w my-5">
                <h1 className="text-3xl font-bold text-center mt-16 mb-6">Red Love Organization</h1>
                <div className="border-2 lg:p-8 md:p-6 p-3 lg:w-8/12 md:w-10/12 w-full m-auto mb-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Full Name</label>
                            <input 
                                type="text" 
                                {...register("name", { required: "Full Name is required" })} 
                                className="input input-bordered rounded-sm w-full mt-1"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                        </div>

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
                                className="input input-bordered rounded w-full mt-1"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Password</label>
                          <div className='relative input input-bordered rounded w-full mt-1'>
                          <input
                                  type={`${showPass?'text':'password'}`}
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
                                className=" mt-1"
                            />
                              <button className='absolute top-1/4 right-5' onClick={()=>setShowPass(!showPass)}>{showPass?<IoIosEyeOff />:<IoIosEye />}</button>
                          </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Phone Number</label>
                            <input 
                                type="tel" 
                                {...register("phoneNumber", { 
                                    required: "Phone Number is required",
                                    pattern: {
                                        value: /^[0-9]{10,}$/,
                                        message: "Invalid phone number"
                                    }
                                })} 
                                className="input input-bordered rounded w-full mt-1"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Blood Group</label>
                            <select 
                                {...register("bloodGroup", { required: "Blood Group is required" })} 
                                className="input input-bordered rounded w-full mt-1"
                            >
                                <option value="">Select your blood group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                            {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup.message}</p>}
                        </div>

                        <div className="mb-4 ">
                            <label className="block text-gray-700 font-medium ">Last Donate Date</label>
                            <div className="input input-bordered rounded w-full mt-1 flex items-center">
                            <DatePicker 
                            placeholderText='Choose date here'
                                selected={lastDonate}
                                onChange={handleDateChange}
                                className="w-full mt-1"
                                styles={customStyles}
                            />
                            </div>
                            {errors.lastDonateDate && <p className="text-red-500 text-sm mt-1">{errors.lastDonateDate.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">City</label>
                            <Select 
                                options={cities}
                                onChange={handleCityChange}
                                className="input  rounded-sm w-full h-full px-0 mt-1"
                                styles={customStyles}
                            />
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Country</label>
                            <Select 
                                options={countries}
                                onChange={handleCountryChange}
                                className="input  rounded-sm w-full h-full px-0 mt-1"
                                styles={customStyles}
                            />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                        </div>

                        <button style={{width:'100%'}} type="submit" className="btn-p w-full mt-4">Register</button>
                    </form>
                    <p className=' text-center my-7 font-semibold '>Already have an account?<Link to={'/login'}><button className='btn btn-link '> Login Now</button></Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
