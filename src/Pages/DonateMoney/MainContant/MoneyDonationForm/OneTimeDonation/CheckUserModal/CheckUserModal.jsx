
import { useLocation, useNavigate } from "react-router-dom";
import ReactModal from "../../../../../../Components/Modal/ReactModal";

import { TbUserOff } from "react-icons/tb";


// eslint-disable-next-line react/prop-types
const CheckUserModal = ({ setOpenModal, openModal,setGuestForm }) => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <ReactModal setOpenModal={setOpenModal} openModal={openModal} label={'onetime donation check user'}>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md  mx-auto">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                    One-Time Donation
                </h2>
                <TbUserOff className=" text-4xl text-color-p mx-auto" />
                <p className="text-center text-gray-600 mb-6">You are not logged in.</p>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => navigate('/login', { state: { from: location.pathname } })}
                        className="w-full bg-blue-500 text-white py-2 rounded-sm hover:bg-blue-600 transition"
                    >
                        Login to Continue
                    </button>
                    <button
                        onClick={()=>{
                            setGuestForm(true)
                            setOpenModal(false)
                        }}
                        className="w-full bg-gray-300 text-gray-800 py-2 rounded-sm hover:bg-gray-400 transition"
                    >
                        Donate as Guest
                    </button>
                </div>
            </div>
        </ReactModal>
    );
};

export default CheckUserModal;