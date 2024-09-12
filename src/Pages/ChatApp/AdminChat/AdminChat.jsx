/* eslint-disable react/prop-types */
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import useAxios from "../../../CustomHocks/useAxiosSecure";
import useUser from "../../../CustomHocks/useUser";
import { FaArrowLeft } from "react-icons/fa6";
import { MdSend } from "react-icons/md";
import useChartAppFunc from "../useChartAppFunc";

const socket = io(import.meta.env.VITE_BASE_URL); // Backend URL

const AdminChat = ({userList,setUpdateUi,updateUi}) => {
  const { user } = useUser();
  const AxiosSecure = useAxios()
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)
  const [isOpen, setOpen] = useState(false)
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const {  changeAdminReadMsgStatus} = useChartAppFunc();



 // Function to scroll to the bottom of the chat
 const scrollToBottom = () => {
  setTimeout(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100); 
};

useEffect(() => {
  scrollToBottom();
}, [messages]);



  useEffect(() => {

    if (selectedUser) {
      socket.emit('join', { userEmail: selectedUser.userEmail, userRole: user?.role });  // Emit join event with user email
    }

    socket.on('adminMessage', (data) => {
      setMessages(data);
    });

    return () => {
      socket.off('adminMessage');
    };
  }, [user?.email, selectedUser, user?.role,AxiosSecure,updateUi]);

  const handelUserMsg = async (userEmail) => {
    setSelectedUser(userEmail)
    setOpen(true)

    if (user?.role === 'admin') {
      const readRes = await changeAdminReadMsgStatus(userEmail?.userEmail, user?.email, user?.role)
      if(readRes.data?.success===true){
          setUpdateUi(!updateUi)
      }
  }


  }

  const sendMsg = async () => {
    if (newMessage === '') return;

    socket.emit('sendAdminMessage', { 
      receiverEmail:selectedUser.userEmail,
      userEmail: user?.email, 
      userName: user?.name, 
      userRole: user?.role,
       newMessage });
       setNewMessage('')
       
  }

  
  return (

    <div className=" h-[62dvh] ">
      {!isOpen ?
        <div className="  h-full space-y-2 overflow-y-scroll">
          {
            userList?.map(user => <div key={user._id} onClick={() => handelUserMsg(user)} className="flex items-center justify-between gap-2 shadow-xl p-1 bg-green-300 hover:bg-green-200 cursor-pointer ">
              <div className="flex items-center gap-2">
                <div className="rounded-full p-3 bg-gray-700"></div>
                <p>{user.userEmail}</p>
              </div>
              <p className="bg-color-p text-white p-1 rounded-full text-sm">{user.unread}</p>

            </div>)
          }


        </div>

        :
        <div className="relative flex   flex-col h-full overflow-y-scroll   ">
          <div className="flex gap-3 items-center bg-black p-1 text-white mb-4 sticky top-0">
            <button className="btn btn-sm btn-circle text-black  h-3" onClick={() => setOpen(false)}> <FaArrowLeft /></button>
            <p className=" uppercase  ">{selectedUser?.userName || 'No Name'}</p>
          </div>

          <div className="flex-1 p-2">
            <div className=" space-y-2  flex flex-col  ">
              {messages.map((msg, index) => (
                <div className={`flex items-start  gap-3 w-8/12 ${msg.senderEmail===user.email || msg.senderRole===user.role?'ml-auto flex-row-reverse':'mr-auto ' } `} key={index}>
                  <img className="w-8 h-8 rounded-full justify-center items-center flex bg-gray-400" src={`${msg.senderEmail===user.email?user.photoURL:''}`} alt="P" />
                  <span className=" mb-3 bg-green-600 p-2 rounded-bl-md rounded-tr-lg"> {msg.message}</span>
                </div>
              ))}
              <div ref={messagesEndRef} ></div>
            </div>
          </div>

          <div className=" sticky bottom-0 bg-gray-200 flex justify-between items-center gap-2 p-2">
            <input
              className='input rounded-full outline-none flex-1'
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendMsg(); 
                }
              }}
              placeholder="Type your message here..."
            />
            <button onClick={sendMsg} className='p-2 rounded-full text-2xl text-color-p hover:bg-gray-200 '  ><MdSend /></button>
          </div>
        </div>

      }

    </div>

  );
};

export default AdminChat;
