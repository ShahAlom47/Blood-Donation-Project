import { useForm } from "react-hook-form";


const RequestForm = () => {

    const {
        register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)




    return (
        <div className=" bg-white ">
            <h1 className=" text-xl font-bold m-5">Request For Blood</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" p-5  flex gap-5 flex-col ">
                <input placeholder="Name" type="text" className=" bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("name")} required />
                <input placeholder="Your Phone " type="number" className=" bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("phone")} required />
                <input placeholder="Your Email" type="email" className=" bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("email")} required />
                <input placeholder="Your Address" type="text" className=" bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("address")} required />
                <select className="bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("bloodGroup")} required>
                    <option value="" disabled selected hidden>Select Blood Group</option>
                    <option value="A+" className="font-bold">A(+)</option>
                    <option value="A-" className="font-bold">A(-)</option>
                    <option value="B+" className="font-bold">B(+)</option>
                    <option value="B-" className="font-bold">B(-)</option>
                    <option value="AB+" className="font-bold">AB(+)</option>
                    <option value="AB-" className="font-bold">AB(-)</option>
                    <option value="O+" className="font-bold">O(+)</option>
                    <option value="O-" className="font-bold">O(-)</option>
                </select>
                <textarea placeholder="Your Message" className="bg-gray-300 rounded-sm py-2 px-4 w-full outline-none" {...register("message")} required></textarea>


                <button type="submit" className="btn-p cursor-pointer" >Submit</button>
            </form>
        </div>
    );
};

export default RequestForm;