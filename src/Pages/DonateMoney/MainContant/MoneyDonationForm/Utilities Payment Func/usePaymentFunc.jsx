import useAxiosPublic from "../../../../../CustomHocks/useAxiosPublic";


const usePaymentFunc = () => {
    const AxiosPublic = useAxiosPublic()

    const addDonation = async (donationData) => {
        const res = await AxiosPublic.post('/moneyDonation/addDonation', donationData)
        if(res.data?.insertedId){
            return {success:true,message:'Donation Successfully Complete'}
        }
        return {success:false,message:'Something is Wrong'}
      
    }


    return {
        addDonation,

    };
};

export default usePaymentFunc;