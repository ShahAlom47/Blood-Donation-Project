import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxiosSecure";
import useUser from "./useUser";

const useUserMonthlyDonationData = () => {
    const { user } = useUser();
    const AxiosSecure = useAxios();

    const { data = {}, refetch, isLoading } = useQuery({
        queryKey: ['getSingleMonthlyDonationDatas', user?.email],
        queryFn: async () => {
            if (user?.monthlyDonation === 'active') {
                const res = await AxiosSecure.get(`/moneyDonation/getUserMonthlyDonationData/${user?.email}`);
                return res.data;
            }
            return {}; 
        },
        enabled: user?.monthlyDonation === 'active', 
    });

    const parseMonth = (monthString) => {
        if (!monthString) return new Date(); // Default to current date if monthString is invalid
        const [year, month] = monthString.split('-');
        return new Date(`${year}-${month}-01`);
    };

    const latestDonation = data?.donationHistory?.reduce((latest, donation) => {
        if (!latest) return donation; // Handle case where latest might be undefined
        return parseMonth(donation.donationMonth) > parseMonth(latest.donationMonth) ? donation : latest;
    }, null);

    const latestDonationMonth = latestDonation?.donationMonth;

    const currentDate = new Date();

    const latestDonationDate = parseMonth(latestDonationMonth);

    const diffDays = Math.ceil((currentDate - latestDonationDate) / (1000 * 60 * 60 * 24));

    const isDonationTime = diffDays > 30;

    return { data, refetch, isLoading, latestDonationMonth, isDonationTime };
};

export default useUserMonthlyDonationData;
