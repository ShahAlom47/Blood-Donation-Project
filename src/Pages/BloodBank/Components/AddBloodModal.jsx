
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import useAxios from '../../../CustomHocks/useAxiosSecure';
import Swal from 'sweetalert2';
import useUser from '../../../CustomHocks/useUser';



const AddBloodModal = ({ modalIsOpen, closeModal }) => {
    const {user}=useUser()
    const { register, handleSubmit, reset  } = useForm({
        defaultValues: {
            
            phone: user?.phoneNumber,
            email: user?.email,
           
        }
    });

    const AxiosSecure=useAxios()

    const onSubmit =async (data) => {
        const bloodData={
            email: data?.email,
            phoneNumber: data?.phone,
            bloodGroup: data?.bloodGroup,
            size:data?.size ,
            DateOfAdd:  new Date().toLocaleString(),
            type:'blood',
            status:'Available'
        }
      
        try {
            const res = await AxiosSecure.post('/bloodBank/addBloodDonor', bloodData);
            if (res.data.insertedId) {
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you for your donation!",
                    text: "Your generous contribution has been successfully recorded. Together, we can save lives!",
                    showConfirmButton: false,
                    timer: 3000
                });
                setTimeout(() => {
                   closeModal()
                }, 1500);
            }
            console.log(res.data);
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Submission Failed",
                showConfirmButton: true
            });
            console.error(error);
        }



     
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