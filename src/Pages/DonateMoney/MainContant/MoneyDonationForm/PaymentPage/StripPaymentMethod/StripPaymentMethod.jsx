import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// eslint-disable-next-line react/prop-types
const StripPaymentMethod = ({donationData}) => {
    return (
        <div>
             <Elements stripe={stripePromise} >
                   <CheckOutForm donationData={donationData}></CheckOutForm>
                </Elements>
        </div>
    );
};

export default StripPaymentMethod;