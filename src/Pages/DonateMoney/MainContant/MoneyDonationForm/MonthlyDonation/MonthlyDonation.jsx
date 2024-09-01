import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useUser from "../../../../../CustomHocks/useUser";
import useSound from "../../../../../CustomHocks/useSound";
import MonthlyDonationActivePage from "./MonthlyDonationActivePage/MonthlyDonationActivePage";
import useUserMonthlyDonationData from "../../../../../CustomHocks/useUserMonthlyDonationData";

const OneTimeDonation = () => {

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    const { user } = useUser();
    const navigate = useNavigate();
    const { playSound } = useSound();

    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    
   const {data,refetch}=useUserMonthlyDonationData();
    
    const [customInputValue, setCustomInputValue] = useState('');
    const [lastDonateMonth,setLastDonationMonth]=useState('');
    const [amount, setAmount] = useState(user?.monthlyDonation==='active'?data?.monthlyAmount:100);
    const [totalAmount, setTotalAmount] = useState(amount);
    const [selectedMonths, setSelectedMonths] = useState( [months[month]]);
    const lastMonthIndex = months.indexOf(lastDonateMonth); 
    
    


    useEffect(() => {
        setAmount(user?.monthlyDonation==='active'?data?.monthlyAmount:100)
        if (user?.monthlyDonation === 'active') {
            const nextMonthIndex = (lastMonthIndex + 1) % months.length;
            setSelectedMonths([months[nextMonthIndex]]);
          
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastDonateMonth, user,data]);
    


 
    const handleMonthToggle = (month) => {
        const targetedMonthIndex = months.indexOf(month); 

        const donatedMonths = data?.donationHistory.map(item => {
            const [year, monthNumber] = item.donationMonth.split('-');
            return {
                monthName: months[parseInt(monthNumber, 10) - 1],
                year: parseInt(year, 10)
            };
        });
       
    
        if (user?.monthlyDonation === 'active') {
            const isDonated = donatedMonths?.some(donated => 
                donated.monthName === month && donated.year >= year
            );
    
            if (isDonated ||  lastMonthIndex > targetedMonthIndex) {
                Swal.fire(`You have already donated for ${month} in ${year} or a later year.`);
                return; // Stop further execution
            }
        }
    
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
        if (selectedMonths.length <= 0) {
            playSound('error');
            Swal.fire({
                icon: 'warning',
                text: 'Please select a month'
            });
            return;
        }

      

        const donationData = {
            donorName: user?.name,
            donorEmail: user?.email,
            donorPhone: user?.phoneNumber,
            startingDate: new Date().toLocaleDateString(),
            lastDonationDate: new Date().toLocaleDateString(),
            monthlyAmount: parseFloat(finalAmount),
            donationType: 'monthlyDonation',
            category: "moneyDonation",
            userType: "user",
            donationHistory: selectedMonths.map((month) => {
                const monthIndex = new Date(`${month} 1, ${year}`).getMonth() + 1;
                const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
                return {
                    donationMonth: `${year}-${formattedMonth}`,
                    amount: parseInt(finalAmount),
                    donateDate: new Date().toISOString().split('T')[0], 
                };
            })
        };
        
// console.log(donationData);

        navigate('/paymentPage', { state: { donationData } });
    };


   


    return (
        <div className="my-2">


            <div className="my-3">
                <form onSubmit={handleDonate}>
                    {
                        user?.monthlyDonation === 'active' ?

                            <MonthlyDonationActivePage setLastDonationMonth={setLastDonationMonth} data={data} refetch={refetch} ></MonthlyDonationActivePage>

                            : <>
                                <h3 className="text-lg font-bold mb-1">Select Amount </h3>
                                <p className="text-color-p mb-2">
                                    * You can update your monthly donation amount at any time.
                                </p>

                                {/* amount select button */}
                                <div className="flex gap-4 flex-wrap">
                                    {[100, 200, 400, 500, 1000].map((money) =>
                                        <button
                                            key={money}
                                            type="button"
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

                                {/* custom amount  */}
                                <div className="mt-3 flex gap-4 lg:flex-row md:flex-row flex-col mb-5 border border-black border-opacity-20">

                                    <input
                                        disabled={amount !== 'Custom Amount'}
                                        required={amount === 'Custom Amount'}
                                        className="flex-1 input input-bordered w-full rounded-sm py-1 outline-none  "
                                        type="number"
                                        name="amount"
                                        min={100}
                                        placeholder="Your Amount"
                                        value={customInputValue}
                                        onChange={(e) => {
                                            setCustomInputValue(parseFloat(e.target.value))
                                            setTotalAmount(parseFloat(e.target.value) || 0)
                                        }}
                                    />
                                </div>
                            </>
                    }

                    {/* Month selection section */}
                    <div className="mb-5">
                        <h3 className="text-lg font-bold mb-4">Select Month(s)</h3>
                        <div className=" flex gap-2">

                            <h1 className="border px-4 py-1 bg-color-p font-bold text-white  flex justify-center items-center rounded-r-full ">{year}</h1>
                            <div className="grid gap-2 lg:grid-cols-6 md:grid-cols-4 grid-cols-2 mx-aut flex-1">
                                {months.map((month,index) => (
                                    <button
                                        key={month}
                                        type="button"
                                        onClick={() => handleMonthToggle(month,index)}
                                        className={`border border-color-p px-auto  py-1 ${selectedMonths.includes(month) ? 'bg-color-p text-white' : ''}`}
                                    >
                                        {month}
                                    </button>
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <h1 className="text-xl font-bold">Total Month : <span>{selectedMonths.length}</span></h1>
                        <h1 className=" text-xl font-bold ">Total Amount : <span className=" text-color-p  text-2xl">{
                            amount === "Custom Amount" ? totalAmount * selectedMonths.length : parseFloat(amount) * selectedMonths.length

                        }</span> TK</h1>
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
