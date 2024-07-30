import useUser from "../../CustomHocks/useUser";
import UserProfileLayout from "./Componets/UserProfileLayout";


const DashBoard = () => {
    const {user}=useUser()
    return (
        <div className="max-w">
           <UserProfileLayout></UserProfileLayout>
           
           {
            user.role==='user'&&<div>  user home </div>
           }
        </div>
    );
};

export default DashBoard;