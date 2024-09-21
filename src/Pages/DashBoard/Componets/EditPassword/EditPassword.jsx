import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import useAxios from "../../../../CustomHocks/useAxiosSecure";
import useUser from "../../../../CustomHocks/useUser";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import usePasswordChange from "../../../../CustomHocks/usePasswordChange";

const EditPassword = () => {
  const [passwordError, setPasswordError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  const { register, handleSubmit,  reset, formState: { errors } } = useForm();
  const { user } = useUser();
  const navigate = useNavigate()
  const AxiosSecure = useAxios();

  const {changePassword}=usePasswordChange()

  const checkPassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    const password = e.target.password.value;

    const res = await AxiosSecure.post(`/user/checkPassword/${user?.email}`, { password })
    if (res.data?.status === false) {
      setPasswordError(res.data?.message)
      setPassMatch(false)
      return
    }
    setPassMatch(true)
    e.target.reset()
  };

  const onSubmit=async(data)=>{
    if(data.password!=data.confirmPassword){
      setPasswordError('Confirm Password is not match')
      return
    }

    const res = await changePassword(user.email,data.password)
   
    if (res.data?.status ) {
      reset()
      Swal.fire(res.data.message)
      setTimeout(() => {
        navigate('/dashBoard')
      }, 1200);
   return
    }
    Swal.fire(res.data.message)

  }


  return (
    <div className="max-w py-6 ">
      <div className="w-6/12 mx-auto flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-xl font-bold pb-2 w-full text-center border-b-2 border-color-p">
          Change Password
        </h1>


        {passMatch ?

          <form onSubmit={handleSubmit(onSubmit)} className=" w-full my-4">
         
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">New Password</label>
              <div className='relative input input-bordered rounded w-full mt-1'>
                <input
                  type={`${showPass ? 'text' : 'password'}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long"
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                      message: "Password must contain at least one letter and one number"
                    }
                  })}
                  className=" mt-1 w-full h-full "
                />
                <button type="button" className='absolute top-1/4 right-5' onClick={() => setShowPass(!showPass)}>{showPass ? <IoIosEyeOff /> : <IoIosEye />}</button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <div className='relative input input-bordered rounded w-full mt-1'>
                <input
                  type={`${showPass ? 'text' : 'password'}`}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                   
                  })}
                  className=" mt-1 w-full h-full "
                />
                <button type="button" className='absolute top-1/4 right-5' onClick={() => setShowPass(!showPass)}>{showPass ? <IoIosEyeOff /> : <IoIosEye />}</button>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <button style={{ width: '100%' }} type="submit" className="btn-p w-full mt-4">Confirm</button>
          </form>

          :
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
          </form>}
      </div>
    </div>
  );
};

export default EditPassword;
