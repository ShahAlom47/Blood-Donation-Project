import useUser from "../../CustomHocks/useUser";
import AdminHome from "./AdminHome/AdminHome";
import UserProfileLayout from "./Componets/UserProfileLayout";
import UserHome from "./UserHome/UserHome";


const DashBoard = () => {
    const {user}=useUser()
    return (
        <div className="max-w p-4">
           <UserProfileLayout></UserProfileLayout>

           {
            user.role==='user'&&<UserHome></UserHome>
           }
           {
            user.role==='admin'&&<AdminHome></AdminHome>
           }
        </div>
    );
};

export default DashBoard;