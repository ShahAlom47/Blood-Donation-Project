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
    const { changeUserRole,handelUserDelete } = useFunctions()
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

    console.log(data?.totalPages);
    const options = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
        { value: 'rescinded', label: 'Rescinded' }
    ];

    const columns = [
        { 'text': 'User Name', 'id': 'userName' },
        { 'text': 'User Email', 'id': 'userEmail' },
        { 'text': 'User Mobile', 'id': 'userPhone' },
        { 'text': 'Monthly Donation', 'id': 'monthlyDonation' },
        { 'text': 'Donation Amount', 'id': 'donationAmount' },
        { 'text': 'User Role', 'id': 'userRole' },
        { 'text': 'Delete', 'id': 'delete' },

    ];

    const tableData = data?.data ? data.data.map(userData => ({
        userName: userData.name,
        userEmail: userData.email,
        userPhone: userData.phoneNumber,

        monthlyDonation: userData.monthlyDonation ? (<p className="uppercase font-bold">{userData.monthlyDonation}</p>) : 'NO',
        donationAmount: userData.donationAmount ? userData.donationAmount : '0',
        userRole: (
            <Select
                className={`min-w-full font-semibold ${userData?.email === user.email ? "cursor-not-allowed" : " cursor-pointer"}`}
                isDisabled={userData?.email === user.email}
                options={options}
                defaultValue={options.find(option => option.value === userData.role)}
                onChange={(selectedOption) => changeUserRole(selectedOption.value, userData.email, userData.name, refetch)}
            />
        ),
        delete:(<button
             className={`btn btn-sm btn-error rounded-sm ${userData?.email === user.email ? "cursor-not-allowed opacity-50" : ""}`}
             onClick={()=>handelUserDelete(userData.email)}
             >Delete</button>)
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
                        className={`min-w-full `}
                        ClassName="px-6 py-6 text-left text-xs font-medium uppercase tracking-wider"
                    />
            }
            <PaginationButton totalPages={data?.totalPages} setPage={setPage} page={page}></PaginationButton>
        </div>
    );
};

export default AllUserManage;