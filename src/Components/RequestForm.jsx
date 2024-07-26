import { useForm } from "react-hook-form";
import useUser from "../CustomHocks/useUser";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RequestForm = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, reset } = useForm();

   
    useEffect(() => {
        const formData = JSON.parse(localStorage.getItem('RequFormData'));
        if (formData) {
            reset(formData);
        }
    }, [reset]);

    const onSubmit = (data) => {
        if (!user) {
            localStorage.setItem('RequFormData', JSON.stringify(data));
            Swal.fire({
                title: "You are not logged in!",
                text: "To request blood, please log in first",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location.pathname } });
                }
            });
            return;
        }

        console.log(data);
        localStorage.removeItem('RequFormData');
    };

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

                <button type="submit" className="btn-p cursor-pointer">Submit</button>
            </form>
        </div>
    );
};

export default RequestForm;
