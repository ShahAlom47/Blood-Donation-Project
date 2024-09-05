
import { useForm } from "react-hook-form";
import { IoIosArrowRoundForward } from "react-icons/io";
import {  useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const GuestInfoForm = ({ amount }) => {
    const navigate=useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const donationData = {
            donorName: data.name,
            donorEmail: data.email,
            donorPhone:data.phone,
            date: new Date().toLocaleDateString(),
            amount: parseInt(amount),
            donationType:'guestDonation',
            category: "moneyDonation",
            userType: "guest",
        }
        

        navigate('/paymentPage', { state: { donationData } });
    };

    return (
        <div className="max-w-md mx-auto mt-10 py-5">
            <h2 className="text-2xl font-semibold text-center mb-5">
                Donate as a Guest  </h2>
            <p className="text-center mb-4"> Please Submit Your Information</p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                {/* Name */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: true })}
                        className={`shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? "border-red-500" : ""
                            }`}
                        placeholder="Your Full Name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs italic">Name is required.</p>
                    )}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        className={`shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-red-500" : ""
                            }`}
                        placeholder="Your Email Address"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs italic">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label
                        htmlFor="phone"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10,15}$/,
                                message: "Invalid phone number",
                            },
                        })}
                        className={`shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? "border-red-500" : ""
                            }`}
                        placeholder="Your Phone Number"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-xs italic">
                            {errors.phone.message}
                        </p>
                    )}
                </div>



                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button className="btn-p flex items-center justify-center gap-2" type="submit">Next <IoIosArrowRoundForward className="text-xl" /></button>
                </div>
            </form>
        </div>
    );
};

export default GuestInfoForm;
