import { useLocation } from "react-router-dom";
import visa from '../../../../../assets/logo/Visa_Inc.-Logo.wine.png'
import master from '../../../../../assets/logo/Mastercard-Logo.wine.png'
import bKash from '../../../../../assets/logo/BKash.png'
import nagad from '../../../../../assets/logo/Nagad-Logo.wine.png'
import Swal from "sweetalert2";
import { useState } from "react";
import StripPaymentMethod from "./StripPaymentMethod/StripPaymentMethod";

const PaymentPage = () => {
    const location=useLocation()
    const [selectedMethod,setMethod]=useState('Visa Card')

    const donationData = location.state?.donationData || {};

    const handelPaymentMethod =(data)=>{
        if(data.status===false){
            Swal.fire('This payment method is currently under development.')
            return
        }
         setMethod(data.title)

    }

    console.log(donationData);
    return (
        <div className="p-8 max-w ">
        <div className=" border-b-2 pb-3">
            <h1 className="lg:text-3xl md:text-3xl text-xl font-bold">Payment</h1>
            
        </div>
        <div className=" flex gap-4 flex-wrap justify-around my-5 ">
            {
                paymentMethods.map((method,index)=><button 
                key={index}
                onClick={()=>handelPaymentMethod(method)}
                className={`flex  bg-gray-300 bg-opacity-20 lg:px-5 md:px-5 px-2 py-3 shadow-xl shadow-current rounded-sm 
                 items-center justify-center flex-wrap hover:bg-opacity-50 transition-colors duration-100 border-color-p
                 ${selectedMethod===method.title?'shadow-color-p bg-opacity-60':''}  `}
                >
                        <p className="lg:text-xl md:text-xl text-lg font-semibold">Pay With</p>
                        <img className="lg:w-20 md:w-20 w-12 lg:h-12 md:h-12 h-8" src={method.logo} alt={`${method.title} logo`} />
                </button>)
            }
        </div>

       
        <div className=" py-5">
           <StripPaymentMethod donationData={donationData}></StripPaymentMethod>


        </div>

    </div>
    );
};

export default PaymentPage;

const paymentMethods = [
    {
        title: 'bKash',
        logo: bKash ,
         status: false,
    },
    {
        title: 'Nagad',
        logo:nagad,
          status: false,
    },
    {
        title: 'Visa Card',
        logo: visa,
         status: true,
    },
    {
        title: 'MasterCard',
        logo:master,
         status: true,
    },
];