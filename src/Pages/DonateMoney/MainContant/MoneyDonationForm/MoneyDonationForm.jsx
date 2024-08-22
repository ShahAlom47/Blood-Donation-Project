import { useState } from "react";
import OneTimeDonation from "./OneTimeDonation/OneTimeDonation";
import MonthlyDonation from "./MonthlyDonation/MonthlyDonation";

const MoneyDonationForm = () => {
    const [donationOption, setDonationOption] = useState('oneTime');
    console.log(donationOption);

    // Handle change event
    const handleOptionChange = (event) => {
        setDonationOption(event.target.value);
    };

    return (
        <div className="my-6">
            <h1 className="text-xl font-semibold text-gray-700">Donate Now</h1>
            <div className=" space-x-5 my-3">
                <label><input
                    className="mr-1 radio radio-primary w-4 h-4 p-0"
                    type="radio"
                    value="oneTime"
                    checked={donationOption === 'oneTime'}
                    onChange={handleOptionChange}
                />  One Time  </label>

                <label > <input
                     className="mr-1 radio radio-primary w-4 h-4 p-0"
                    type="radio"
                    value="monthly"
                    checked={donationOption === 'monthly'}
                    onChange={handleOptionChange}
                />  Monthly</label>
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
