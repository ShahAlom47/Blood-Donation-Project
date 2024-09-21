import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";


const ForgetPassword = () => {
    const [emailError, setEmailError] = useState('')
    const [accountFound, setAccountFound] = useState(null)
    const AxiosPublic = useAxiosPublic()

    const finedUserAccount = async (e) => {
        e.preventDefault();
        setEmailError('')
        const userEmail = e.target.email.value

        const FindingRes = await AxiosPublic.get(`/user/findUserAccount/${userEmail}`)
        if (FindingRes.data?.status === false) {
            setEmailError(FindingRes.data.message)
            return
        }
        setAccountFound(FindingRes.data?.user)
        console.log(FindingRes.data.user);
    }

    return (
        <div className="max-w  ">
            <div className=" min-h-screen flex justify-center items-center flex-col">
                <div className=" lg:w-6/12 md:w-8/12 w-full mx-auto shadow-4-side p-5">
                    { accountFound?
                     <div className=" flex flex-col justify-center items-center my-4">
                        <img className=" h-20 w-20 rounded-full border-2 border-black" src={accountFound.photoURL} alt="user Profile Photo" />
                        <h1 className=" font-bold text-xl">{accountFound?.name}</h1>
                        <p className=" font-semibold flex items-center">{accountFound?.email} <button onClick={()=>setAccountFound(null)} className=" btn btn-link">Not you</button></p>
                        <Link to={`/verifyAccountEmail/${accountFound?.email}`} > <button className="btn bg-blue-800 hover:bg-blue-900 text-white rounded-sm">Yes, it`s me</button></Link>
                     </div>
                       : <div>
                            <h1 className="font-bold text-xl border-b-2 pb-3 mb-4">Find Your Account</h1>
                            <p className="my-3"> Please enter your email address  to search for your account.</p>
                            <form onSubmit={finedUserAccount} >
                                <input className=" my-4 input input-bordered rounded-sm w-full" type="email" name="email" placeholder="Email address..." />
                                {emailError ? <p className="text-color-p my-2">{emailError}</p> : ''}
                                <div className="flex items-center justify-end gap-3 ">
                                    <Link to={-1} > <button type="button" className="btn btn-sm rounded-sm h-[40px]">Cancel</button></Link>
                                    <button type='submit' className="btn-p">Search</button>
                                </div>

                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;