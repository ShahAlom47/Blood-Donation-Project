/* eslint-disable react/prop-types */


import useMonthlyDonateFunc from "../ActionFunctions/useMonthlyDonateFunc";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useEffect, useState } from "react";
import ReactModal from "../../../../../../Components/Modal/ReactModal";

const MonthlyDonationActivePage = ({ setLastDonationMonth, data, refetch, }) => {

    const [openModal, setOpenModal] = useState(false)
    const [updateErr, setUpdateErr] = useState('')
    const { updateDonationAmount } = useMonthlyDonateFunc()

    useEffect(() => {
      const amountFormStatus=  localStorage.getItem('amountUpdateForm')
        if(amountFormStatus==='open'){
            setOpenModal(true)
            localStorage.removeItem('amountUpdateForm')
        }

    }, [])

    // Array of month names
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const sortedDonations = data?.donationHistory?.sort((a, b) => {
        return new Date(b.donationMonth + '-01') - new Date(a.donationMonth + '-01');
    });

    const latestDonation = sortedDonations?.[0];
    const latestMonth = latestDonation?.donationMonth;


    const formatMonth = (month) => {
        const [year, monthIndex] = month.split('-');
        const monthName = months[parseInt(monthIndex, 10) - 1];
        setLastDonationMonth(monthName)

        return `${monthName} ${year}`;
    };

    const handelUpdateForm = async (e) => {

        e.preventDefault();
        e.stopPropagation();
        setUpdateErr('')

        const amount = parseInt(e.target.amount.value);
        if (amount === data?.monthlyAmount) {
            setUpdateErr("You must change the amount to update.");
            return
        }
        updateDonationAmount(amount, refetch, setOpenModal,)
        setUpdateErr('')

    }

    return (
        <div className="my-4 mb-6 space-y-2">
            <div className=" flex justify-between border-b-2 border-color-p pb-3">
                <h1 className="text-xl font-bold -pb-3  ">Monthly Donation Active</h1>
                <button
                    type="button"
                    style={{ height: '30px' }}
                    className=" btn-p flex items-center justify-center gap-2 font-semibold  "
                    onClick={() => setOpenModal(true)}
                > <HiOutlinePencilSquare />Update </button>
            </div>
            <h1 className="text-xl font-semibold">
                Your Monthly Donation Amount: <span className="text-color-p text-2xl">{data?.monthlyAmount}</span> Tk
            </h1>
            {latestMonth && (
                <h1 className="text-lg font-medium">
                    Your donation is complete until: <span className="text-color-p text-xl">{formatMonth(latestMonth)}</span>
                </h1>
            )}

            <ReactModal setOpenModal={setOpenModal} openModal={openModal} label={'update  donation amount '}>
                <div className=" flex justify-center items-center flex-col py-6">
                    <h1 className="text-xl font-semibold mb-4">Update Your Donation Amount</h1>
                    <form onSubmit={handelUpdateForm} className="shadow-lg rounded-sm  flex items-center flex-wrap " >
                        <input className="h-full flex-1 px-4 outline-none border border-color-p min-h-10 rounded-sm" type="number" name="amount" defaultValue={data?.monthlyAmount} min={100} placeholder="Your Amount (min 100 Tk" />

                        <button className="btn-p w-full" type="submit"> Update</button>
                    </form>
                    <p className="text-color-p text-sm mt-2">{updateErr}</p>
                </div>
            </ReactModal>
        </div>
    );
};

export default MonthlyDonationActivePage;
