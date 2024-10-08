
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../../CustomHocks/useUser";
import img from '../../../assets/image/user-fake-profile-img.png'
import { FiEdit } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import Modal from 'react-modal';
import PhotoForm from "./PhotoForm/PhotoForm";
import useUserMonthlyDonationData from "../../../CustomHocks/useUserMonthlyDonationData";
import { BiMessageAltError } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";

const UserProfileLayout = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { latestDonationMonth, isDonationTime } = useUserMonthlyDonationData();


    const handelDonate = () => {
        localStorage.setItem('donationOption', 'monthly')
        navigate('/donateMoney')
    }

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="lg:p-5 md:p-4 py-7">
            <div className="border-b-2 pb-4 px- flex  lg:flex-row md:flex-row flex-col lg:justify-between    lg:items-end md:items-end items-start justify-center gap-5">
                <div className=" flex gap-5 lg:flex-row md:flex-row  lg:justify-start flex-row   items-center justify-center ">
                    <div className="relative">
                        <button
                            onClick={() => setModalIsOpen(true)}
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Edit Photo"
                            className=" absolute bottom-3 right-0 bg-slate-300 border border-black rounded-full p-1"><FaRegEdit /></button>
                        <Tooltip id="my-tooltip" />
                        <div className=" w-28 h-28 ">
                            <img className="w-full h-full rounded-full border-2 border-black" src={user?.photoURL ? user?.photoURL : img} alt="" />
                        </div>
                    </div>

                    <div className="">
                        <h1 className="text-3xl font-bold mb-2">{user.name}  <span className="bg-gray-200 rounded-md text-lg px-2">{user.role}</span></h1>
                        <h2 className=" text-sm"><strong>Blood Group:</strong> <span className=" bg-color- p-1 rounded-full font-semibold text-color-p">{user.bloodGroup}</span></h2>
                        <h2 className=" text-sm"><strong>Last Donate:</strong> <span className="  rounded-full font-medium ">{user.lastDonate ? user.lastDonate : <strong className="text-color-p">Not Yet</strong>}</span></h2>

                    </div>


                </div>
                <div className="flex justify-end gap-3 items-end  lg:w-2/12 md:w-2/12 w-full">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn-p m-1 flex justify-center items-center gap-3"> <CiSettings/> Settings</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-color-p rounded-sm z-[1] w-52 p-2 shadow">
                            <Link to={'/donateBlood/user/editProfile'}><button  className=" btn btn-sm w-full rounded-sm mb-3 flex justify-start gap-3 items-center "><FiEdit /> Edit Profile</button></Link>
                            <Link to={'/donateBlood/user/change-password'}><button  className=" btn btn-sm w-full rounded-sm mb-3 flex justify-start gap-3 items-center "> <FiEdit /> Change Password</button></Link>

                        </ul>
                    </div>

                </div>

            </div>
            <div className=" ">
                {
                    isDonationTime ? <div className="text-color-p flex items-center gap-2 px-1 py-2">
                        <BiMessageAltError />
                        Your last donation was on <strong>{latestDonationMonth}</strong>. It`s time to donate again.
                        <button onClick={handelDonate} className="btn btn-link" >Donate Now</button>
                    </div> : ''
                }

            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <PhotoForm closeModal={closeModal} >  </PhotoForm>
            </Modal>



        </div>
    );
};

export default UserProfileLayout;

// modal style 

const customStyles = {
    overlay: {
        zIndex: '50',
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        maxWidth: '60%',
        minWidth: '50%',
        height: 'auto',
        maxHeight: '90vh',
        overflow: 'auto'
    }
};
