import { useQuery } from '@tanstack/react-query';
import { ResponsiveTable } from 'responsive-table-react';
import { useState } from 'react';
import useAxios from '../../../../CustomHocks/useAxiosSecure';
import Loading from '../../../../SharedComponent/Loading';
import ErrorPage from '../../../ErrorPage/ErrorPage';
import { MdDeleteForever } from 'react-icons/md';
import ReactModal from '../../../../Components/Modal/ReactModal';
import useFunctions from './useFunctions';

const AllBloodBank = () => {
    const AxiosSecure = useAxios();

    const [page, setPage] = useState(1);
    const [openModal,setOpenModal]=useState(false);
    const [modalData,setModalData]=useState([]);
    const {handelDelete,rejectRequester}=useFunctions()


    const handelPrev = () => {
        refetch()
        if (page > 1) setPage(page - 1);
    };

    const handelNext = () => {
        if (page < data.totalPages) setPage(page + 1);
        refetch()
    };



    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['allBloodBankData'],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/bloodBank/admin/allBloodBankData?page=${page}&limit=8`);
            return res?.data;
        }
    });



    const columns = [

        { 'text': 'requester Email', 'id': 'email' },
        { 'text': 'Phone', 'id': 'phone' },
        { 'text': 'Group', 'id': 'bloodGroup' },
        { 'text': 'Status', 'id': 'status' },
        { 'text': 'Requester', 'id': 'requester' },
        { 'text': 'Delete', 'id': 'delete' }
    ];


    const tableData = data ? data?.data?.map(request => ({

        phone: request.phoneNumber,
        email: request.email,
        bloodGroup: request.bloodGroup,
        status: request.status,


        requester: (
            <button
            disabled={request.status==='Requested'?false:true}
                style={{ height: '26px', backgroundColor: 'green' }}
                className={`btn-p text-white rounded ${request.status !== 'Requested' ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                    setOpenModal(true)
                    setModalData(request||{})
                }}
            >
               {request?.requester?.length>0?request?.requester?.length:0} Requester
            </button>
        ),
      
        delete: (
            <button
                className=" p-2 font-bold bg-red-600 text-white hover:bg-red-700 px-2 rounded-sm "
                onClick={() => {
                    handelDelete(request._id,refetch)
                }}
            >
                <MdDeleteForever/>
            </button>
        ),
    })) : [];


    if (isLoading) return <div><Loading /></div>;
    if (error) return <div><ErrorPage /></div>;

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
            <div className="flex items-end justify-center h-full lg:p-5 md:p-4  p-1">
                <button onClick={handelPrev} style={{ borderRadius: '0px 100%' }} className="btn btn-p rounded-r-full" disabled={page === 1}>Prev</button>
                <button onClick={handelNext} style={{ borderRadius: ' 100% 0px' }} className="btn btn-p rounded-r-full" disabled={page === data?.totalPages}>Next</button>
            </div>

            <ReactModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            label='all blood bank'
            > 
            {
                modalData?.requester?.length>0?
           
                <div>
                {modalData?.requester?.map((requester, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                <h1 className='text-xl font-bold mb-5 border-b-2'>Requester {index + 1}</h1>
                                <h2 className="font-bold mb-1"> Requester Phone: {requester.requesterPhone}</h2>
                                <p className="text-gray-700 mb-2"><span className='font-bold'> Requester Email:</span> {requester.requesterEmail}</p>
                                <button
                                    // disabled={modalData.status !== 'Pending'}
                                    style={{ width: '90px' ,backgroundColor:'green'}}
                                    className={`px-4 py-2 btn-p text-white rounded mr-4 `}
                                    onClick={() => rejectRequester(modalData._id,)}
                                >
                                    Accept
                                </button>
                                <button
                                    // disabled={modalData.status !== 'Pending'}
                                    style={{ width: '90px' }}
                                    className={`px-4 py-2 btn-p text-white rounded `}
                                    onClick={() => rejectRequester(modalData._id,requester.requesterEmail,refetch,setModalData)}
                                >
                                    Reject
                                </button>
                            </div>
                        ))}

                </div>:
                <h1 className=' text-2xl text-center font-bold '>Empty</h1>
                 }
            </ReactModal>
        </div>
    );
};

export default AllBloodBank;

