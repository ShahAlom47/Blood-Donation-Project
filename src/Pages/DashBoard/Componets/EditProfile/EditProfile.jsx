import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import PageHeading from "../../../../Components/PageHeading";
import bg from '../../../../assets/image/edit-profile-bg.jpg'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from 'react-router-dom';
import useUser from '../../../../CustomHocks/useUser';
import useAxios from '../../../../CustomHocks/useAxiosSecure';

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

const EditProfile = () => {
    const { user } = useUser()
    const { register, handleSubmit, setValue,  formState: { errors } } = useForm();
    const [lastDonate, setLatestDonate] = useState(null);
    const navigate = useNavigate();
    const AxiosSecure=useAxios()



    useEffect(() => {
        if (user) {
            setValue('name', user.name || '');
            setValue('email', user.email || '');
            setValue('phoneNumber', user.phoneNumber || '');
            setValue('bloodGroup', user.bloodGroup || '');
            setValue('city', user.city || '');
            setValue('country', user.country || '');
            setLatestDonate(user.lastDonate ? new Date(user.lastDonate).toLocaleDateString() : null);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        const formData = { ...data, lastDonate: lastDonate };

        const res=await AxiosSecure.patch(`/user/updateUserData/${user._id}`,formData)
        if(res.data.result.modifiedCount>0){
            toast.success('Successfully Updated')
            setTimeout(() => {
                navigate('/dashBoard')
            }, 2000);
        }

  
    };

    const handleDateChange = (date) => {
        setLatestDonate(date);
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
            <PageHeading img={bg} title={'Update your Profile'} />
            <ToastContainer />
            <div className="max-w my-5">
                 <div className="border-2 lg:p-8 md:p-6 p-3 lg:w-8/12 md:w-10/12 w-full m-auto mb-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Full Name</label>
                            <input 
                                type="text" 
                                {...register("name", { required: "Full Name is required" })} 
                                className="input input-bordered rounded-sm w-full mt-1"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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
                                defaultValue={cities.find(city => city.value === user.city)}
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
                                defaultValue={countries.find(country => country.value === user.country)}
                            />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                        </div>

                        <button style={{width:'100%'}} type="submit" className="btn-p w-full mt-4">Update</button>
                    </form>
                  
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
