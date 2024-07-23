import { useForm } from "react-hook-form";


const ContactForm = () => {

    const {
        register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)




    return (
        <div className=" bg-white ">
            <form onSubmit={handleSubmit(onSubmit)} className="   flex gap-5 flex-col ">
                <input placeholder="Name" type="text" className=" bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("name")} required />
                <input placeholder="Your Email" type="email" className=" bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("email")} required />
                <input placeholder="Subject" type="text" className=" bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("subject")} required />
               
                <textarea placeholder="Your Message" className="bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("message")} required></textarea>


                <button type="submit" className="btn-p cursor-pointer w-full" >Submit</button>
            </form>
        </div>
    );
};

export default ContactForm;