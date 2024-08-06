import { FaDroplet } from "react-icons/fa6";
import PropTypes from 'prop-types';
import useAxios from "../../../CustomHocks/useAxiosSecure";
import { useState } from "react";
import ReactModal from "../../../Components/Modal/ReactModal";
import Loading from "../../../SharedComponent/Loading";
import { MdWaterDrop } from "react-icons/md";
import { RiUserHeartFill } from "react-icons/ri";

const BloodCard = ({ data, group }) => {
    const AxiosSecure = useAxios();
    const [bloodGroupData, setBloodGroupData] = useState([])
    const [openModal, setOpenModal] = useState(false)

    const handleBloodCard = async (group) => {
      const res = await AxiosSecure.get(`/bloodBank/blood-groupData/${group}`)
        setBloodGroupData(res.data)
        setOpenModal(true)
    };


    const handelRequest=async(id)=>{
        console.log(id);

    }
   
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

            {/* details modal */}

            <ReactModal setOpenModal={setOpenModal} openModal={openModal} label={'blood group details'}>
               {
                bloodGroupData?<div className=" flex flex-wrap gap-4 justify-center">
                    {
                        bloodGroupData.map((data,index)=><div className=" mb-4 bg-gray-200 shadow-lg p-3 space-y-2" key={index}>
                            <h1><strong>Email: </strong>{data?.email}</h1>
                            <h1><strong>Mobile: </strong>{data?.phoneNumber}</h1>
                            <h1><strong>BloodGroup: </strong><span className="text-color-p font-bold">{data?.bloodGroup}</span></h1>
                            {
                                data?.bloodGroup==='blood'?
                                <h1 className="flex gap-2"> <strong>Type: </strong><span className=" px-3 bg-gray-800 rounded-sm text-white flex items-center gap-2"><MdWaterDrop /> {data?.type}</span></h1>:
                                <h1 className="flex gap-2"> <strong>Type: </strong><span className=" px-3 bg-gray-800 rounded-sm text-white flex items-center gap-2"><RiUserHeartFill /> {data?.type}</span></h1>

                            }
                            <h1><strong>Address: </strong><span className=" px-3">{data?.city}</span></h1>
                            <button onClick={()=>handelRequest(data._id)}  style={{height:'30px'}} className=" btn-p">Request</button>
                            
                        </div>)
                    }
                </div>:
                <Loading></Loading>
               }
                 
                 </ReactModal>
        </div>
    );
};

export default BloodCard;
BloodCard.propTypes = {
    group: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    handleBloodCardClick: PropTypes.func.isRequired,
};

