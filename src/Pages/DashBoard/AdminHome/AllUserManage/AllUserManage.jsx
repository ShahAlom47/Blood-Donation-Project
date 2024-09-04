import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../SharedComponent/Loading";
import ErrorPage from "../../../ErrorPage/ErrorPage";
import { useState } from "react";
import useUser from "../../../../CustomHocks/useUser";
import useAxios from "../../../../CustomHocks/useAxiosSecure";
import PaginationButton from "../../../../SharedComponent/PaginationButton";
import DataNotAvailable from "../../../../SharedComponent/DataNotAvailable";
import { ResponsiveTable } from "responsive-table-react";
import useFunctions from "../useFunctions";
import Select from 'react-select';


const AllUserManage = () => {
    const { user } = useUser();
    const AxiosSecure = useAxios();
    const { changeUserRole } = useFunctions()
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['allUser', user?.email, page],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/user/allUser?page=${page}&limit=${limit}`);
            return res.data;
        },
        keepPreviousData: true,
    });

 
    const options = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' }
    ];

    const columns = [
        { 'text': 'User Name', 'id': 'userName' },
        { 'text': 'User Email', 'id': 'userEmail' },
        { 'text': 'User Mobile', 'id': 'userPhone' },
        { 'text': 'Monthly Donation', 'id': 'monthlyDonation' },
        { 'text': 'Donation Amount', 'id': 'donationAmount' },
        { 'text': 'User Role', 'id': 'userRole' },

    ];

    const tableData = data?.data ? data.data.map(user => ({
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phoneNumber,

        monthlyDonation: user.monthlyDonation ? (<p className="uppercase font-bold">{user.monthlyDonation}</p>) : 'NO',
        donationAmount: user.donationAmount ? user.donationAmount : '0',
        userRole: (<Select
            options={options}
            defaultValue={options.find(option => option.value === user.role)}
            onChange={(selectedOption) => changeUserRole(selectedOption.value,user.email,refetch)}
        />),
    })) : [];

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
                        className="min-w-full"
                        ClassName="px-6 py-6 text-left text-xs font-medium uppercase tracking-wider"
                    />
            }
            <PaginationButton totalPages={5} setPage={setPage} page={page}></PaginationButton>
        </div>
    );
};

export default AllUserManage;