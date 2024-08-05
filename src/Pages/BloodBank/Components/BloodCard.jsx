import { FaDroplet } from "react-icons/fa6";
import PropTypes from 'prop-types';
import useAxios from "../../../CustomHocks/useAxiosSecure";

const BloodCard = ({ data, group }) => {
    const AxiosSecure=useAxios();


    const handleBloodCard= async(group) => {
       
       const res=await AxiosSecure.get(`/bloodBank/blood-groupData/${group}`)
       console.log(res.data);
    };
   
    return (
        <div className=" bg-gray-200 rounded-md shadow-2xl flex justify-between p-4 blood-card">
            <div className="">
                <h1 className="lg:text-xl  te font-semibold ">Available (<span className=" text-color-p ">
                    {data?.totalAvailable ? data?.totalAvailable : 0}
                </span>)</h1>
                <h2 className="text-sm"> <strong>Donor:</strong> <span className="">{data?.totalDonors ? data?.totalDonors : 0}</span></h2>
                <h2 className="text-sm"> <strong>Bags: </strong> <span className="">{data?.totalBloodBags ? data?.totalBloodBags : 0}</span></h2>

            </div>
            <div className=" flex justify-between items-end flex-col ">
                <h1 className=" lg:text-2xl text-xl flex items-center gap-1 font-bold">{group} <FaDroplet className=" text-color-p" /></h1>
                <button onClick={() => handleBloodCard(data?.bloodGroup ? data?.bloodGroup : null)} style={{ height: '25px' }} className="btn-p"> View</button>
            </div>
        </div>
    );
};

export default BloodCard;
BloodCard.propTypes = {
    group: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    handleBloodCardClick: PropTypes.func.isRequired,
};