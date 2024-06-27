
import Banner from "./Banner/Banner";
import Banner2 from "./Banner/Banner2";
import TotalSummary from "./TotalSummary/TotalSummary";
import WellComeSec from "./WellComeSec/WellComeSec";

const Home = () => {
    return (
        <div className=" ">
            <Banner></Banner>
            <Banner2></Banner2>
            <WellComeSec></WellComeSec>
            <TotalSummary></TotalSummary>
        </div>
    );
};

export default Home;