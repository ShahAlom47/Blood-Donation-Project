import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useEmailJs = () => {
  // State to handle loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const AxiosPublic=useAxiosPublic();


  const sendEmail = async (data, reset) => {
    
    const emailData = {
      service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      template_params: {
        user_name: data.name,
        user_email: data.email,
        subject: data.subject,
        message: data.message,
      }
    };

    try {
      setLoading(true);
      setError(null);

      // Send email via EmailJS API
      const res = await AxiosPublic.post('https://api.emailjs.com/api/v1.0/email/send', emailData);

      console.log(res);
      if (res.data === 'OK') {
        
        if (reset) reset();
        return {success:true}
      }
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading, error };
};

export default useEmailJs;
