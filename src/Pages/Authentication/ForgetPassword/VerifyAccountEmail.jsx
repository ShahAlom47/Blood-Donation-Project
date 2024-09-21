import { useParams } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { useState, useEffect } from "react";
import generateOTP from '../../../UtilityFiles/otpGenerator';
import { CiFaceFrown } from "react-icons/ci";
import { GoVerified } from "react-icons/go";

const VerifyAccountEmail = () => {
    const { email } = useParams();
    const [otp, setOtp] = useState('');
    const [generatedOTP, setGeneratedOTP] = useState(null);
    const [seconds, setSeconds] = useState(20);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isVerified, setVerify] = useState(false);

    
    useEffect(() => {
        if (seconds > 0) {
            const timer = setInterval(() => setSeconds(seconds - 1), 1000);
            return () => clearInterval(timer);
        } else {
            setIsDisabled(true);
            if (!isVerified) {
                setGeneratedOTP(null);  
            }
        }
    }, [seconds, isVerified]);

    
    useEffect(() => {
        setGeneratedOTP(generateOTP());
    }, []);

    
    useEffect(() => {
        if (otp.length === 4 && generatedOTP === otp) {
            setVerify(true);
        }
    }, [otp, generatedOTP]);

    const handleResendClick = () => {
        setGeneratedOTP(generateOTP());
        setSeconds(20);
        setIsDisabled(false);
        setOtp('');
        alert(`New OTP sent to ${email}`);
    };

    const handlePasswordChange = () => {
    
        alert('Proceed to password change');
    };

    return (
        <div className="min-h-screen flex justify-center items-center flex-col">
            <div className="lg:w-6/12 md:w-8/12 w-full mx-auto shadow-4-side p-5">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="font-bold text-xl mb-2">Verify Your Account</h1>
                    <p className="mb-2 text-lg text-gray-800">We are sending an OTP to verify your email address.</p>

                    <div className="flex flex-col justify-center items-center space-y-3 pb-6">
                        {!isVerified && (
                            <p>
                                {seconds > 0 
                                    ? `Resend OTP in ${seconds} seconds` 
                                    : <button onClick={handleResendClick} className="btn btn-link">Resend OTP</button>
                                }
                            </p>
                        )}

                        {!isVerified && otp.length === 4 && (
                            <div className="flex flex-col items-center text-red-600">
                                <CiFaceFrown className="text-4xl" />
                                <p className="font-semibold">OTP Not Match, Try Again</p>
                            </div>
                        )}

                        {isVerified && (
                            <div className="flex flex-col items-center text-green-700">
                                <GoVerified className="text-4xl" />
                                <p className="font-semibold text-black">Verified</p>
                            </div>
                        )}

                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span>-</span>}
                            isInputNum
                            disabled={isDisabled}
                            renderInput={(props) => <input {...props} />}
                            shouldAutoFocus
                            inputStyle={{
                                width: '3rem',
                                height: '3rem',
                                margin: '0 1rem',
                                fontSize: '1.5rem',
                                borderRadius: '5px',
                                border: '1px solid rgba(0,0,0,0.3)',
                            }}
                        />

                        {isVerified && (
                            <button onClick={handlePasswordChange} className="btn bg-blue-500 hover:bg-blue-600 text-white rounded">
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyAccountEmail;
