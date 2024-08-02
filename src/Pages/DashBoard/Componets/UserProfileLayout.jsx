
import { Link } from "react-router-dom";
import useUser from "../../../CustomHocks/useUser";
import img from '../../../assets/image/user-fake-profile-img.png'
import { FiEdit } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import Modal from 'react-modal';
import PhotoForm from "./PhotoForm/PhotoForm";


const UserProfileLayout = () => {
    const { user } = useUser()
    const [modalIsOpen, setModalIsOpen] = useState(false);



    const closeModal = () => {
        setModalIsOpen(false);
    };


    return (
        <div className="lg:p-5 md:p-4 py-7">
            <div className="border-b-2 pb-4 px- flex  lg:flex-row md:flex-row flex-col lg:justify-between    items-end justify-center gap-5">
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
                        <h2 className=" text-sm"><strong>Last Donate:</strong> <span className="  rounded-full font-medium ">{user.lastDonate}</span></h2>

                    </div>


                </div>
                <div className="flex items-end">

                    <Link to={'/donateBlood/user/editProfile'}><button style={{ width: '130px' }} className="btn-p flex justify-center gap-3 items-center "><FiEdit /> Edit Profile</button></Link>
                </div>

            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <PhotoForm> </PhotoForm>
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
        width: '40%',
        maxWidth: '50%',
        minWidth: '50%',
        height: 'auto',
        maxHeight: '90vh',
        overflow: 'auto'
    }
};
