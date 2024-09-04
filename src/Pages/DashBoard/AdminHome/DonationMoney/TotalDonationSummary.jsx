import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../CustomHocks/useAxiosSecure";
import useUser from "../../../../CustomHocks/useUser";
import { Cell, Pie, PieChart } from "recharts";
import { Tooltip } from "react-tooltip";

const TotalDonationSummary = () => {
    const { user } = useUser();
    const AxiosSecure = useAxios();

    const { data } = useQuery({
        queryKey: ['userDonationSummary', user?.email],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/moneyDonation/totalDonationSummary`);
            return res.data;
        }
    });

    const oneTimeDonation = parseInt(data?.oneTimeDonation || 0);
    const monthlyDonation = parseInt(data?.monthlyDonation || 0);
    const oneTimeDonor = parseInt(data?.oneTimeDonor || 0);
    const monthlyDonor = parseInt(data?.monthlyDonor || 0);

    const DonationChartData = [
        { name: 'Monthly Donation', value: monthlyDonation },
        { name: 'One-Time Donation', value: oneTimeDonation },
    ];

    const DonorChartData = [
        { name: 'Monthly Donor', value: monthlyDonor },
        { name: 'One Time Donor', value: oneTimeDonor },
    ];

    const Donation_COLORS = ['#0b7127', '#00C49F'];
    const Donor_COLORS = ['#0b7127', '#00C49F'];

    const totalAmount = DonationChartData.reduce((acc, item) => acc + item.value, 0);
    const totalDonor = DonorChartData.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className=' p-4 my-5 rounded-sm shadow-xl space-y-4'>
            {/* Donor summary */}
            <div className="bg-gray-500 bg-opacity-10 grid gap-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
                <div className="mt-0 p-3 pb-0 bg-opacity-10">
                    <div className="relative flex justify-center items-center mx-auto w-52 h-52 rounded-lg">
                        <div className="relative flex justify-center items-center w-10/12 h-5/6 m-auto border-4 border-color-p rounded-full">
                            <div className="absolute top-4 flex justify-center text-center items-center">
                                <span className="font-bold text-2xl">Total</span>
                            </div>
                            <div className="absolute bottom-4 flex justify-center items-center w-full">
                                <span className="font-bold text-xl">Donor</span>
                            </div>
                        </div>
                        <div className="absolute top-[42%] flex flex-col justify-center items-center bg-color-p text-white w-full h-10 rounded-full z-10">
                            <span className="font-semibold text-2xl">{totalDonor}</span>
                        </div>
                    </div>
                </div>
                <div className='flex lg:flex-row md:flex-row flex-col justify-between items-center '>
                    <div className='flex flex-col justify-center p-4'>
                        <h3 className='text-xl font-semibold mb-2'>Donor Summary</h3>
                        <ul className='list-disc pl-5'>
                            {DonorChartData.map((entry, index) => (
                                <li key={`item-${index}`} className='mb-2'>
                                    <span className='font-semibold text-lg' style={{ color: Donor_COLORS[index % Donor_COLORS.length] }}>
                                        {entry.name}:
                                    </span> {entry.value} ({((entry.value / totalDonor) * 100).toFixed(2)}%)
                                </li>
                            ))}
                        </ul>
                    </div>
                    <PieChart width={250} height={250}>
                        <Pie
                            data={DonorChartData}
                            cx={125}
                            cy={125}
                            innerRadius={50}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {DonorChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={Donor_COLORS[index % Donor_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
            </div>

            {/* Donation summary */}
            <div className="bg-gray-500 bg-opacity-10 grid gap-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 ">
                <div className="mt-0 p-3 pb-0 bg-opacity-10">
                    <div className="relative flex justify-center items-center mx-auto w-52 h-52 rounded-lg">
                        <div className="relative flex justify-center items-center w-10/12 h-5/6 m-auto border-4 border-color-p rounded-full">
                            <div className="absolute top-4 flex justify-center text-center items-center">
                                <span className="font-bold text-2xl">Total</span>
                            </div>
                            <div className="absolute bottom-4 flex justify-center items-center w-full">
                                <span className="font-bold text-xl">Donations</span>
                            </div>
                        </div>
                        <div className="absolute top-[42%] flex flex-col justify-center items-center bg-color-p text-white w-full h-10 rounded-full z-10">
                            <span className="font-semibold text-2xl">{totalAmount} TK</span>
                        </div>
                    </div>
                </div>
                <div className='flex lg:flex-row md:flex-row flex-col justify-between items-center'>
                    <div className='flex flex-col justify-center p-4'>
                        <h3 className='text-xl font-semibold mb-2'>Donation Summary</h3>
                        <ul className='list-disc pl-5'>
                            {DonationChartData.map((entry, index) => (
                                <li key={`item-${index}`} className='mb-2'>
                                    <span className='font-semibold text-lg' style={{ color: Donation_COLORS[index % Donation_COLORS.length] }}>
                                        {entry.name}:
                                    </span> {entry.value} ({((entry.value / totalAmount) * 100).toFixed(2)}%)
                                </li>
                            ))}
                        </ul>
                    </div>
                    <PieChart width={250} height={250}>
                        <Pie
                            data={DonationChartData}
                            cx={125}
                            cy={125}
                            innerRadius={50}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {DonationChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={Donation_COLORS[index % Donation_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default TotalDonationSummary;
