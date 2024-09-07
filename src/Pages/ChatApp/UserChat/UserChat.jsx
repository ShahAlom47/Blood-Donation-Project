import { useState } from "react";
import { MdSend } from "react-icons/md";

const UserChat = () => {
  const [message, setMessage] = useState('');


  return (
    <div className="h-full m-1 flex flex-col justify-between">
      <div className=" flex-1 ">
        {message}
      </div>


      <div className=" flex justify-between items-center gap-2 p-2">
        <input
          className='input rounded-full outline-none flex-1'
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button className='p-2 rounded-full text-2xl text-color-p hover:bg-gray-200 '  ><MdSend /></button>
      </div>

    </div>
  );
};

export default UserChat;