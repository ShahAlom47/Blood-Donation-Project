
import { PieChart, Pie, Tooltip, Cell,  } from 'recharts';

const UserDonationSummary = () => {
    
    const data = [
        { name: 'Monthly Donation', value: 4000 },
        { name: 'One-Time Donation', value: 2400 },
    ];

    const COLORS = ['#0b7127', '#00C49F'];

    // Calculate the total amount for percentage calculation
    const totalAmount = data.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 bg-gray-400 bg-opacity-10 p-4 my-5 rounded-sm shadow-xl'>
           
                <div className=" m-3 mt-0 p-3 bg-opacity-10">
                    <div className=" relative flex justify-center items-center mx-auto p-4 w-56 h-56  rounded-lg">
                        <div className="relative flex justify-center items-center w-10/12 h-5/6 m-auto  border-4 border-color-p rounded-full">
                            <div className="absolute top-1 flex justify-center text-center items-center">
                                <span className="font-bold ">Total <br /> Donations</span>
                            </div>

                            <div className="absolute bottom-3 flex justify-center items-center w-full">
                                <span className="font-bold ">{2024} Year</span>
                            </div>
                        </div>
                        <div className=" absolute top-[42%] flex flex-col justify-center items-center bg-color-p text-white w-full h-10  rounded-full z-10">
                            <span className="font-semibold text-xl">2000 TK</span>
                        </div>
                    </div>
                </div>

{/* Chart */}
                <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center p-4'>
                        <h3 className='text-xl font-semibold mb-2'>Donation Summary</h3>
                        <ul className='list-disc pl-5'>
                            {data.map((entry, index) => (
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
                            data={data}
                            cx={125}
                            cy={125}
                            innerRadius={50}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
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
