import { useState } from "react";
import OneTimeDonation from "./OneTimeDonation/OneTimeDonation";
import MonthlyDonation from "./MonthlyDonation/MonthlyDonation";
import useUser from "../../../../CustomHocks/useUser";
import { TbUserOff } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

const MoneyDonationForm = () => {
    const { user } = useUser()
    const [donationOption, setDonationOption] = useState('oneTime');
    const navigate =useNavigate();
    const location=useLocation();


    return (
        <div className="my-6 bg-gray-500 bg-opacity-10 h-ful p-4">
            <h1 className="text-2xl font-semibold ">Donate Now</h1>


            <div className="flex justify-start my-6">
                <button onClick={() => setDonationOption('oneTime')} className={`border border-color-p px-3 ${donationOption === 'oneTime' ? 'bg-color-p text-white' : ''}`}>One Time</button>
                <button onClick={() => setDonationOption('monthly')} className={`border border-color-p px-3 ${donationOption === 'monthly' ? 'bg-color-p text-white' : ''}`}>Monthly</button>
            </div>

            {
                donationOption === 'oneTime' ?
                    <OneTimeDonation></OneTimeDonation> :
                    user ? <MonthlyDonation></MonthlyDonation> :
                        <div  className=" my-6">
                            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                                Monthly Donation
                            </h2>
                            <TbUserOff className=" text-4xl text-color-p mx-auto" />
                            <p className="text-center text-gray-600 mb-6">You are not logged in.</p>
                            <div className="flex  justify-center">
                                <button
                                onClick={() => navigate('/login', { state: { from: location.pathname } })}
                                className="btn btn-success rounded-sm ">Login</button>
                                <button onClick={() => setDonationOption('oneTime')} className="btn btn-error rounded-sm ">Cancel</button>
                            </div>
                        </div>
            }
        </div>
    );
};

export default MoneyDonationForm;
