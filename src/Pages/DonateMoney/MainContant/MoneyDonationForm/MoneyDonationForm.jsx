import { useState } from "react";
import OneTimeDonation from "./OneTimeDonation/OneTimeDonation";
import MonthlyDonation from "./MonthlyDonation/MonthlyDonation";

const MoneyDonationForm = () => {
    const [donationOption, setDonationOption] = useState('oneTime');
 

    return (
        <div className="my-6 bg-gray-500 bg-opacity-10 h-full p-4">
            <h1 className="text-2xl font-semibold ">Donate Now</h1>
        

            <div className="flex justify-start my-6">
                <button onClick={()=>setDonationOption('oneTime')} className={`border border-color-p px-3 ${donationOption==='oneTime'?'bg-color-p text-white':''}`}>One Time</button>
                <button onClick={()=>setDonationOption('monthly')} className={`border border-color-p px-3 ${donationOption==='monthly'?'bg-color-p text-white':''}`}>Monthly</button>   
            </div>

            {
                donationOption==='oneTime'?
                <OneTimeDonation></OneTimeDonation>:
                <MonthlyDonation></MonthlyDonation>
            }
        </div>
    );
};

export default MoneyDonationForm;
