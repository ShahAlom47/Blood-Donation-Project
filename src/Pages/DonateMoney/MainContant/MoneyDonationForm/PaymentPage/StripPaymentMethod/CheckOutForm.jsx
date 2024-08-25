/* eslint-disable react/prop-types */


import PropTypes from 'prop-types';
import Loader from 'react-js-loader';
import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosPublic from '../../../../../../CustomHocks/useAxiosPublic';
import usePaymentFunc from '../../Utilities Payment Func/usePaymentFunc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useEmailJs from '../../../../../../CustomHocks/useEmailJs';




const CheckOutForm = ({donationData}) => {
    const stripe = useStripe();
  const elements = useElements();
const AxiosPublic=useAxiosPublic();
const navigate =useNavigate();

const [errMsg, setErrMsg] = useState('');
const [clientSecret, setClientSecret] = useState('');
const [transactionId, setTransactionId] = useState('');
const [btnLoading,setBtnLoading]=useState(false);
const {addDonation}=usePaymentFunc();
  const {sendEmail}=useEmailJs()

const emailData = {
  name: donationData.donorName,
  email: donationData.donorEmail,
  subject: `Thank You for Your Generous Donation of TK${donationData.amount}`,
  message: `
    Dear ${donationData.donorName},

    We are incredibly grateful for your generous donation of TK${donationData.amount}. Your support helps us continue our vital work and make a meaningful impact in the community.

    Your kindness and generosity will go a long way in helping those in need, and we deeply appreciate your contribution.

    If you have any questions or would like to learn more about how your donation is being used, feel free to contact us at any time.

    Once again, thank you for your support!

    Best regards,
    The Blood Donation Team
  `
};





 

    useEffect(() => {
        if (donationData) {
          
    
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
            setBtnLoading(false)
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

                const res= await addDonation(paymentData)
                if(res.success===true){
                  toast.success(res.message)
                  sendEmail(emailData)
                  setTimeout(() => {
                    navigate('/donateMoney')
                  }, 2200);
                  return
                }
                toast.success(res.message)
            
            }
        }
    }

    

    return (
        <div className='my-10'>
          <ToastContainer></ToastContainer>
            <form 
            onSubmit={handelForm} 
            className=" flex flex-col gap-3 lg:w-6/12 md:w-8/12 w-full mx-auto p-5 shadow-xl rounded-sm " >
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


  