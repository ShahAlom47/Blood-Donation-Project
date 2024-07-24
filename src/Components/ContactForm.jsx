import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const ContactForm = () => {
    const { register, handleSubmit,reset } = useForm();
  

    const onSubmit = async (data) => {

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
        const res = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData)
       
        if (res.data === 'OK') {
            Swal.fire('Complete')
            reset()
        }


    };
   

    return (
        <div className="bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 flex-col">
                <input placeholder="Name" type="text" name="to_name" className="bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("name")} required />
                <input placeholder="Your Email" type="email" name="user_email" className="bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("email")} required />
                <input placeholder="Subject" type="text" name="from_name" className="bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("subject")} required />
                <textarea placeholder="Your Message" name="message" className="bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("message")} required></textarea>
                <button type="submit" className="btn-p cursor-pointer w-full">Submit</button>
            </form>
        </div>
    );
};

export default ContactForm;
