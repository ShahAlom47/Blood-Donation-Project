import { useLocation } from "react-router-dom";


const PaymentPage = () => {
    const location=useLocation()
    const donationData = location.state?.donationData || {};

    console.log(donationData);
    return (
        <div className="p-8 ">
        <div className=" border-b-2 pb-3">
            <h1 className="text-3xl font-bold">Payment</h1>
        </div>
        <div>
           


        </div>

    </div>
    );
};

export default PaymentPage;