import { useQuery } from '@tanstack/react-query';

import { ResponsiveTable } from 'responsive-table-react';
import { useState } from 'react';

import Swal from 'sweetalert2';
import useAxios from '../../../../CustomHocks/useAxiosSecure';
import Loading from '../../../../SharedComponent/Loading';
import ErrorPage from '../../../ErrorPage/ErrorPage';
import { MdDeleteForever } from 'react-icons/md';

const AllBloodBank = () => {
    const AxiosSecure = useAxios();

    const [page, setPage] = useState(1);


    const handelPrev = () => {
        refetch()
        if (page > 1) setPage(page - 1);
       
    };

    const handelNext = () => {

        if (page < data.totalPages) setPage(page + 1);
        refetch()
    };

  console.log(page);


    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['allBloodBankData'],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/bloodBank/admin/allBloodBankData?page=${page}&limit=8`);
            return res?.data;
        }
    });

console.log(data);

    const handelAction = async (requestId, name, email) => {
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
            confirmButtonText: "Yes, delete it-----!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await AxiosSecure.delete(`/bloodBank/admin/delete-blood-bank-data/${id}`)
                console.log(res);
                if (res?.data?.deletedCount > 0) {
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
        { 'text': 'Action', 'id': 'action' },

        { 'text': 'Reject', 'id': 'reject' },
        { 'text': 'Delete', 'id': 'delete' }
    ];


    const tableData = data ? data?.data?.map(request => ({

        phone: request.phoneNumber,
        email: request.email,
        bloodGroup: request.bloodGroup,
        status: request.status,


        action: (
            <button
            disabled={request.status==='Requested'?false:true}
                style={{ height: '26px', backgroundColor: 'green' }}
                className={`btn-p text-white rounded ${request.status !== 'Requested' ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                    handelAction(request._id,'Accepted')
                }}
            >
                Accept
            </button>
        ),
        reject: (
            <button
                className="  font-bold bg-color-p text-white hover:bg-red-700 px-2 rounded-sm "
                onClick={() => {
                    handelAction(request._id,'Rejected')
                }}
            >
                Reject
            </button>
        ),
        delete: (
            <button
                className=" p-2 font-bold bg-red-600 text-white hover:bg-red-700 px-2 rounded-sm "
                onClick={() => {
                    handelDelete(request._id)
                }}
            >
                <MdDeleteForever/>
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

export default AllBloodBank;

