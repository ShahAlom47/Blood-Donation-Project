
import { Link } from "react-router-dom";
import useUser from "../../../CustomHocks/useUser";
import img from '../../../assets/image/user-fake-profile-img.png'
import { FiEdit } from "react-icons/fi";



const UserProfileLayout = () => {
    const { user } = useUser()



    return (
        <div className="lg:p-5 md:p-4 py-7">
            <div className="border-b-2 pb-4 px- flex  lg:flex-row md:flex-row flex-row lg:justify-between    items-end justify-center gap-5">
                <div className=" flex gap-5 lg:flex-row md:flex-row flex-row lg:justify-start    items-center justify-center ">
                    <div>
                        <img className="rounded-full w-24 h-24 border-2 border-color-p" src={user.profileURL ? '' : img} alt="user profile " />
                    </div>
                    <div className="">
                        <h1 className="text-3xl font-bold mb-2">{user.name}  <span className="bg-gray-200 rounded-md text-lg px-2">{user.role}</span></h1>
                        <h2 className=" text-sm"><strong>Blood Group:</strong> <span className=" bg-color- p-1 rounded-full font-semibold text-color-p">{user.bloodGroup}</span></h2>
                        <h2 className=" text-sm"><strong>Last Donate:</strong> <span className="  rounded-full font-medium ">{user.lastDonate}</span></h2>

                    </div>


                </div>
                <div className="flex items-end">

                    <Link to={'/donateBlood/user/editProfile'}><button style={{width:'130px' }} className="btn-p flex justify-center gap-3 items-center "><FiEdit /> Edit Profile</button></Link>
                </div>

            </div>





        </div>
    );
};

export default UserProfileLayout;