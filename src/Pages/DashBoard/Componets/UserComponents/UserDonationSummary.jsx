
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Tooltip, Cell,  } from 'recharts';
import useAxios from '../../../../CustomHocks/useAxiosSecure';
import useUser from '../../../../CustomHocks/useUser';

const UserDonationSummary = () => {
    const {user}=useUser();
    const AxiosSecure=useAxios();

    const {data}=useQuery({
        queryKey:'userDonationSummary',
        queryFn: async()=>{
            const res= await AxiosSecure.get(`/moneyDonation/userDonationSummary/${user?.email}`)
            return res.data;
        }
    });

    const oneTimeDonation=parseInt(data?.oneTimeDonation);
    const monthlyDonation=parseInt(data?.monthlyDonation);

    
    const chartData = [
        { name: 'Monthly Donation', value: monthlyDonation },
        { name: 'One-Time Donation', value: oneTimeDonation },
    ];

    const COLORS = ['#0b7127', '#00C49F'];

    // Calculate the total amount for percentage calculation
    const totalAmount = chartData.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 bg-gray-400 bg-opacity-10 p-4 my-5 rounded-sm shadow-xl'>
           
                <div className=" m-3 mt-0 p-3 bg-opacity-10">
                    <div className=" relative flex justify-center items-center mx-auto p-4 w-56 h-56  rounded-lg">
                        <div className="relative flex justify-center items-center w-10/12 h-5/6 m-auto  border-4 border-color-p rounded-full">
                            <div className="absolute top-4 flex justify-center text-center items-center">
                                <span className="font-bold text-2xl ">Total </span>
                            </div>

                            <div className="absolute bottom-4 flex justify-center items-center w-full">
                                <span className="font-bold text-xl ">Donations</span>
                            </div>
                        </div>
                        <div className=" absolute top-[42%] flex flex-col justify-center items-center bg-color-p text-white w-full h-10  rounded-full z-10">
                            <span className="font-semibold text-2xl">{oneTimeDonation+monthlyDonation} TK</span>
                        </div>
                    </div>
                </div>

{/* Chart */}
                <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center p-4'>
                        <h3 className='text-xl font-semibold mb-2'>Donation Summary</h3>
                        <ul className='list-disc pl-5'>
                            {chartData.map((entry, index) => (
                                <li key={`item-${index}`} className='mb-2'>
                                    <span className='font-semibold text-lg' style={{ color: COLORS[index % COLORS.length] }}>
                                        {entry.name}:
                                    </span> {entry.value} ({((entry.value / totalAmount) * 100).toFixed(2)}%)
                                </li>
                            ))}
                        </ul>
                    </div>
                    <PieChart width={250} height={250}>
                        <Pie
                            data={chartData}
                            cx={125}
                            cy={125}
                            innerRadius={50}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}

                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
            );
};

            export default UserDonationSummary;
