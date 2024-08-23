import { useState } from "react";
import Swal from "sweetalert2";
import { IoIosArrowRoundForward } from "react-icons/io";

const OneTimeDonation = () => {
    const [amount, setAmount] = useState(50);
    const [customInputValue, setCustomInputValue] = useState('');

    const handleDonate = (e) => {
        e.preventDefault();
        const finalAmount = amount === 'Custom Amount' ? customInputValue : amount;
        if (finalAmount === '' || isNaN(finalAmount) || finalAmount <= 0) {
            Swal.fire('Please enter a valid donation amount');
            return;
        }

       
        e.target.reset();
        setCustomInputValue(''); 
        console.log("Donation Amount:", finalAmount);
    };

    return (
        <div className="my-2">
            <div className="flex gap-4 flex-wrap">
                {[50, 100, 200, 400, 500, 1000].map((money) =>
                    <button
                        key={money}
                        onClick={() => setAmount(money)}
                        className={`border border-color-p px-3 py-1 ${amount === money ? 'bg-color-p text-white' : ''}`}
                    >{money}</button>)
                }
            </div>
            <div className="my-3">
                <form onSubmit={handleDonate}>
                    <div className="flex gap-4 lg:flex-row md:flex-row flex-col mb-5">
                        <button
                            type="button"
                            onClick={() => setAmount('Custom Amount')}
                            className={`lg:w-4/12 md:w-4/12 w-full py-1 border border-color-p px-3 ${amount === 'Custom Amount' ? 'bg-color-p text-white' : ''}`}
                        >
                            Custom Amount
                        </button>
                        <input
                            disabled={amount !== 'Custom Amount'}
                            required={amount === 'Custom Amount'}
                            className="flex-1 input input-bordered w-full rounded-sm py-1 outline-none border-none"
                            type="number"
                            name="amount"
                            placeholder="Your Amount"
                            value={customInputValue}
                            onChange={(e) => setCustomInputValue(e.target.value)}
                        />
                    </div>
                    <button className="btn-p flex items-center justify-center gap-2" type="submit">Next <IoIosArrowRoundForward className="text-xl" /></button>
                </form>
            </div>
        </div>
    );
};

export default OneTimeDonation;
