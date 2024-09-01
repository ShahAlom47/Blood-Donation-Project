import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxiosSecure";
import useUser from "./useUser";


const useUserMonthlyDonationData = () => {

    const { user } = useUser();
    const AxiosSecure = useAxios();


    const { data,refetch, isLoading } = useQuery({
        queryKey: 'getSingleMonthlyDonationData',
        queryFn: async () => {
            if (user?.monthlyDonation === 'active') {
                const res = await AxiosSecure.get(`/moneyDonation/getUserMonthlyDonationData/${user?.email}`);
                return res.data;
            }
            return {}; 
        },
        enabled: user?.monthlyDonation === 'active', 
    });

    return {data,refetch,isLoading}
};

export default useUserMonthlyDonationData;