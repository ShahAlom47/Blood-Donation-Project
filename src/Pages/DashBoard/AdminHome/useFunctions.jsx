import Swal from "sweetalert2";
import useAxios from "../../../CustomHocks/useAxiosSecure";


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
                    timestamp: new Date().toISOString(),

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
                    timestamp: new Date().toISOString(),

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

    const changeUserRole = async(value,email,name,refetch)=>{
        const notificationData = {
            userEmail: email,
            userName: name,
            message: `Dear ${name}, your role has been successfully updated to ${value}. We are pleased to inform you that you are now an ${value === 'admin' ? 'Administrator' : value}. Please log in to your account to explore the new features and responsibilities associated with your role.`,
            type: 'userDataUpdate',
            status: 'unread',
            timestamp: new Date().toISOString(),
          };
          
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
                    refetch()
                    Swal.fire({
                        title: "Changed",
                        text:res?.data?.message,
                        icon: "success"
                      });
                      return
                }
                Swal.fire({
                    title: "oops",
                    text:res?.data?.message,
                    icon: "error"
                  });
           
            }
          });


    }

    // delete user 
    const handelUserDelete = async(email,refetch)=>{
      
          
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await AxiosSecure.delete(`/user/deleteUser/${email}`)
                if(res.data.status===true){
                    refetch()
                    Swal.fire({
                        title: "Deleted",
                        text:res?.data?.message,
                        icon: "success"
                      });
                      return
                }
                Swal.fire({
                    title: "oops",
                    text:res?.data?.message,
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
        handelUserDelete,
    }
};

export default useFunctions;