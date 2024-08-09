
import Swal from "sweetalert2";
import useAxios from "../../../../CustomHocks/useAxiosSecure";
import useUser from "../../../../CustomHocks/useUser";


const useUserHomeFunction = () => {
    const { user } = useUser()
    const AxiosSecure = useAxios()

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
                    refetch()
                    return
                }
                Swal.fire({
                    title: "Error!",
                    icon: "error"
                });
            }
        })
    }




    return {
        cancelMyBloodBankRequest,
    }
};

export default useUserHomeFunction;