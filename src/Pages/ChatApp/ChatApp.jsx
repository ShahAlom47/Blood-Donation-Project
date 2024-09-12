import { useEffect, useState, useRef } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import MotionChatBox from "./MotionChatBox/MotionChatBox";
import useUser from "../../CustomHocks/useUser";
import AdminChat from "./AdminChat/AdminChat";
import UserChat from "./UserChat/UserChat";
import { io } from "socket.io-client";
import useChartAppFunc from "./useChartAppFunc";

const socket = io(import.meta.env.VITE_BASE_URL);// Backend URL

const ChatApp = () => {
    const [openChatBox, setOpenChatBox] = useState(false);
    const { user } = useUser();
    const [userList, setUserList] = useState([]);
    const [userUnreadMsg, setUnreadMsg] = useState(0);
    const [updateUi, setUpdateUi] = useState(false)

    const { changeUserReadMsgStatus } = useChartAppFunc();

    const userChatRef = useRef(null); // Reference to UserChat component

    useEffect(() => {
        if (user) {
            socket.emit('joinChat', { userEmail: user?.email, userRole: user?.role });

            // Listen for user unread messages
            socket.on('userUnreadMsg', (data) => {
                setUnreadMsg(data);
            });

            // Listen for chat user list
            socket.on('joinChatUser', (data) => {
                setUserList(data);
            });

            return () => {
                socket.off('userUnreadMsg');
                socket.off('joinChatUser');
            };
        }
    }, [user, openChatBox,updateUi]);

    // Calculate total unread messages
    const totalUnread = userList?.reduce((total, user) => {
        return total + (user.unread || 0);
    }, 0);


    // Toggle chat box and scroll to bottom when opened
    const handleChatIconClick = async() => {
        setOpenChatBox(!openChatBox);


        if (userChatRef.current) {
            userChatRef.current.scrollToBottom(); // Scroll to the bottom when the chat box opens
        }

        // if (user?.role === 'admin') {
        //     const readRes = await changeAdminReadMsgStatus(user?.email, user?.role)
        //     if(readRes.data?.success===true){
        //         setUpdateUi(!updateUi)
        //     }
        //     return
        // }
        // else
         if (user?.role === 'user') {
            const readRes = await changeUserReadMsgStatus(user?.email, user?.role)
            if(readRes.data?.success===true){
                setUpdateUi(!updateUi)
            }
        }

       

    };

    if (!user) return null;

    return (
        <div>
            <button className="top-[80dvh] fixed z-[9999] right-5" onClick={handleChatIconClick}>
                <div className="p-2 rounded-full bg-gray- bg-color-p hover:bg-red-700 cursor-pointer relative">
                    <IoChatbubbleEllipsesOutline className="text-3xl text-white" />
                    <p className="bg-white rounded-full absolute -top-1/3 p-1 right-1 border border-color-p font-medium">
                        {user?.role === 'admin'  ? (totalUnread >0 && totalUnread) : (userUnreadMsg > 0 && userUnreadMsg )}
                    </p>
                </div>
            </button>

            <div className={`h-[70dvh] ${openChatBox ? '' : 'hidden'}`}>
                <MotionChatBox openChatBox={openChatBox} setOpenChatBox={setOpenChatBox}>
                    {user?.role === 'admin' ? (
                        <AdminChat userList={userList} setUpdateUi={setUpdateUi} updateUi={updateUi} />
                    ) : (
                        <UserChat ref={userChatRef} />
                    )}
                </MotionChatBox>
            </div>
        </div>
    );
};

export default ChatApp;
