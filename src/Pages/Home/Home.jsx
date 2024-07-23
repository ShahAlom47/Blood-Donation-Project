
import Banner from "./Banner/Banner";
import Banner2 from "./Banner/Banner2";
import BloodRequest from "./BloodRequest/BloodRequest";
import ContactSection from "./ContactSection/ContactSection";
import OurServices from "./OurServices/OurServices";
import TotalSummary from "./TotalSummary/TotalSummary";
import WellComeSec from "./WellComeSec/WellComeSec";

const Home = () => {
    return (
        <div className=" ">
            <Banner></Banner>
            <Banner2></Banner2>
            <WellComeSec></WellComeSec>
            <TotalSummary></TotalSummary>
            <OurServices></OurServices>
            <BloodRequest></BloodRequest>
            <ContactSection></ContactSection>
        </div>
    );
};

export default Home;