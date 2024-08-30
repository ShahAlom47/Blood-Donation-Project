import useAxios from "../../../../../../CustomHocks/useAxiosSecure";
import useUser from "../../../../../../CustomHocks/useUser";


const useMonthlyDonateFunc = () => {
    const { user } = useUser();
    const AxiosSercure = useAxios()

    const updateDonationAmount = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const amount = e.target.amount.value;
        
    }

    const cancelMonthlyDonation = async () => {


    }

    return {
        updateDonationAmount,
        cancelMonthlyDonation,
    }
};

export default useMonthlyDonateFunc;