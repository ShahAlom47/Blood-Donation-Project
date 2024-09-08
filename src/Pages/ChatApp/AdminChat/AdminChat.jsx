import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import useAxios from "../../../CustomHocks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../../CustomHocks/useUser";
import { FaArrowLeft } from "react-icons/fa6";
import { MdSend } from "react-icons/md";

const socket = io('http://localhost:3000'); // Backend URL

const AdminChat = () => {
  const { user } = useUser();
  const AxiosSecure = useAxios()
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)
  const [isOpen, setOpen] = useState(false)
  const [newMessage, setNewMessage] = useState('');

  const { data: userList } = useQuery({
    queryKey: ['getChatList', user?.email],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/chatData/chartUsers/${user?.email}`)
      return res.data
    }
  })




  useEffect(() => {
    if (selectedUser) {
      socket.emit('join', {userEmail:selectedUser.userEmail,userRole:user?.role});  // Emit join event with user email
    }

    socket.on('adminMessage', (data) => {

      setMessages(data);
    });

    return () => {
      socket.off('adminMessage');
    };
  }, [user?.email, selectedUser,user?.role]);

  const handelUserMsg = async (userEmail) => {
    setSelectedUser(userEmail)
    setOpen(true)

  }

  const sendMsg = async() =>{


  }

  console.log(messages);
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
                <div className="flex items-start  gap-3" key={index}>
                  <strong className="rounded-full p-1 bg-gray-300">User</strong>
                  <span className=" mb-3 bg-green-600 p-2 rounded-bl-md rounded-tr-lg"> {msg.message}</span>
                </div>
              ))}
            </div>
          </div>
         
            <div className=" sticky bottom-0 bg-gray-200 flex justify-between items-center gap-2 p-2">
              <input
                className='input rounded-full outline-none flex-1'
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
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
