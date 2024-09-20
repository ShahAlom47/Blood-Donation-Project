import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';


const EditPassword = () => {
    const [passwordError, setPasswordError] = useState('');
    const [showPass,setShowPass]=useState(false)


    return (
        <div className=" max-w  py-6 ">
            <div className=" w-6/12 mx-auto  flex flex-col justify-center">
                <h1 className=" text-xl font-bold pb-2 w-full text-center border-b-2 border-color-p">Change Password</h1>

                <form  className=" flex flex-col p-4 ">
                <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Your Password</label>
                            <div className="input input-bordered rounded w-full mt-1 relative">
                            <input
                                type={showPass?'password':'text'}
                                name='password'
                                placeholder='Password..'
                                className="my-auto w-full mt-2"
                            />
                            <span className='absolute top-1/4 right-5' onClick={()=>setShowPass(!showPass)}>{showPass?<IoIosEyeOff />:<IoIosEye />}</span>
                            </div>
                            {/* {passwordError && <p className="text-red-500 text-sm mt-1">{errPass}</p>} */}
                </div>
                <button style={{ width: '100%' }} type="submit" className="btn-p w-full mt-4">Confirm</button>
                </form>

            </div>
        </div>
    );
};

export default EditPassword;