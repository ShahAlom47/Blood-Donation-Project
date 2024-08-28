/* eslint-disable react/prop-types */


const MonthlyDonationActivePage = ({setLastDonationMonth,data}) => {
  

    // Array of month names
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // const { data } = useQuery({
    //     queryKey: 'getSingleMonthlyDonationData',
    //     queryFn: async () => {
    //         const res = await AxiosSecure.get(`/moneyDonation/getUserMonthlyDonationData/${user?.email}`);
    //         return res.data;
    //     }
    // });

    

    
    const sortedDonations = data?.donationHistory?.sort((a, b) => {
        return new Date(b.donationMonth + '-01') - new Date(a.donationMonth + '-01');
    });

    
    const latestDonation = sortedDonations?.[0];
    const latestMonth = latestDonation?.donationMonth;
   
  
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
