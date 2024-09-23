
import useAxiosPublic from "./useAxiosPublic";


const useNodeMailer = () => {
    const AxiosPublic= useAxiosPublic()
  
    const sendEmail=async(mailOption)=>{
 
        console.log(mailOption.text);
        const mailRes= AxiosPublic.post('/sendMail',{mailOption})
        return mailRes.data

    }
    return {sendEmail}
};

export default useNodeMailer;