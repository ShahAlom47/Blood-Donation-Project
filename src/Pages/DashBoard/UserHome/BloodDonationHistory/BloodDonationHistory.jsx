import { useState } from "react";
import useAxios from "../../../../CustomHocks/useAxiosSecure";
import useUser from "../../../../CustomHocks/useUser";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../../ErrorPage/ErrorPage";
import Loading from "../../../../SharedComponent/Loading";
import DataNotAvailable from "../../../../SharedComponent/DataNotAvailable";
import { ResponsiveTable } from "responsive-table-react";
import PaginationButton from "../../../../SharedComponent/PaginationButton";


const BloodDonationHistory = () => {
    const { user } = useUser();
    const AxiosSecure = useAxios();
    const [page, setPage] = useState(1);
    const limit = 5;

    const { data, error, isLoading,  } = useQuery({
        queryKey: ['allUserDonation', user?.email, page],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/donation/bloodDonationHistory/${user?.email}?page=${page}&limit=${limit}`);
            return res.data;
        },
        keepPreviousData: true,
    });

  console.log(data);

    const columns = [
       
        { 'text': 'Recipient`s Email', 'id': 'userEmail' },
        { 'text': 'Recipient`s Phone', 'id': 'userPhone' },
        { 'text': 'Blood Group', 'id': 'bloodGroup' },
       

    ];

    const tableData = data?.data ? data.data.map(userData => {
        const completedRequester = userData.requester?.find(req => req.status === 'completed');
    
        return {
          
            userEmail: completedRequester ? completedRequester.requesterEmail : userData.email,
            userPhone: completedRequester ? completedRequester.requesterPhone : userData.phone,
            bloodGroup:userData.bloodGroup,
        };
    }) : [];
    


    if (isLoading) return <Loading />;
    if (error) return <ErrorPage />;

    return (
        <div>
            {
                data?.data?.length === 0 ? <DataNotAvailable /> :
                    <ResponsiveTable
                        columns={columns}
                        data={tableData}
                        cellClassName="px-6 py-8 whitespace-nowrap text-sm text-gray-500"
                        className={`min-w-full `}
                        ClassName="px-6 py-6 text-left text-xs font-medium uppercase tracking-wider"
                    />
            }
            <PaginationButton totalPages={data?.totalPages} setPage={setPage} page={page}></PaginationButton>
        </div>
    );
};

export default BloodDonationHistory;