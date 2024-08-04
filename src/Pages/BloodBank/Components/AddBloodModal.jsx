
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';



const AddBloodModal = ({ modalIsOpen, closeModal }) => {
    const { register, handleSubmit,  } = useForm();

    const onSubmit = (data) => {
        const bloodData={
            email: data?.email,
            phoneNumber: data?.phone,
            bloodGroup: data?.bloodGroup,
            size:data?.size ,
            DateOfAdd:  new Date().toLocaleString(),
            type:'blood',
            status:'Available'
        }
        console.log(bloodData);



     
        // closeModal();
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Add Blood Modal"
            style={customStyles}
        >
            <h2 className="text-2xl font-bold mb-4">Add Blood</h2>
            <form onSubmit={handleSubmit(onSubmit)} className=' space-y-3'>
                <input placeholder="Your Phone " type="number" className="bg-gray-100 rounded-sm py-2 px-4 w-full outline-none" {...register("phone")} required />
                <input placeholder="Your Email" type="email" className="bg-gray-100 rounded-sm py-2 px-4 w-full outline-none" {...register("email")} required />
                <input placeholder="Size" type="number" className="bg-gray-100 rounded-sm py-2 px-4 w-full outline-none" {...register("size")} required />
                <select className="bg-gray-100 rounded-sm py-2 px-4 w-full outline-none" {...register("bloodGroup")} required defaultValue="">
                    <option value="" disabled>Select Blood Group</option>
                    <option value="A+" className="font-bold">A(+)</option>
                    <option value="A-" className="font-bold">A(-)</option>
                    <option value="B+" className="font-bold">B(+)</option>
                    <option value="B-" className="font-bold">B(-)</option>
                    <option value="AB+" className="font-bold">AB(+)</option>
                    <option value="AB-" className="font-bold">AB(-)</option>
                    <option value="O+" className="font-bold">O(+)</option>
                    <option value="O-" className="font-bold">O(-)</option>
                </select>
                <div className="flex items-center justify-end gap-4">
                    <button className="btn-p" type="submit">
                        Save
                    </button>
                    <button className="btn-p" type="button" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddBloodModal;

AddBloodModal.propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};

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
        width: '90%',
        maxWidth: '90%',
        minWidth: '80%',
        height: 'auto',
        maxHeight: '90vh',
        overflow: 'auto'
    }
};