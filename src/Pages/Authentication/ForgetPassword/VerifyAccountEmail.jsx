import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MdOutlineVerified } from "react-icons/md";

const VerifyAccountEmail = () => {
    const { otp } = useParams();
    const inputsRef = useRef([]);
    const [timeOut, setTimeOut] = useState(false)
    const [seconds, setSeconds] = useState(59);
    const [isVerified, setVerify] = useState(false)
    const [isNotMatch, setNotMatch] = useState(false)

    console.log(otp);

    useEffect(() => {
        let timer = null;

        if (seconds > 0) {
            timer = setInterval(() => setSeconds(prev => prev - 1), 1000);
        } else {
            clearInterval(timer);
            setTimeOut(true);
        }

        return () => clearInterval(timer);
    }, [seconds]);


    const handleChange = (index, value) => {
        if (value.length === 1 && index < 3) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && !e.target.value) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleOtp = (e) => {
        e.preventDefault();
        const OTP = inputsRef.current.map(input => input.value).join('');
        if (OTP === otp) {
            setVerify(true)
            setNotMatch(false)
            console.log(OTP, 'match');
            return
        }
        setVerify(false)
        setNotMatch(true)
        console.log(OTP, 'not  match');
        return

    };

    return (
        <div className="min-h-screen flex justify-center items-center flex-col">
            <div className="lg:w-6/12 md:w-8/12 w-full mx-auto shadow-4-side p-5 mb-5 text-center">
                <h1 className="font-bold text-xl mb-2">Verify Your Account</h1>
                <p className="mb-2 text-lg text-gray-800">We are sending an OTP to verify your email address.</p>

                {isVerified ?
                    <div className="flex gap-3 flex-col items-center justify-center">
                            <MdOutlineVerified  className="text-8xl text-green-700 text-center"></MdOutlineVerified>
                            <button type="button" className="p-x4 btn btn-md rounded-sm bg-green-700 hover:bg-green-600 text-white">Next</button>
                    </div>
                    :
                    <form onSubmit={handleOtp} className="my-4 flex flex-col items-center gap-5">
                        <div className="flex justify-center gap-2">
                            {Array.from({ length: 4 }, (_, index) => (
                                <input
                                    key={index}
                                    className="h-16 w-16 border-2 border-black rounded-sm font-bold text-center text-xl"
                                    type="text"
                                    required
                                    autoFocus={index === 0}
                                    maxLength={1}
                                    ref={el => inputsRef.current[index] = el}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                />
                            ))}
                        </div>

                        {isNotMatch && <p className="text-color-p my-3 text-lg text-center ">OTP Not Match</p>}
                        <div className="mt-4">
                            <p>{seconds > 0 ? `Resend OTP in ${seconds} seconds` : "Not receive OTP?"}</p>
                            {seconds === 0 && (
                                <Link to={-1} className=" btn btn-link">Try Again</Link>
                            )}
                        </div>
                        {
                            !timeOut &&
                            <button type="submit" className="mx-auto btn btn-md rounded-sm bg-green-700 hover:bg-green-600 text-white">Verify</button>
                        }
                    </form>
                }
            </div>
            
        </div>
    );
};

export default VerifyAccountEmail;
