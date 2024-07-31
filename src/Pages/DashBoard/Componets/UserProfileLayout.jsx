
import useUser from "../../../CustomHocks/useUser";
import img from '../../../assets/image/user-fake-profile-img.png'



const UserProfileLayout = () => {
    const { user } = useUser()

  

    return (
        <div className="lg:p-5 md:p-4 py-7">
            <div className="border-b-2 pb-4 px- flex  lg:flex-row md:flex-row flex-row lg:justify-start    items-center justify-center gap-5">
                <div>
                    <img className="rounded-full w-24 h-24 border-2 border-color-p" src={user.profileURL ? '' : img} alt="user profile " />
                </div>
                <div className="">
                    <h1 className="text-3xl font-bold mb-2">{user.name}  <span className="bg-gray-200 rounded-md text-lg px-2">{user.role}</span></h1>
                    <h2 className=" text-sm"><strong>Blood Group:</strong> <span className=" bg-color- p-1 rounded-full font-semibold text-color-p">{user.bloodGroup}</span></h2>
                    <h2 className=" text-sm"><strong>Last Donate:</strong> <span className="  rounded-full font-medium ">{user.lastDonate}</span></h2>

                </div>

            </div>


        

        </div>
    );
};

export default UserProfileLayout;