/* eslint-disable react/prop-types */


import PropTypes from 'prop-types';
import Loader from 'react-js-loader';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


import Swal from "sweetalert2";
import useUser from '../../../../../../CustomHocks/useUser';
import useAxiosPublic from '../../../../../../CustomHocks/useAxiosPublic';




const CheckOutForm = ({donationData}) => {
    const stripe = useStripe();
  const elements = useElements();
const AxiosPublic=useAxiosPublic()

const { user } =useUser()
const navigate = useNavigate();

const [errMsg, setErrMsg] = useState('');
const [clientSecret, setClientSecret] = useState('');
const [transactionId, setTransactionId] = useState('');
const [amount,setAmount]=useState(0)
const [btnLoading,setBtnLoading]=useState(false)







 

    useEffect(() => {
        if (donationData) {
          setAmount(parseFloat(donationData?.amount));
    
          const createPaymentIntent = async () => {
            try {
              const response = await AxiosPublic.post("/payment/create-payment-intent", { price: parseFloat(donationData?.amount) });
            console.log(response);
              setClientSecret(response.data.clientSecret);
              setErrMsg('')
            } catch (error) {
              setErrMsg( error?.response?.data?.error)
             
            }
          };
    
          createPaymentIntent();
        }
      }, [AxiosPublic, donationData]);



    const handelForm = async (e) => {
      setBtnLoading(true)
        setErrMsg('')
        setTransactionId('')
        e.preventDefault()

        console.log(stripe,elements);
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error,  } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErrMsg(error.message)
            setBtnLoading(false)
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: donationData?.donorName,
                        email: donationData?.donorEmail,
                    }
                }
            }
        )

      

        if (confirmError) {
            setErrMsg('Something Is Wrong')
        }
        else {
            if (paymentIntent.status === 'succeeded') {
               
                setTransactionId(paymentIntent.id)
                setBtnLoading(false)
                const paymentData = {
                    ...donationData,
                    transactionId: paymentIntent.id,
                    paymentType:'card'
                }

                // const response = await AxiosPublic.post('/paymentHistory', paymentData)
            
                // if (response.data?.modifiedCount===1) {
                 
                //     Swal.fire("Payment Completed");
                //     navigate('/dashBoard/myBoughtProperty')
                // }
            }

        }


    }

    

    return (
        <div className='my-10'>
            <form 
            onSubmit={handelForm} 
            className=" flex flex-col gap-3 w-6/12 mx-auto p-5 shadow-xl rounded-sm " >
              <div  className='  shadow-xl p-3'>
              <CardElement
                    options={{
                        style: {
                            base: {
                              border:'solid red 2px',
                                fontSize: '18px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#616a78',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
              </div>
                <div className="text-red-500">{errMsg}</div>
                {transactionId && <div className="text-green-500"> Your Transaction Id: {transactionId}</div>}
                
                <button
                  disabled={!stripe || !clientSecret} 
                  className={` btn btn-primary rounded-sm m-auto btn-md w-8/12 flex items-center justify-center  ${!stripe || !clientSecret?'cursor-not-allowed opacity-50':''} ` }
                  type="submit" 
                  >
                    {btnLoading?
                     <Loader  type='bubble-scale' bgColor={'#ffff'}  size={40} />:'Donate'}</button>

            </form>
        </div>
    );
};

export default CheckOutForm;

CheckOutForm.propTypes = {
    propertyId: PropTypes.string
  };
