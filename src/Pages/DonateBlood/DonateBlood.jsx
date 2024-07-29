import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import PageHeading from "../../Components/PageHeading";
import useUser from "../../CustomHocks/useUser";
import bg from '../../assets/image/blood-donate-bg.png';

const DonateBlood = () => {
    const { user } = useUser();
    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            bloodGroup: user?.bloodGroup,
            lastDonate: user?.lastDonate ? new Date(user?.lastDonate) : null,
            city: user?.city,
            country: user?.country,
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        // Submit form data to server or handle it as needed
    };

    return (
        <div>
            <PageHeading title={'Donate Now'} img={bg}> </PageHeading>
            <div className="max-w my-5 p-5">
                <h1 className="text-center lg:text-5xl md:text-4xl text-2xl font-bold my-6">Make a Donation</h1>
                <form onSubmit={handleSubmit(onSubmit)} className=" lg:w-8/12 md:w-10/12 w-full mx-auto  border-2 m-5 lg:p-8 md:p-5 p-4">
                    <div className='mt-3'>
                        <label className="block font-semibold ">Name:</label>
                        <input
                            {...register('name')}
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                        />
                    </div>
                    <div className="  grid lg:grid-cols-2 gap-4 md:grid-cols-2 grid-cols-1">
                        <div  className='mt-3'>
                            <label className="block font-semibold ">Email:</label>
                            <input
                                {...register('email')}
                                className="w-full p-2 border border-gray-300 rounded"
                                type="email"
                            />
                        </div>
                        <div  className='mt-3'>
                            <label className="block font-semibold ">Phone Number:</label>
                            <input
                                {...register('phoneNumber')}
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="  grid lg:grid-cols-2 gap-4 md:grid-cols-2 grid-cols-1">
                        <div  className='mt-3'>
                            <label className="block font-semibold ">Blood Group:</label>
                            <input
                                {...register('bloodGroup')}
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                            />
                        </div>
                        <div  className='mt-3'>
                            <label className="block font-semibold ">Last Donate Date:</label>
                            <Controller
                                control={control}
                                name="lastDonate"
                                render={({ field }) => (
                                    <DatePicker
                                        className="w-full p-2 border border-gray-300 rounded"
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="  grid lg:grid-cols-2 gap-4 md:grid-cols-2 grid-cols-1">
                        <div  className='mt-3'>
                            <label className="block font-semibold ">City:</label>
                            <input
                                {...register('city')}
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                            />
                        </div>
                        <div  className='mt-3'>
                            <label className="block font-semibold ">Country:</label>
                            <input
                                {...register('country')}
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                            />
                        </div>
                    </div>
                    <button style={{width:'200px'}} type="submit" className="px-4 py-2 bg-blue-500 text-white rounded btn-p mt-7">Donate Now</button>
                </form>
            </div>
        </div>
    );
};

export default DonateBlood;
