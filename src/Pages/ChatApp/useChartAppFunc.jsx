import useAxios from "../../CustomHocks/useAxiosSecure";



// import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_BASE_URL);


const useChartAppFunc = () => {

    const AxiosSecure = useAxios()



    const changeUserReadMsgStatus = async (userEmail, userRole) => {

        const changeRes = await AxiosSecure.patch('/chatData/changeUserMessageRedStatus', { userEmail, userRole })
        return changeRes
    }



    const changeAdminReadMsgStatus = async (senderEmail,userEmail, userRole) => {
        const changeRes = await AxiosSecure.patch('/chatData/changeAdminMessageRedStatus', { senderEmail,userEmail, userRole })
        return changeRes

    }




    return { changeUserReadMsgStatus, changeAdminReadMsgStatus }

};

export default useChartAppFunc;