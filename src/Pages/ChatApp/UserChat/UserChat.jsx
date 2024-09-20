/* eslint-disable react/display-name */
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { MdSend } from "react-icons/md";
import { io } from "socket.io-client";
import useUser from "../../../CustomHocks/useUser";

const socket = io(import.meta.env.VITE_BASE_URL);

// const socket = io(import.meta.env.VITE_BASE_URL, {
//   transports: ['websocket', 'polling'], // Enable WebSocket with fallback to polling
//   reconnectionAttempts: 5,
//   timeout: 10000, // 10 seconds timeout for connection
// });



const UserChat = forwardRef((props, ref) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  const messagesEndRef = useRef(null); 

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
       
      }
    }, 100); 
  };

 
  useImperativeHandle(ref, () => ({
    scrollToBottom,
  }));


   useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

      // Cleanup when the component unmounts
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
    setMessages(prevMessages => [...prevMessages, { senderEmail: user?.email, senderRole: user?.role, message }]);
    setMessage('');

   
    scrollToBottom();
  };

  return (
    <div className="h-[62dvh] m-1 flex flex-col justify-between overflow-y-scroll relative">
      <div className="flex-1 p-2 overflow-y-auto">
        <div className="space-y-2 flex flex-col">
          {messages.map((msg, index) => (
            <div className={`flex items-start gap-3 w-8/12 ${msg.senderEmail === user.email || msg.senderRole === user.role ? 'ml-auto flex-row-reverse' : 'mr-auto'}`} key={index}>
              <img className="w-8 h-8 rounded-full justify-center items-center flex bg-gray-400" src={`${msg.senderEmail === user.email ? user.photoURL : ''}`} alt="P" />
              <span className="mb-3 bg-green-600 p-2 rounded-bl-md rounded-tr-lg">{msg.message}</span>
            </div>
          ))}

          {/* The div that scrolls to the bottom */}
          <div ref={messagesEndRef}></div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 p-2 sticky bottom-0 bg-gray-200">
        <input
          className='input rounded-full outline-none flex-1'
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMsg(); 
            }
          }}
          placeholder="Type your message here..."
        />
        <button onClick={sendMsg} type="submit" className='p-2 rounded-full text-2xl text-color-p hover:bg-gray-200'>
          <MdSend />
        </button>
      </div>
    </div>
  );
});
UserChat.displayName = 'UserChat';

export default UserChat;
