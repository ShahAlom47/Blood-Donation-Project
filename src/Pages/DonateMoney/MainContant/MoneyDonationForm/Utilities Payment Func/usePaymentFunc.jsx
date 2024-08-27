import useAxiosPublic from "../../../../../CustomHocks/useAxiosPublic";


const usePaymentFunc = () => {
    const AxiosPublic = useAxiosPublic()

    const addDonation = async (donationData) => {

        if (donationData.donationType === 'monthlyDonation') {
            const res = await AxiosPublic.post('/moneyDonation/addMonthlyDonation', donationData)
            if(res.data?.insertedId){
                return {success:true,message:'Donation Successfully Complete'}
            }
            return {success:false,message:'Something is Wrong'}

        }

     
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