
import Banner from "./Banner/Banner";
import Banner2 from "./Banner/Banner2";
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
        </div>
    );
};

export default Home;