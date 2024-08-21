import { FaDroplet } from "react-icons/fa6";
import PropTypes from 'prop-types';
import useAxios from "../../../CustomHocks/useAxiosSecure";
import { useState } from "react";
import ReactModal from "../../../Components/Modal/ReactModal";
import Loading from "../../../SharedComponent/Loading";
import { MdWaterDrop } from "react-icons/md";
import { RiUserHeartFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../../CustomHocks/useUser";
import Swal from "sweetalert2";
import useSound from "../../../CustomHocks/useSound";

const BloodCard = ({ data, group }) => {
    const { user } = useUser()
    const AxiosSecure = useAxios();
    const [bloodGroupData, setBloodGroupData] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const { playSound } = useSound()

    const handleBloodCard = async (group) => {
        playSound('click')
       
        if (!user) {
            playSound('error')
            Swal.fire('Please Login First')
            setTimeout(() => {
                navigate('/login', { state: { from: location.pathname } });
            }, 1300);

            return
        }
        if (!group) {
            playSound('error')
            Swal.fire('Empty')
            return
        }
        const res = await AxiosSecure.get(`/bloodBank/blood-groupData/${group}`)
        setBloodGroupData(res.data)
        setOpenModal(true)
    };

console.log(bloodGroupData);

    const handelRequest = async (data) => {
        playSound('click')
        const notificationData = {
            requesterEmail: user?.email,
            requesterPhone: user?.phoneNumber,
            donorEmail: data?.email,
            message: ' New blood donation data received from the Blood Bank',
            type: 'blood_bank_blood_request',
            status: 'unread',
            timestamp: new Date().toLocaleString(),

        }
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, "
        }).then(async (result) => {
            if (result.isConfirmed) {
        const res = await AxiosSecure.patch(`/bloodBank/blood-bank-updateState/${data?._id}`, { status: 'Requested', notificationData })
     
        if (res.data?.message === 'Requester Exist') {
            playSound('error')
            Swal.fire('Request Failed', 'You have already made a data with this email.');
            return
        }
        else if (res?.data?.status === true) {
            Swal.fire('Request Completed', 'Please wait for admin approval.', 'success');
            handleBloodCard(data.bloodGroup)
            setOpenModal(false)
            playSound('success')
        }
    }})

    }
    const pending = (
        <span className="text-red-500 font-medium rounded-sm px-2 ">Request First</span>
    )

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
                    bloodGroupData ? <div className=" grid gap-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
                        {
                            bloodGroupData.map((data, index) => <div className=" mb-4 bg-gray-00 w-full shadow-lg p-3 space-y-2" key={index}>
                                <p> {data?.status === 'Accepted' && data?.requester?.some(req => req?.requesterEmail === user?.email && req.status === 'selected') ? data?.email : pending} </p>
                                <p> {data?.status === 'Accepted' && data?.requester?.some(req => req?.requesterEmail === user?.email && req.status === 'selected') ? data?.phoneNumber : pending} </p>
                                <h1><strong>BloodGroup: </strong><span className="text-color-p font-bold">{data?.bloodGroup}</span></h1>

                                {
                                    data?.type === 'blood' ?
                                        <h1 className="flex gap-2"> <strong>Type: </strong><span className=" px-3 bg-gray-800 rounded-sm text-white flex items-center gap-2"><MdWaterDrop /> {data?.type}</span></h1> :
                                        <h1 className="flex gap-2"> <strong>Type: </strong><span className=" px-3 bg-gray-800 rounded-sm text-white flex items-center gap-2"><RiUserHeartFill /> {data?.type}</span></h1>

                                }
                                <div className=" flex flex-col">
                                    {
                                        data?.city ?
                                            <h1><strong>Address: </strong><span className=" px-3">{data?.city}</span></h1> :
                                            <h1><strong>Bag Size: </strong><span className=" px-3">{data?.size} ml</span></h1>
                                    }
                                    {
                                        data.status === 'Available' ?
                                            <h1 className="bg-green-500 px-2 rounded-sm inline ">{data?.status}</h1> :
                                            <h1 className="bg-yellow-500 px-2 rounded-sm inline-block ">{data?.status}</h1>
                                    }
                                </div>
                                <button
                                    disabled={data.status === 'Accepted'}
                                    onClick={() => handelRequest(data)}
                                    style={{ height: '30px' }}
                                    className={`btn-p ${data?.status === 'Accepted' ? 'opacity-50  cursor-not-allowed' : ''}`}
                                >Request</button>

                            </div>)
                        }
                    </div> :
                        <Loading></Loading>
                }

            </ReactModal>
        </div>
    );
};

export default BloodCard;
BloodCard.propTypes = {
    group: PropTypes.string.isRequired,
    data: PropTypes.object,
    handleBloodCardClick: PropTypes.func.isRequired,
};

