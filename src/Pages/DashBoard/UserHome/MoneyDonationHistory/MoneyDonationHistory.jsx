import { RiCheckboxCircleFill } from "react-icons/ri";
import useUser from "../../../../CustomHocks/useUser";
import { TbCoinTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import useUserHomeFunction from "../useUserHomeFunction";
import DonationHistoryTable from "./DonationHistoryTable";
import UserDonationSummary from "./UserDonationSummary";

const MoneyDonationHistory = () => {
    const { user } = useUser();
    const{handelUpdateAmount}=useUserHomeFunction()

    return (
        <div>
            {user?.monthlyDonation==='active'&&
                <div className="flex items-center justify-between lg:flex-row md:flex-row flex-col gap-4  shadow-xl px-2 py-5 rounded-sm bg-gray-400 bg-opacity-10">
                <div className="flex lg:justify-start md:justify-start justify-between gap-1 w-full">
                    <h1 className=" lg:text-2xl md:text-2xl text-xl flex items-center gap-1  font-semibold">Monthly Donation : <RiCheckboxCircleFill className="text-green-500" /></h1>
                   <Link to={'/donateMoney'}> <button style={{ width: '100px', height: '32px' }} className="btn-p">Donate</button></Link>
                </div>
                <div className="flex lg:justify-end md:justify-end  justify-between gap-2 w-full">
                    <h1 className=" lg:text-2xl md:text-2xl text-xl font-bold flex items-center justify-start  gap-1">< TbCoinTaka className="text-3xl" /> {user?.donationAmount || 0} Tk</h1>
                    <button  onClick={handelUpdateAmount} style={{ width: '150px', height: '32px' }} className="btn-p ">Update Amount</button>
                </div>
            </div>
            }

           {/* Donation Summary  */}
            <UserDonationSummary></UserDonationSummary>

            <DonationHistoryTable></DonationHistoryTable>

        </div>
    );
};

export default MoneyDonationHistory;