import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../CustomHocks/useAxiosSecure';
import Loading from '../../../../SharedComponent/Loading';
import ErrorPage from '../../../ErrorPage/ErrorPage';
import useUser from '../../../../CustomHocks/useUser';
import { ResponsiveTable } from 'responsive-table-react';
import { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineWarning } from "react-icons/ai";

const MyBloodRequest = () => {
    const AxiosSecure = useAxios();
    const { user } = useUser();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState({})



    const closeModal = () => {
        setModalIsOpen(false);
    };


    const { data, isLoading, error } = useQuery({
        queryKey: ['userAllBloodRequest'],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/donation/user/allRequest/${user.email}`);
            return res.data;
        }
    });


    const handleComplete = (requestId) => {

        console.log('Complete button clicked for request ID:', requestId);

    };

    if (isLoading) return <div><Loading /></div>;
    if (error) return <div><ErrorPage /></div>;



    const columns = [
        { 'text': 'Name', 'id': 'name' },
        { 'text': 'Phone', 'id': 'phone' },
        { 'text': 'Email', 'id': 'email' },
        { 'text': 'Group', 'id': 'bloodGroup' },
        { 'text': 'Requested Date', 'id': 'requestedDate' },
        { 'text': 'Require Date', 'id': 'requireDate' },
        { 'text': 'Status', 'id': 'status' },
        { 'text': 'Donors', 'id': 'donors' }
    ];


    const tableData = data ? data.map(request => ({
        name: request.name,
        phone: request.phone,
        email: request.email,
        bloodGroup: request.bloodGroup,
        requestedDate: request.requestedDate,
        requireDate: request.requireDate,
        status: request.status,
     

        donors: (
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => {
                    setModalData(request)
                    setModalIsOpen(true)
                }}
            >
                Donors <span> ({request.donors.length})</span>
            </button>
        )
    })) : [];



    return (
        <div className="p-4">
            <div className="overflow-x-auto">
                <ResponsiveTable
                    columns={columns}
                    data={tableData}
                    className="min-w-full divide-y divide-gray-200"
                    cellClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    ClassName="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                {modalData?.donors?.length === 0 ? (
                    <h1 className='text-xl font-bold text-center py-6 flex flex-col items-center justify-center gap-4'> <AiOutlineWarning className='text-5xl text-color-p' /><span> Donors Not Available</span> </h1>
                ) : (
                    <div className="space-y-4">
                        {modalData?.donors?.map((donor, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                <h1 className='text-xl font-bold mb-5 border-b-2'>Donor {index + 1}</h1>
                                <h2 className="font-bold mb-1"> Donor Name: {donor.donorName}</h2>
                                <p className="text-gray-700 mb-2"><span className='font-bold'> Donor Email:</span> {donor.donorEmail}</p>
                                <button
                                    disabled={modalData.status !== 'Pending'}
                                    style={{ width: '90px' }}
                                    className={`px-4 py-2 btn-p text-white rounded ${modalData.status !== 'Pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleComplete(modalData._id)}
                                >
                                    Complete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MyBloodRequest;

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
