import useUser from "../../../CustomHocks/useUser";
import img from '../../../assets/image/user-fake-profile-img.png'


const UserProfileLayout = () => {
    const {user}=useUser()
    return (
        <div>
            <div className="border-b-2 p-4 ">
                <div>
                    <img className="rounded-full w-20 h-20" src={user.profileURL?'':img} alt="user profile " />
                </div>
                <div className="">

                </div>

            </div>
            
        </div>
    );
};

export default UserProfileLayout;