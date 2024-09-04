import Swal from "sweetalert2";
import useAxios from "../../../CustomHocks/useAxiosSecure";
import { data } from "autoprefixer";


const useFunctions = () => {
    const AxiosSecure = useAxios()




    const acceptRequester = async (id, data,requesterEmail, refetch, setModalData) => {
   
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const notificationData = {
                    requesterEmail: requesterEmail,
                    requesterPhone: '',
                    donorEmail: data?.email,
                    message: `Your blood request has been accepted by admin.
                            , now you can contact the donor if you want. Please contact the blood bank for further assistance`  ,
                    type: 'blood_bank_blood_request',
                    status: 'unread',
                    timestamp: new Date().toLocaleString(),

                }
               
                const res = await AxiosSecure.patch(`/bloodBank/admin/accept-requester/${id}`, notificationData)
             
                if (res?.data?.status == true) {

                    Swal.fire({
                        title: "Accepted!",
                        icon: "success"
                    });
                    refetch()
                    setModalData(false)
                    return
                }
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error"
                });
            }
        });


    }

    const rejectRequester = async (id, requesterEmail, refetch, setModalData) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const notificationData = {
                    requesterEmail: requesterEmail,
                    requesterPhone: '',
                    donorEmail: '',
                    message: 'Your blood request has been rejected by the admin. Please contact the Blood Bank for further assistance.',
                    type: 'blood_bank_blood_request',
                    status: 'unread',
                    timestamp: new Date().toLocaleString(),

                }
              
                const res = await AxiosSecure.patch(`/bloodBank/admin/reject-requester/${id}`, notificationData)
         
                if (res?.data?.status == true) {

                    Swal.fire({
                        title: "Rejected!",
                        icon: "success"
                    });
                    refetch()
                    setModalData(false)
                    return
                }
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error"
                });
            }
        });


    }

    const handelDelete = async (id, refetch) => {

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


    // user role change 

    const changeUserRole = async(value,email,refetch)=>{
        const notificationData={


        }

        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await AxiosSecure.patch(`/user/updateUserRole/${email}`,{value,notificationData})
                if(res.data.success===true){
                    Swal.fire({
                        title: "Changed",
                        text: "User Role Updated",
                        icon: "success"
                      });
                      return
                }
                Swal.fire({
                    title: "oops",
                    text: "",
                    icon: "error"
                  });
           
            }
          });


    }

    return {
        acceptRequester,
        rejectRequester,
        handelDelete,
        changeUserRole,
    }
};

export default useFunctions;