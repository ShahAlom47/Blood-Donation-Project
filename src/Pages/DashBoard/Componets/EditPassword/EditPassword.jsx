import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import useAxios from "../../../../CustomHocks/useAxiosSecure";
import useUser from "../../../../CustomHocks/useUser";

const EditPassword = () => {
  const [passwordError, setPasswordError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const {user} = useUser() ;
  const AxiosSecure=useAxios();

  const checkPassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    const password = e.target.password.value; 

    const res = await AxiosSecure.post(`/user/checkPassword/${user?.email}`,{password})
    if(res.data?.status===false){
        setPasswordError(res.data?.message)
        return
    }
    alert(res.data?.message)
    console.log(res.data);
      
    
  };



  return (
    <div className="max-w py-6 ">
      <div className="w-6/12 mx-auto flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-xl font-bold pb-2 w-full text-center border-b-2 border-color-p">
          Change Password
        </h1>

        <form onSubmit={checkPassword} className="flex flex-col p-4 w-full">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Your Password</label>
            <div className="input input-bordered rounded w-full mt-1 relative">
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder='Password..'
                className="my-auto w-full mt-2"
              />
              <span 
                className="absolute top-1/4 right-5 cursor-pointer" 
                onClick={() => setShowPass(!showPass)}>
                {showPass ? <IoIosEyeOff /> : <IoIosEye />}
              </span>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <button style={{ width: '100%' }} type="submit" className="btn-p w-full mt-4">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPassword;
