import Swal from "sweetalert2";
import useAxios from "../../../../CustomHocks/useAxiosSecure";


const useFunctions = () => {
    const AxiosSecure= useAxios()



const acceptRequester = async (data,status) => {
    Swal.fire({
        title: "Are you sure?",
        showCancelButton: true,
        confirmButtonColor: "#ea062b",
        cancelButtonColor: "#000",
        confirmButtonText: "Confirm"
    }).then(async (result) => {
        if (result.isConfirmed) {
            console.log(data,status);

            // try {
            //     const res = await AxiosSecure.patch(`/donation/user/confirmDonation/${data?._id}`, status);

            //     if (res.status === 200) {
            //         refetch()
            //         Swal.fire({
            //             title: "Completed",
            //             icon: "success"
            //         });
            //     } else {
            //         Swal.fire({
            //             title: "Error",
            //             text: "Something went wrong. Please try again.",
            //             icon: "error"
            //         });
            //     }
            // } catch (error) {
            //     Swal.fire({
            //         title: "Error",
            //         text: error.response?.data?.message || "An unexpected error occurred. Please try again.",
            //         icon: "error"
            //     });
            // }
        }
    });
};

const rejectRequester=async(id,requesterEmail,refetch)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {

            const notificationData={
                requesterEmail:requesterEmail,
                requesterPhone:'',
                donorEmail:'',
                message:'Your blood request has been rejected by the admin. Please contact the Blood Bank for further assistance.',
                type:'blood_bank_blood_request',
                status:'unread',
                timestamp: new Date().toLocaleString(),
    
            }
            console.log(id,requesterEmail);
            const res = await AxiosSecure.patch(`/bloodBank/admin/reject-requester/${id}`,notificationData)
            console.log(res);
            if (res?.data?.deletedCount > 0) {
                refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        }
    });


}

const handelDelete = async (id,refetch) => {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await AxiosSecure.delete(`/bloodBank/admin/delete-blood-bank-data/${id}`)
            console.log(res);
            if (res?.data?.deletedCount > 0) {
                refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        }
    });


}



    return {
        acceptRequester,
        rejectRequester,
        handelDelete,
    }
};

export default useFunctions;