import AllMoneyDonationHistory from "./AllMoneyDonationHistory";
import TotalDonationSummary from "./TotalDonationSummary";




const DonationMoney = () => {
    return (
        <div className="my-10">
            <TotalDonationSummary></TotalDonationSummary>
            <AllMoneyDonationHistory></AllMoneyDonationHistory>
        </div>
    );
};

export default DonationMoney;