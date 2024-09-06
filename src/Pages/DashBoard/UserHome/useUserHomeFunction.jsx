
import Swal from "sweetalert2";
import useAxios from "../../../CustomHocks/useAxiosSecure";
import useUser from "../../../CustomHocks/useUser";
import useSound from "../../../CustomHocks/useSound";
import { useNavigate } from "react-router-dom";


const useUserHomeFunction = () => {
    const { user } = useUser()
    const AxiosSecure = useAxios()
    const { playSound } = useSound()
    const navigate=useNavigate()

    const cancelMyBloodBankRequest = async (id, refetch) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await AxiosSecure.patch(`/bloodBank/user/cancelBloodBankRequest/${id}`, { requesterEmail: user?.email })
                if (res.data.status === true) {
                    Swal.fire({
                        title: "Canceled!",
                        icon: "success"
                    });
                    playSound('success')
                    refetch()
                    return
                }
                Swal.fire({
                    title: "Error!",
                    icon: "error"
                });
                playSound('error')
            }
        })
    }


    // complete donation 
    const completeDonation = (data, refetch) => {
   
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Complete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const completedData={
                     requesterEmail: user?.email ,
                     donorEmail:data.email,
                     donorName:data.name ||'unknown',
                }
                console.log(data);
                const res = await AxiosSecure.patch(`/bloodBank/user/completeBloodBankRequest/${data._id}`, completedData)
            
                if (res.data.status === true) {
                    Swal.fire({
                        title: "Completed!",
                        icon: "success"
                    });
                    playSound('success')
                    refetch()
                    return
                }
                Swal.fire({
                    title: "Error!",
                    icon: "error"
                });
                playSound('error')
            }
        })
       


    }


    //   update amount 
    const handelUpdateAmount=async()=>{
     localStorage.setItem('donationOption','monthly')
     localStorage.setItem('amountUpdateForm','open')
        navigate('/donateMoney')
    }

    return {
        cancelMyBloodBankRequest,
        completeDonation,
        handelUpdateAmount,
    }
};

export default useUserHomeFunction;