import { FaUserPlus } from "react-icons/fa6";
import { TbDropletPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import AddBloodModal from "./AddBloodModal";
import { useState } from "react";

const AddBlood = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
      <div id="addBloodContainer">
          <div className=" flex gap-4 justify-center">
            <button 
            onClick={()=>openModal()}
             className="btn-p flex items-center justify-center gap-2"  
             style={{width:'150px'}}
             > 
             <TbDropletPlus className="text-2xl" /> 
             Add Blood
             </button>
           <Link to={'/donateBlood'}> <button 
             className="btn-p flex items-center justify-center gap-2"  
             style={{width:'150px'}}
             > 
             <FaUserPlus className="text-2xl" /> 
             Add Donor
             </button></Link>

        </div>

        {/* modal */}
        <AddBloodModal modalIsOpen={modalIsOpen} closeModal={closeModal} />

      </div>
    );
};

export default AddBlood;