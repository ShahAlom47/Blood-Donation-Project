import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../CustomHocks/useAxiosSecure';
import Loading from '../../../../SharedComponent/Loading';
import ErrorPage from '../../../ErrorPage/ErrorPage';
import useUser from '../../../../CustomHocks/useUser';
import { ResponsiveTable } from 'responsive-table-react'; // Ensure this package is installed

const MyBloodRequest = () => {
    const AxiosSecure = useAxios();
    const { user } = useUser();

    // Fetch data
    const { data, isLoading, error } = useQuery({
        queryKey: ['userAllBloodRequest'],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/donation/user/allRequest/${user.email}`);
            return res.data;
        }
    });

    // Handle completion of a request
    const handleComplete = (requestId) => {
        // Implement logic to mark the request as complete
        console.log('Complete button clicked for request ID:', requestId);
        // Example: Update the status via API call or local state update
    };

    if (isLoading) return <div><Loading /></div>;
    if (error) return <div><ErrorPage /></div>;


 // Define table columns
 const columns = [
    { 'text': 'Name', 'id': 'name' },
    { 'text': 'Phone', 'id': 'phone' },
    { 'text': 'Email', 'id': 'email' },
    { 'text': 'Address', 'id': 'address' },
    { 'text': 'Blood Group', 'id': 'bloodGroup' },
    { 'text': 'Requested Date', 'id': 'requestedDate' },
    { 'text': 'Require Date', 'id': 'requireDate' },
    { 'text': 'Status', 'id': 'status' },
    { 'text': 'Actions', 'id': 'actions' }
];

    // Map data to fit the table format
    const tableData = data ? data.map(request => ({
        name: request.name,
        phone: request.phone,
        email: request.email,
        address: request.address,
        bloodGroup: request.bloodGroup,
        requestedDate: request.requestedDate,
        requireDate: request.requireDate,
        status: request.status,
        actions: (
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => handleComplete(request._id)}
            >
                Complete
            </button>
        )
    })) : [];

   

    return (
        <div className="p-4">
            <div className="overflow-x-auto">
                <ResponsiveTable
                    columns={columns}
                    data={tableData}  // Pass the mapped data here
                    className="min-w-full divide-y divide-gray-200"
                    cellClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    ClassName="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                />
            </div>
        </div>
    );
};

export default MyBloodRequest;
