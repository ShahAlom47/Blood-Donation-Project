import { useQuery } from "@tanstack/react-query";
import useUser from "../../../../CustomHocks/useUser";
import useAxios from "../../../../CustomHocks/useAxiosSecure";
import Loading from "../../../../SharedComponent/Loading";
import ErrorPage from "../../../ErrorPage/ErrorPage";
import { ResponsiveTable } from "responsive-table-react";
import useUserHomeFunction from "../useUserHomeFunction";
import DataNotAvailable from "../../../../SharedComponent/DataNotAvailable";


const MyBloodBankRequest = () => {
    const { user } = useUser()
    const AxiosSecure = useAxios()
    const { cancelMyBloodBankRequest, completeDonation } = useUserHomeFunction()

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['userAllBloodBankRequest', user?.email],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/bloodBank/user/allBloodBankRequest/${user.email}`);
            return res.data;
        }
    });

    console.log(data);

    const pending = (
        <span className="bg-yellow-400 font-medium rounded-sm px-2 w-full block">Pending</span>
    )
    const notAvailable = (
        <span className="bg-red-400 font-medium rounded-sm px-2 w-full block">Not available Now</span>
    )
   

    const columns = [

        { 'text': 'Phone', 'id': 'phone' },
        { 'text': 'Email', 'id': 'email' },
        { 'text': 'Group', 'id': 'bloodGroup' },
        { 'text': 'Blood Type', 'id': 'bloodType' },
        { 'text': 'Status', 'id': 'status' },
        { 'text': 'Action', 'id': 'action' },
        { 'text': 'Delete', 'id': 'delete' }
    ];
    const tableData = data ? data.map(request => ({
        phone: (
            <p>
                {request?.status === 'Accepted' && request?.requester?.some(req => req.requesterEmail === user.email && req.status === 'selected') 
                    ?<p className="font-semibold border px-1 border-green-500">{ request?.phoneNumber }</p>
                    : request?.requester?.some(req => req.status === 'selected') 
                        ? notAvailable
                        : pending}
            </p>
        ),
        email: (
            <p>
                {request?.status === 'Accepted' && request?.requester?.some(req => req.requesterEmail === user.email && req.status === 'selected') 
                    ? <p className="font-semibold border px-1 border-green-500">{ request?.email }</p>
                    : request?.requester?.some(req => req.status === 'selected') 
                        ? notAvailable 
                        : pending}
            </p>
        ),
        bloodGroup: (<p className=" font-bold">{request?.bloodGroup}</p>),
        bloodType: request?.type,
        status: request?.status === 'Requested' 
            ? pending 
            : <div className="bg-green-500 px-2 inline-block w-full ">
                {request?.requester?.some(req => req.requesterEmail === user.email && req.status === 'selected') 
                    ? 'Selected' 
                    : request?.status}
            </div>,
        action: (
            <button
                disabled={request?.status === 'Accepted' && request?.requester?.some(req => req.requesterEmail === user.email && req.status === 'selected') 
                    ? false 
                    : true}
                style={{ backgroundColor: 'green', height: '30px' }}
                className={`btn-p ${request?.status === 'Accepted' && request?.requester?.some(req => req.requesterEmail === user.email && req.status === 'selected') 
                    ? '' 
                    : 'opacity-50 cursor-not-allowed'}`}
                onClick={() => completeDonation(request, refetch)}
            >
                Complete
            </button>
        ),
        delete: (
            <button
                style={{ backgroundColor: 'red', height: '30px' }}
                className=" btn-p"
                onClick={() => cancelMyBloodBankRequest(request._id, refetch)}
            >
                Cancel
            </button>
        ),
    })) : [];
    

    console.log(data?.length);

    if (isLoading) return <div><Loading /></div>;
    if (error) return <div><ErrorPage /></div>;
    return (
        <div>
            <div>
                <h1 className="text-xl font-semibold ml-2 mb-4">Blood Bank Request</h1>
            </div>
            <div className="overflow-hidden">
                {data?.length > 0 ?
                    <ResponsiveTable
                        columns={columns}
                        data={tableData}
                        className="min-w-full divide-y divide-gray-200"
                        cellClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        ClassName="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    /> : <DataNotAvailable></DataNotAvailable>
                }
            </div>

            <div className="bg-gray-100 border border-color-p  rounded-md p-4 mt-10">
                <h3 className="text-lg font-semibold mb-2">How the Blood Bank Request Table Works:</h3>
                <p className="text-gray-700 mb-2">
                    This table shows the requests made by users for blood donation. When a user requests blood, their request is sent to the admin for review. Multiple users can request the same type of blood. Here’s how the status works:
                </p>
                <ul className="list-disc list-inside mb-2">
                    <li><strong>Pending:</strong> If the admin has not accepted anyone’s request yet, the status will show as `Pending`</li>
                    <li><strong>Accepted:</strong> If the admin has accepted someone else`s request for the same blood type, your request will show as `Accepted`</li>
                    <li><strong>Selected:</strong> If the admin selects you for the blood request, Donor phone number and email will be displayed, and the status will show as `Selected`</li>
                </ul>
                <p className="text-gray-700 mb-2">
                    After receiving the blood, you need to click the <strong>`Complete`</strong> button to confirm that you have received the blood. Only after doing this will it count in the donor`s profile that they have donated. If you want to cancel your request, you can use the <strong>`Cancel`</strong> button.
                </p>
            </div>
        </div>
    );
};

export default MyBloodBankRequest;