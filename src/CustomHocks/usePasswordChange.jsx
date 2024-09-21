import useAxiosPublic from "./useAxiosPublic";


const usePasswordChange = () => {
const AxiosPublic= useAxiosPublic()

    const changePassword= async( userEmail,newPassword)=>{
        const res = await AxiosPublic.patch(`/user/changePassword/${userEmail}`, { newPassword:newPassword})
   
        return res
    }

    return {changePassword}
}
export default usePasswordChange;