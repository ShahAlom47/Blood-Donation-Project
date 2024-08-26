import { Link } from "react-router-dom";

const UseDonationInfo = () => {
    return (
        <div className=" m-3 p-3 bg-gray-500 bg-opacity-10">
            <h1 className="text-2xl mb-4 font-semibold text-center">How We Use Your Donations</h1>
            <p className=" text-center">We utilize the donations received to support various health-related initiatives, including health check-ups, blood donation campaigns, and blood group testing. Your contributions help us ensure that these essential services are available to those in need.</p>
            <div className="flex justify-center my-4">
                <Link to={'/about'}><button className="btn-p">Learn More</button></Link>
            </div>
        </div>
    );
};

export default UseDonationInfo;