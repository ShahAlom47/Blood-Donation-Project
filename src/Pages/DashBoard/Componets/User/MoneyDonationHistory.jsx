import { RiCheckboxCircleFill } from "react-icons/ri";
import useUser from "../../../../CustomHocks/useUser";
import { TbCoinTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import useUserHomeFunction from "./useUserHomeFunction";

const MoneyDonationHistory = () => {
    const { user } = useUser();
    const{handelUpdateAmount}=useUserHomeFunction()

    return (
        <div>
            <div className="flex items-center justify-between gap-4  shadow-xl px-2 py-5 rounded-sm bg-gray-400 bg-opacity-10">
                <div className="flex gap-1">
                    <h1 className="flex items-center gap-1 text-2xl font-semibold">Monthly Donation : <RiCheckboxCircleFill className="text-green-500" /></h1>
                   <Link to={'/donateMoney'}> <button style={{ width: '100px', height: '32px' }} className="btn-p">Donate</button></Link>
                </div>
                <div className="flex gap-2">
                    <h1 className=" text-2xl font-bold flex items-center gap-1">< TbCoinTaka className="text-3xl" /> {user?.donationAmount} Tk</h1>
                    <button  onClick={handelUpdateAmount} style={{ width: '150px', height: '32px' }} className="btn-p">Update Amount</button>
                </div>
            </div>
        </div>
    );
};

export default MoneyDonationHistory;