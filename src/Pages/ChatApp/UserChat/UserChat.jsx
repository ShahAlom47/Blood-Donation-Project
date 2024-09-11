import { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import { io } from "socket.io-client";
import useUser from "../../../CustomHocks/useUser";

const socket = io('http://localhost:3000');

const UserChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
console.log(messages);
  useEffect(() => {
    if (user?.email) {
      // Join the chat room
      socket.emit('join', { userEmail: user?.email, userRole: user?.role });

      // Listen for user messages
      socket.on('userMessage', (data) => {
        setMessages(data);
      });

      // Listen for admin messages
      socket.on('adminMessage', (data) => {
        setMessages(data);
      });

      return () => {
        socket.off('userMessage');
        socket.off('adminMessage');
      };
    }
  }, [user?.email, user?.role]);

  const sendMsg = async () => {
    if (message === '') return;

    // Send the user's message to the server
    socket.emit('message', { userEmail: user?.email, userName: user?.name, userRole: user?.role, message });

    // Update the local messages state with the new message
    setMessages(prevMessages => [...prevMessages, { message: message }]);
    setMessage('');
  };

  return (
    <div className="h-[62dvh] m-1 flex flex-col justify-between overflow-y-scroll relative">
      <div className="flex-1 p-2">
      <div className=" space-y-2  flex flex-col  ">
              {messages.map((msg, index) => (
                <div className={`flex items-start  gap-3 w-8/12 ${msg.senderEmail===user.email || msg.senderRole===user.role?'ml-auto flex-row-reverse':'mr-auto ' } `} key={index}>
                  <img className="w-8 h-8 rounded-full justify-center items-center flex bg-gray-400" src={`${msg.senderEmail===user.email?user.photoURL:''}`} alt="P" />
                  <span className=" mb-3 bg-green-600 p-2 rounded-bl-md rounded-tr-lg"> {msg.message}</span>
                </div>
              ))}
            </div>
      </div>

      <div className="flex justify-between items-center gap-2 p-2 sticky bottom-0 bg-gray-200">
        <input
          className='input rounded-full outline-none flex-1'
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={sendMsg} className='p-2 rounded-full text-2xl text-color-p hover:bg-gray-200'>
          <MdSend />
        </button>
      </div>
    </div>
  );
};

export default UserChat;
