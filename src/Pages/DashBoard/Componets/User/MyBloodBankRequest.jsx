import { useQuery } from "@tanstack/react-query";
import useUser from "../../../../CustomHocks/useUser";
import useAxios from "../../../../CustomHocks/useAxiosSecure";
import Loading from "../../../../SharedComponent/Loading";
import ErrorPage from "../../../ErrorPage/ErrorPage";
import { ResponsiveTable } from "responsive-table-react";
import useUserHomeFunction from "./useUserHomeFunction";


const MyBloodBankRequest = () => {
    const { user } = useUser()
    const AxiosSecure = useAxios()
    const { cancelMyBloodBankRequest,completeDonation } = useUserHomeFunction()

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['userAllBloodBankRequest'],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/bloodBank/user/allBloodBankRequest/${user.email}`);
            return res.data;
        }
    });
    const pending = (
        <span className="bg-yellow-400 font-medium rounded-sm px-2 ">Pending</span>
    )
    console.log(data);
    const columns = [

        { 'text': 'Phone', 'id': 'phone' },
        { 'text': 'Email', 'id': 'email' },
        { 'text': 'Group', 'id': 'bloodGroup' },
        { 'text': 'Blood Type', 'id': 'bloodType' },
        { 'text': 'Status', 'id': 'status' },
        { 'text': 'Action', 'id': 'action' },
        { 'text': 'Delete', 'id': 'delete' }
    ];
    const tableData = data ? data?.map(request => ({

      
        phone: (<p> {request?.status === 'Accepted' && request?.requester?.some(req => req.requesterEmail === user.email && req.status === 'selected') ? request?.phoneNumber : pending } </p>),
        email: (<p> {request?.status === 'Accepted' && request?.requester?.some(req => req.requesterEmail === user.email && req.status === 'selected') ? request?.email : pending } </p>),
        // email: request?.status === 'Requested' ? pending : request?.email,
        bloodGroup: request?.bloodGroup,
        bloodType: request?.type,
        status: request?.status === 'Requested' ? pending :<div className="bg-green-500 px-2 inline-block ">{ request?.status}</div>,


        action: (
            <button
                disabled={request?.status === 'Accepted' && request?.requester?.some(req => req.requesterEmail === user.email && req.status === 'selected') ? false :  true}
                style={{ backgroundColor: 'green', height: '30px' }}
                className={`btn-p ${request?.status === 'Accepted' && request?.requester?.some(req => req.requesterEmail === user.email && req.status === 'selected') ? '' : 'opacity-50 cursor-not-allowed'}`}

            onClick={() => {
                completeDonation(request,refetch)
            }}
            >
                Complete
            </button>
        ),
        delete: (
            <button
            style={{backgroundColor:'red', height:'30px'}}
                className=" btn-p  "
                onClick={() => {
                    cancelMyBloodBankRequest(request._id,refetch)
                }}
            >
                Cancel
            </button>
        ),
    })) : [];



    if (isLoading) return <div><Loading /></div>;
    if (error) return <div><ErrorPage /></div>;
    return (
        <div>

            <ResponsiveTable
                columns={columns}
                data={tableData}
                className="min-w-full divide-y divide-gray-200"
                cellClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                ClassName="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            />
        </div>
    );
};

export default MyBloodBankRequest;