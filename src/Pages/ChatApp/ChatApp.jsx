import { useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import MotionChatBox from "./MotionChatBox/MotionChatBox";
import useUser from "../../CustomHocks/useUser";
import AdminChat from "./AdminChat/AdminChat";
import UserChat from "./UserChat/UserChat";


const ChatApp = () => {
    const [openChatBox, setOpenChatBox] = useState(false)
    const { user } = useUser()


    if (!user) return
    return (
        <div>
            <button className="top-[80dvh] fixed z-[9999] right-5" onClick={() => setOpenChatBox(!openChatBox)}>
                <div className="p-2  rounded-full bg-gray- bg-color-p hover:bg-red-700 cursor-pointer relative ">
                    <IoChatbubbleEllipsesOutline className="text-3xl text-white" />
                    <p className="bg-white rounded-full absolute -top-1/3 p-1 right-1 border border-color-p font-medium ">99</p>
                </div>
            </button>

            <div className={`h-[70dvh] ${openChatBox?'':'hidden'} `}>
                <MotionChatBox openChatBox={openChatBox} setOpenChatBox={setOpenChatBox} >
                  
                   {
                        user?.role === 'admin' ?
                            <AdminChat ></AdminChat> :
                            <UserChat></UserChat>
                    }
                 


                </MotionChatBox>

            </div>



        </div>
    );
};

export default ChatApp;