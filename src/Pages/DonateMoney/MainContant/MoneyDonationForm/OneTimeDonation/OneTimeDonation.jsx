import { useState } from "react";
import Swal from "sweetalert2";
import { IoIosArrowRoundForward } from "react-icons/io";
import useUser from "../../../../../CustomHocks/useUser";
import CheckUserModal from "./CheckUserModal/CheckUserModal";
import ReactModal from "../../../../../Components/Modal/ReactModal";
import GuestInfoForm from "./GuestInfoForm/GuestInfoForm";
import { useNavigate } from "react-router-dom";

const OneTimeDonation = () => {
    const { user } = useUser();
    const navigate=useNavigate();
    const [amount, setAmount] = useState(100);
    const [customInputValue, setCustomInputValue] = useState('');
    const [finalDonationAmount, setFinalDonationAmount] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openGuestForm, setGuestForm] = useState(false);



    const handleDonate = (e) => {
        e.preventDefault();
        const finalAmount = amount === 'Custom Amount' ? customInputValue : amount;
        if (finalAmount === '' || isNaN(finalAmount) || finalAmount <= 0) {
            Swal.fire('Please enter a valid donation amount');
            return;
        }

        setFinalDonationAmount(finalAmount)
        e.target.reset();
        setCustomInputValue('');

        if (!user) {
             setOpenModal(true)
             return
             }

        const donationData = {
            donorName: user?.name,
            donorEmail: user?.email,
            donorPhone:user?.phoneNumber,
            date: new Date().toLocaleDateString(),
            amount: parseInt(finalAmount),
            category: "moneyDonation",
            donationType:'oneTimeDonation',
            userType: "user",
        }
        

        navigate('/paymentPage', { state: { donationData } });

    };




  



    return (
        <div className="my-2">
            <div className="flex gap-4 flex-wrap">
                {[ 100, 200, 400, 500, 1000].map((money) =>
                    <button
                        key={money}
                        onClick={() => setAmount(money)}
                        className={`border border-color-p px-3 py-1 ${amount === money ? 'bg-color-p text-white' : ''}`}
                    >{money} TK</button>)
                }
            </div>
            <div className="my-3">
                <form onSubmit={handleDonate}>
                    <div className="flex gap-4 lg:flex-row md:flex-row flex-col mb-5">
                        <button
                            type="button"
                            onClick={() => setAmount('Custom Amount')}
                            className={`lg:w-4/12 md:w-4/12 w-full py-1 border border-color-p px-3 ${amount === 'Custom Amount' ? 'bg-color-p text-white' : ''}`}
                        >
                            Custom Amount
                        </button>
                        <input
                            disabled={amount !== 'Custom Amount'}
                            required={amount === 'Custom Amount'}
                            className="flex-1 input input-bordered w-full rounded-sm py-1 outline-none border-non"
                            type="number"
                            name="amount"
                            min={100}
                            placeholder="Your Amount"
                            value={customInputValue}
                            onChange={(e) => setCustomInputValue(e.target.value)}
                        />
                    </div>
                    <button className="btn-p flex items-center justify-center gap-2" type="submit">Next <IoIosArrowRoundForward className="text-xl" /></button>
                </form>
            </div>
            <CheckUserModal setOpenModal={setOpenModal} openModal={openModal} setGuestForm={setGuestForm}></CheckUserModal>
            <ReactModal openModal={openGuestForm} setOpenModal={setGuestForm}  label="guestForm"  > <GuestInfoForm amount={finalDonationAmount} /></ReactModal>
        </div>
    );
};

export default OneTimeDonation;
