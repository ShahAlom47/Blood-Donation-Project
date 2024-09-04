import { useQuery } from '@tanstack/react-query';
import { ResponsiveTable } from 'responsive-table-react';
import useUser from '../../../../CustomHocks/useUser';
import useAxios from '../../../../CustomHocks/useAxiosSecure';
import Loading from '../../../../SharedComponent/Loading';
import ErrorPage from '../../../ErrorPage/ErrorPage';
import { useState } from 'react';
import DataNotAvailable from '../../../../SharedComponent/DataNotAvailable';

const AllMoneyDonationHistory = () => {
    const { user } = useUser();
    const AxiosSecure = useAxios();
    const [page, setPage] = useState(1);
    const limit = 5;

    const { data, error, isLoading } = useQuery({
        queryKey: ['allMoneyDonationHistory', user?.email, page],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/moneyDonation/allMoneyDonationHistory?page=${page}&limit=${limit}`);
            return res.data;
        },
        keepPreviousData: true, 
    });

    console.log("data", data, data?.data?.totalPages<page);

    const columns = [
        { 'text': 'Donor Name', 'id': 'donorName' },
        { 'text': 'Donor Email', 'id': 'donorEmail' },
        { 'text': 'Donation Date', 'id': 'donationDate' },
        { 'text': 'Amount', 'id': 'amount' },
        { 'text': 'Donation Type', 'id': 'donationType' },
        { 'text': 'Donation Month', 'id': 'donationMonth' },
        { 'text': 'Payment Type', 'id': 'paymentType' },
    ];

    const tableData = data?.data ? data.data.map(donation => ({
        donorName: donation.donorName,
        donorEmail: donation.donorEmail,
        donationDate: donation.donationType === 'oneTimeDonation'
            ? `${donation.date.split('/')[2]}-${donation.date.split('/')[0]}-${donation.date.split('/')[1]}`
            : donation.date,
        amount: donation.amount,
        donationType: donation.donationType,
        donationMonth: donation.donationMonth ? donation.donationMonth : 'One Time',
        paymentType: donation.paymentType,
    })) : [];

    if (isLoading) return <Loading />;
    if (error) return <ErrorPage />;

    return (
        <div className='my-5 bg-gray-400 bg-opacity-10 rounded-sm shadow-xl overflow-x-auto'>
            {
                data?.data?.length===0?<DataNotAvailable/> :
                <ResponsiveTable
                columns={columns}
                data={tableData}
                cellClassName="px-6 py-8 whitespace-nowrap text-sm text-gray-500"
                className="min-w-full"
                ClassName="px-6 py-6 text-left text-xs font-medium uppercase tracking-wider"
            />
            }
            <div className="flex items-end justify-center h-full lg:p-5 md:p-4 p-1">
                <button
                    onClick={() => page>0> setPage(page - 1)}
                    style={{ borderRadius: '0px 100%' }}
                    className={`btn btn-p ${page === 1?'':''}`}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <button
                    onClick={() => data?.totalPages> data?.currentPage && setPage(page + 1)}
                    style={{ borderRadius: '100% 0px' }}
                    className="btn btn-p "
                    disabled={data?.currentPage=== data?.totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllMoneyDonationHistory;
