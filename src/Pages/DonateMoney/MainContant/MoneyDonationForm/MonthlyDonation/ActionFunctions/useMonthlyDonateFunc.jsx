import Swal from "sweetalert2";
import useAxios from "../../../../../../CustomHocks/useAxiosSecure";
import useUser from "../../../../../../CustomHocks/useUser";


const useMonthlyDonateFunc = () => {
    const { user ,setReLoad} = useUser();
    const AxiosSecure = useAxios()

    const updateDonationAmount = async (amount,refetch,setOpenModal,) => {
        
        const res = await AxiosSecure.patch(`/moneyDonation/updateDonationAmount/${user?.email}`, {amount})
        if(res.data?.status){
            Swal.fire({
                icon:'success',
                text:res.data?.message,
            })
            refetch();
            setOpenModal(false)
            setReLoad(false)
            return
        }
        
    }

    const cancelMonthlyDonation = async () => {


    }

    return {
        updateDonationAmount,
        cancelMonthlyDonation,
    }
};

export default useMonthlyDonateFunc;