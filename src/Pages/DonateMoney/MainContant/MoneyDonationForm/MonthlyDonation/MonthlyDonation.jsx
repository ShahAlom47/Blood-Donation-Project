import { useState } from "react";
import Swal from "sweetalert2";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useUser from "../../../../../CustomHocks/useUser";

const OneTimeDonation = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const date = new Date().toLocaleDateString();
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const [amount, setAmount] = useState(100);
    const [customInputValue, setCustomInputValue] = useState('');

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [selectedMonths, setSelectedMonths] = useState([months[month]]);



    const handleMonthToggle = (month) => {
        setSelectedMonths(prev =>
            prev.includes(month)
                ? prev.filter(m => m !== month)
                : [...prev, month]
        );
    };

    const handleDonate = (e) => {
        e.preventDefault();
        const finalAmount = amount === 'Custom Amount' ? customInputValue : amount;
        if (finalAmount === '' || isNaN(finalAmount) || finalAmount <= 0) {
            Swal.fire('Please enter a valid donation amount');
            return;
        }

        const totalMonths = selectedMonths.length || 1; 
        const totalDonationAmount = parseInt(finalAmount) * totalMonths;

        const donationData = {
            donorName: user?.name,
            donorEmail: user?.email,
            donorPhone: user?.phoneNumber,
            startingDate: new Date().toLocaleDateString(),
            lastDonationDate: new Date().toLocaleDateString(),
            monthlyAmount: totalDonationAmount,
            donationType: 'monthlyDonation',
            category: "moneyDonation",
            userType: "user",
            donationHistory: selectedMonths.map((month, ) => ({
                month: month,
                year: year,
                amount: parseInt(finalAmount),
                date: new Date().toLocaleDateString(),  // এখানে প্রতিটি মাসের জন্য একটি একই তারিখ দেয়া হচ্ছে। 
            }))
        };
        
        console.log(donationData);
        

    

        // navigate('/paymentPage', { state: { donationData } });
    };

    return (
        <div className="my-2">
            <div className="mb-6">
                <h1 className="text-xl font-bold">Today: <span>{date}</span></h1>
            </div>
            <h3 className="text-lg font-bold mb-1">Select Amount </h3>
            <p className="text-color-p mb-2">
                * You can update your monthly donation amount at any time.
            </p>
            <div className="flex gap-4 flex-wrap">
                {[100, 200, 400, 500, 1000].map((money) =>
                    <button
                        key={money}
                        onClick={() => setAmount(money)}
                        className={`border border-color-p px-3 py-1 ${amount === money ? 'bg-color-p text-white' : ''}`}
                    >{money} TK</button>)
                }
                <button
                    type="button"
                    onClick={() => setAmount('Custom Amount')}
                    className={`lg:w-4/12 md:w-4/12 w-full py-1 border border-color-p px-3 ${amount === 'Custom Amount' ? 'bg-color-p text-white' : ''}`}
                >
                    Custom Amount
                </button>
            </div>
            <div className="my-3">
                <form onSubmit={handleDonate}>
                    <div className="flex gap-4 lg:flex-row md:flex-row flex-col mb-5 border border-black border-opacity-20">

                        <input
                            disabled={amount !== 'Custom Amount'}
                            required={amount === 'Custom Amount'}
                            className="flex-1 input input-bordered w-full rounded-sm py-1 outline-none "
                            type="number"
                            name="amount"
                            min={100}
                            placeholder="Your Amount"
                            value={customInputValue}
                            onChange={(e) => setCustomInputValue(e.target.value)}
                        />
                    </div>

                    {/* Month selection section */}
                    <div className="mb-5">
                        <h3 className="text-lg font-bold mb-4">Select Month(s)</h3>
                        <div className=" flex gap-4">

                            <h1 className="border px-4 py-1 bg-color-p font-bold text-white  flex justify-center items-center rounded-r-full ">{year}</h1>
                            <div className="flex gap-2 flex-wrap">
                                {months.map((month) => (
                                    <button
                                        key={month}
                                        type="button"
                                        onClick={() => handleMonthToggle(month)}
                                        className={`border border-color-p px-3 py-1 ${selectedMonths.includes(month) ? 'bg-color-p text-white' : ''}`}
                                    >
                                        {month}
                                    </button>
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <h1 className="text-xl font-bold">Total Month : <span>{selectedMonths.length}</span></h1>
                        <h1 className=" text-xl font-bold ">Total Amount : <span className=" text-color-p  text-2xl">{amount * selectedMonths.length}</span> TK</h1>
                    </div>
                    <button className="btn-p flex items-center justify-center gap-2" type="submit">
                        Next <IoIosArrowRoundForward className="text-xl" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OneTimeDonation;
