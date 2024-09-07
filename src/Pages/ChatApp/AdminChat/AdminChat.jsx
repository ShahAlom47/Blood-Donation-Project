
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import useUser from '../../../CustomHocks/useUser';

const socket = io('http://localhost:3000'); // Backend URL
const AdminChat = () => {
    const [message, setMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [chat, setChat] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    socket.emit('join', user?.email);

    
    socket.on('p_message', (data) => {
        console.log(data);
      
    });

    return () => {
      socket.off('private_message');
    };
  }, [user?.email]);

  const sendMessage = () => {
   
    socket.emit('p_message', message);

    
  };

  return (
    <div className='py-3 max-w bg-blue-500 min-h-52'>
      <h2>One-to-One Chat</h2>
      <div className='min-h-24 bg-slate-400'>
        {chat.map((msg, index) => (
          <p key={index}><strong>{msg.from}:</strong> {msg.message}</p>
        ))}
      </div>
      <input 
        className='input input-bordered'
        type="text" 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button className='btn btn-md' onClick={sendMessage}>Send</button>
    </div>
  );
}

export default AdminChat;

