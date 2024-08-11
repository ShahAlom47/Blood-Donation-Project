
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import PageHeading from "../../Components/PageHeading";
import useUser from "../../CustomHocks/useUser";
import bg from '../../assets/image/blood-donate-bg.png';
import useAxios from '../../CustomHocks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const DonateBlood = () => {
    const { user } = useUser();
    const AxiosSecure = useAxios();
    const navigate=useNavigate()
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            bloodGroup: user?.bloodGroup,
            lastDonate: user?.lastDonate ? new Date(user?.lastDonate) : null,
            city: user?.city,
            country: user?.country,
            age: user?.age,
            gender: user?.gender,
        }
    });

    const onSubmit = async (data) => {

        const donorData={
            ...data,
            type:'donor',
            status:'Available'
        }
        try {
            const res = await AxiosSecure.post('/bloodBank/addBloodDonor', donorData);
            if (res.data.insertedId) {
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you for your donation!",
                    text: "Your generous contribution has been successfully recorded. Together, we can save lives!",
                    showConfirmButton: false,
                    timer: 3000
                });
                setTimeout(() => {
                    navigate(-1)
                }, 2000);
            }
         
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Submission Failed",
                showConfirmButton: true
            });
            console.error(error);
        }

    };

    return (
        <div>
            <PageHeading title={'Donate Now'} img={bg}> </PageHeading>
            <div className="max-w my-5 p-5">
                <h1 className="text-center lg:text-5xl md:text-4xl text-2xl font-bold my-6">Make a Donation</h1>
                <form onSubmit={handleSubmit(onSubmit)} className=" lg:w-8/12 md:w-10/12 w-full mx-auto  border-2 m-5 lg:p-8 md:p-5 p-4">
                    <div className='mt-3'>
                        <label className="block font-semibold">Name:</label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-2 grid-cols-1">
                        <div className='mt-3'>
                            <label className="block font-semibold">Email:</label>
                            <input
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                            className="w-full p-2 border border-gray-300 rounded"
                            type="email"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className='mt-3'>
                            <label className="block font-semibold">Phone Number:</label>
                            <input
                                {...register('phoneNumber', { required: 'Phone number is required' })}
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                            />
                            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-2 grid-cols-1">
                        <div className='mt-3'>
                            <label className="block font-semibold">Blood Group:</label>
                            <input
                                {...register('bloodGroup', { required: 'Blood group is required' })}
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                            />
                            {errors.bloodGroup && <p className="text-red-500">{errors.bloodGroup.message}</p>}
                        </div>
                        <div className='mt-3 '>
                            <label className="block font-semibold">Last Donate Date:</label>
                            <div className=" p-2 border border-gray-300 rounded">
                                <Controller
                                    control={control}
                                    name="lastDonate"
                                    rules={{ required: 'Last donate date is required' }}
                                    render={({ field }) => (
                                        <DatePicker
                                            className="w-full outline-none"
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            dateFormat="dd/MM/yyyy"
                                        />
                                    )}
                                />
                            </div>
                            {errors.lastDonate && <p className="text-red-500">{errors.lastDonate.message}</p>}
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-2 grid-cols-1">
                        <div className='mt-3'>
                            <label className="block font-semibold">Age:</label>
                            <input
                                {...register('age', { required: 'Age is required', min: { value: 18, message: 'Minimum age is 18' } })}
                                className="w-full p-2 border border-gray-300 rounded"
                                type="number"
                            />
                            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                        </div>
                        <div className='mt-3'>
                            <label className="block font-semibold">Gender:</label>
                            <select
                                {...register('gender', { required: 'Gender is required' })}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-2 grid-cols-1">
                        <div className='mt-3'>
                            <label className="block font-semibold">City:</label>
                            <input
                                {...register('city', { required: 'City is required' })}
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                            />
                            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                        </div>
                        <div className='mt-3'>
                            <label className="block font-semibold">Country:</label>
                            <input
                                {...register('country', { required: 'Country is required' })}
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                            />
                            {errors.country && <p className="text-red-500">{errors.country.message}</p>}
                        </div>
                    </div>
                    <button style={{ width: '200px' }} type="submit" className="px-4 py-2 bg-blue-500 text-white rounded btn-p mt-7">Donate Now</button>
                </form>
            </div>
        </div>
    );
};

export default DonateBlood;
