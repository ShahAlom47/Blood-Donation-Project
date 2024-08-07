import { useQuery } from '@tanstack/react-query';

import { ResponsiveTable } from 'responsive-table-react';
import { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineWarning } from "react-icons/ai";
import Swal from 'sweetalert2';
import useAxios from '../../../../CustomHocks/useAxiosSecure';
import Loading from '../../../../SharedComponent/Loading';
import ErrorPage from '../../../ErrorPage/ErrorPage';
import { MdDeleteForever } from 'react-icons/md';

const AllBloodBank = () => {
    const AxiosSecure = useAxios();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState({})
    const [page, setPage] = useState(1);


    const handelPrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handelNext = () => {
        if (page < data.totalPages) setPage(page + 1);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    const { data, isLoading, error,refetch } = useQuery({
        queryKey: ['allBloodBankData'],
        queryFn: async () => {
              const res = await AxiosSecure.get(`/bloodBank/admin/allBloodBankData?page=${page}&limit=8`);
            return res?.data;
        }
    });

console.log('blood bank alll',data);

    const handleComplete = async (requestId, name, email) => {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#ea062b",
            cancelButtonColor: "#000",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const confirmedDonorData = {
                    donorName: name,
                    donorEmail: email,
                };
    
                try {
                    const res = await AxiosSecure.patch(`/donation/user/confirmDonation/${requestId}`, confirmedDonorData);
    
                    if (res.status === 200) {
                        setModalIsOpen(false)
                        refetch()
                        Swal.fire({
                            title: "Completed",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "Something went wrong. Please try again.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: error.response?.data?.message || "An unexpected error occurred. Please try again.",
                        icon: "error"
                    });
                }
            }
        });
    };
    

    if (isLoading) return <div><Loading /></div>;
    if (error) return <div><ErrorPage /></div>;

    const handelDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res= await AxiosSecure.delete(`/donation/delete/bloodRequest/${id}`)
                if(res?.data?.deletedCount>0){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
            }
          });

      
        console.log(id);

    }


    const columns = [
       
        { 'text': 'Donor Email', 'id': 'email' },
        { 'text': 'Phone', 'id': 'phone' },
        { 'text': 'Group', 'id': 'bloodGroup' },
        { 'text': 'Status', 'id': 'status' },
        { 'text': 'Donors', 'id': 'donors' },
        
        { 'text': 'Delete', 'id': 'delete' }
    ];


    const tableData = data ? data?.data?.map(request => ({
      
        phone: request.phoneNumber,
        email: request.email,
        bloodGroup: request.bloodGroup,
        status: request.status,


        donors: (
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => {
                    setModalData(request)
                    setModalIsOpen(true)
                }}
            >
                Donors 
            </button>
        ),
        delete: (
            <button
                className=" text-2xl text-color-p hover:text-3xl "
                onClick={() => {
                    handelDelete(request._id)
                }}
            >
                <MdDeleteForever />
            </button>
        ),
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
            <div className="flex items-end justify-center h-full lg:p-5 md:p-4  p-1">
                <button onClick={handelPrev} style={{ borderRadius: '0px 100%' }} className="btn btn-p rounded-r-full" disabled={page === 1}>Prev</button>
                <button onClick={handelNext} style={{ borderRadius: ' 100% 0px' }} className="btn btn-p rounded-r-full" disabled={page === data?.totalPages}>Next</button>
            </div>
           
        </div>
    );
};

export default AllBloodBank ;

