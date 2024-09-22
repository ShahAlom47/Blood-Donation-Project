
import useAxiosPublic from "./useAxiosPublic";


const useNodeMailer = () => {
    const AxiosPublic= useAxiosPublic()
  
    const sendEmail=async(mailOption)=>{
 
        const mailRes= AxiosPublic.post('/sendMail',{mailOption})
        console.log(mailOption);
        return mailRes.data

    }
    return {sendEmail}
};

export default useNodeMailer;