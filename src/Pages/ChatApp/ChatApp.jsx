import { useEffect, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import MotionChatBox from "./MotionChatBox/MotionChatBox";
import useUser from "../../CustomHocks/useUser";
import AdminChat from "./AdminChat/AdminChat";
import UserChat from "./UserChat/UserChat";
import { io } from "socket.io-client";
const socket = io('http://localhost:3000'); // Backend URL


const ChatApp = () => {
    const [openChatBox, setOpenChatBox] = useState(false)
    const { user } = useUser()

    const [userList, setUserList] = useState([]);

    //   socket join for user list (
       
    useEffect(() => {
       

        if (user.role === 'admin') {
            socket.emit('joinChat', { userEmail: user?.email, userRole: user?.role });
        }
        socket.on('joinChatUser', (data) => {
            console.log(data);
            setUserList(data);
        });

        return () => {
            socket.off('joinChatUser');
        };


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ openChatBox])


console.log(userList);


    if (!user) return
    return (
        <div>
            <button className="top-[80dvh] fixed z-[9999] right-5" onClick={() => setOpenChatBox(!openChatBox)}>
                <div className="p-2  rounded-full bg-gray- bg-color-p hover:bg-red-700 cursor-pointer relative ">
                    <IoChatbubbleEllipsesOutline className="text-3xl text-white" />
                    <p className="bg-white rounded-full absolute -top-1/3 p-1 right-1 border border-color-p font-medium ">99</p>
                </div>
            </button>

            <div className={`h-[70dvh] ${openChatBox ? '' : 'hidden'} `}>
                <MotionChatBox openChatBox={openChatBox} setOpenChatBox={setOpenChatBox} >

                    {
                        user?.role === 'admin' ?
                            <AdminChat userList={userList} ></AdminChat> :
                            <UserChat></UserChat>
                    }



                </MotionChatBox>

            </div>



        </div>
    );
};

export default ChatApp;