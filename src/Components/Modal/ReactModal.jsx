
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa'; // cancel button icon


    // const [openModal,setOpenModal]=useState(false)  

const ReactModal = ({ setOpenModal, openModal, children, label }) => {
 
    return (
        <Modal
            isOpen={openModal}
            onRequestClose={openModal}
            contentLabel={label}
            style={customStyles}
            shouldCloseOnOverlayClick={true} 
        >
            <div style={headerStyles}>
                <button onClick={()=>setOpenModal(false)} style={closeButtonStyles}>
                    <FaTimes />
                </button>
            </div>
            {children}
        </Modal>
    );
};


ReactModal.propTypes = {
    setOpenModal: PropTypes.func.isRequired,
    children: PropTypes.node, 
    label: PropTypes.string.isRequired ,
    openModal:PropTypes.func,
};

export default ReactModal;

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
        overflow: 'auto',
        position: 'relative'
    }
};

const headerStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
};

const closeButtonStyles = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0',
    margin: '0'
};
