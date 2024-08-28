/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../../../CustomHocks/useAxiosSecure";
import useUser from "../../../../../../CustomHocks/useUser";

const MonthlyDonationActivePage = ({setLastDonationMonth}) => {
    const { user } = useUser();
    const AxiosSecure = useAxios();

    // Array of month names
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const { data } = useQuery({
        queryKey: 'getSingleMonthlyDonationData',
        queryFn: async () => {
            const res = await AxiosSecure.get(`/moneyDonation/getUserMonthlyDonationData/${user?.email}`);
            return res.data;
        }
    });

    

    // Sorting donationHistory to get the latest donationMonth
    const sortedDonations = data?.donationHistory?.sort((a, b) => {
        return new Date(b.donationMonth + '-01') - new Date(a.donationMonth + '-01');
    });

    // Extracting the latest donationMonth and donateDate
    const latestDonation = sortedDonations?.[0];
    const latestMonth = latestDonation?.donationMonth;
    
    // Convert the donationMonth to a human-readable month name
    const formatMonth = (month) => {
        const [year, monthIndex] = month.split('-');
        const monthName = months[parseInt(monthIndex, 10) - 1]; 
        setLastDonationMonth(monthName)
      
        return `${monthName} ${year}`;
    };



    return (
        <div className="my-4 mb-6 space-y-2">
            <h1 className="text-xl font-bold border-b-2 border-color-p">Monthly Donation Active</h1>
            <h1 className="text-xl font-semibold">
                Your Monthly Donation Amount: <span className="text-color-p text-2xl">{data?.monthlyAmount}</span> Tk
            </h1>
            {latestMonth && (
                <h1 className="text-lg font-medium">
                    Your donation is complete until: <span className="text-color-p text-xl">{formatMonth(latestMonth)}</span>
                </h1>
            )}
        </div>
    );
};

export default MonthlyDonationActivePage;
