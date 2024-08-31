
import { useQuery } from '@tanstack/react-query';
import { ResponsiveTable } from 'responsive-table-react';
import useAxios from '../../../../CustomHocks/useAxiosSecure';
import useUser from '../../../../CustomHocks/useUser';
import Loading from '../../../../SharedComponent/Loading';
import ErrorPage from '../../../ErrorPage/ErrorPage';

const DonationHistoryTable = () => {
    const { user } = useUser();
    const AxiosSecure = useAxios();

    const { data, error, isLoading } = useQuery({
        queryKey: ['userAllDonationHistory', user?.email],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/moneyDonation/userDonationHistory/${user?.email}`);
            return res.data;
        },
        onError: (err) => {
            console.error("Error fetching donation history:", err);
        },
        onSuccess: (data) => {
            console.log("Donation history fetched successfully:", data);
        }
    });
    console.log("data", data);


    const columns = [
        { 'text': 'Donation Date', 'id': 'donationDate' },
        { 'text': 'Amount', 'id': 'amount' },
        { 'text': 'Donation Type', 'id': 'donationType' },
        { 'text': 'Donation Month', 'id': 'donationMonth' },
        { 'text': 'Payment Type', 'id': 'paymentType' },

    ];


    const tableData = data ? data?.map(donation => ({
        donationDate:donation.donationType==='oneTimeDonation'?`${donation.date.split('/')[2]}-${donation.date.split('/')[0]}-${donation.date.split('/')[1]}` :donation.date,
        amount: donation.amount,
        donationType: donation.donationType,
        donationMonth: donation.donationMonth ? donation.donationMonth : 'One Time',
        paymentType: donation.paymentType,
    })) : [];

    if (isLoading) <Loading></Loading>;
    if (error) <ErrorPage></ErrorPage>
    return (
        <div className='my-5 bg-gray-400 bg-opacity-10  rounded-sm shadow-xl overflow-x-auto '>
            <ResponsiveTable
                columns={columns}
                data={tableData}
                cellClassName="px-6 py-8 whitespace-nowrap text-sm text-gray-500"

                className="min-w-full "

                ClassName=" px-6 py-6 text-left text-xs font-medium  uppercase tracking-wider"
            />
        </div>
    );
};

export default DonationHistoryTable;