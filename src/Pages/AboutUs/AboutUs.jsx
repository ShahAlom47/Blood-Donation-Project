import PageHeading from "../../Components/PageHeading";
import bg from '../../assets/image/AboutUs-bg.jpg'
import WhoWeAre from "./WhoWeAre/WhoWeAre";

const AboutUs = () => {

    return (
        <div>
            <PageHeading title={'About Us'} img={bg} ></PageHeading>

            <div className="max-w p-4">
                <WhoWeAre></WhoWeAre>
            </div>

        </div>
    );
};

export default AboutUs;