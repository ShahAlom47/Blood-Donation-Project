import { useQuery } from "@tanstack/react-query";
import { IoMdHeart } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import useAxiosPublic from "../../../../CustomHocks/useAxiosPublic";
import Loading from "../../../../SharedComponent/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestList = () => {
    const axiosPublic = useAxiosPublic();
    const [page, setPage] = useState(1);
    const navigate =useNavigate()

    const { data, isLoading } = useQuery({
        queryKey: ['bloodRequestList', page],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donation/getBloodRequest?page=${page}&limit=8`);
            return res.data;
        }
    });

    const handelRequest = (id) => {
        navigate(`/bloodRequest/Details/${id}`)
    };

    const handelPrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handelNext = () => {
        if (page < data.totalPages) setPage(page + 1);
    };

    return (
        <div className="flex flex-col justify-between h-full">
            <h1 className=" text-xl font-bold m-5">Current Blood Request</h1>

            <div className="lg:p-5 md:p-4  p-1  h-full">
                {isLoading ? <Loading /> :
                    data?.data?.map((data, index) => (
                        <div key={index + 1}>
                            <div
                                onClick={() => handelRequest(data._id)}
                                data-tooltip-id="my-tooltip" data-tooltip-content="View Details"
                                className="lg:text-lg md:text-lg text-sm cursor-pointer flex justify-between items-center lg:gap-4 md:gap-3 gap-1 font-semibold p-3 py-2 border-b-2 hover:border-color-p hover:bg-slate-200 transition-colors duration-600">
                                <IoMdHeart className="text-red-600" />
                                <span>{data.bloodGroup}</span>
                                <span>
                                    {data.address.length > 8 ? `${data.address.substring(0, 8)}...` : data.address}
                                </span>
                                <span>({data.requireDate})</span>
                                <span className={`text-right ${data.status === 'In Progress' ? 'text-color-p' : ''}`}>{data.status}</span>
                            </div>
                        </div>
                    ))
                }
                <Tooltip id="my-tooltip" />
            </div>

            <div className="flex items-end justify-center h-full lg:p-5 md:p-4  p-1">
                <button onClick={handelPrev} style={{ borderRadius: '0px 100%' }} className="btn btn-p rounded-r-full" disabled={page === 1}>Prev</button>
                <button onClick={handelNext} style={{ borderRadius: ' 100% 0px' }} className="btn btn-p rounded-r-full" disabled={page === data?.totalPages}>Next</button>
            </div>
        </div>
    );
};

export default RequestList;
