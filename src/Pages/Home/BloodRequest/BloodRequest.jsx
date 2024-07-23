import RequestForm from "../../../Components/RequestForm";
import RequestList from "../../../Components/RequestList";
import SectionHeading from "../../../Components/SectionHeading";
import banner from '../../../assets/image/blood-request-banner.jpg'

const BloodRequest = () => {
    return (
        <div className="mb-10 ">
            <div className="relative min-h-[250px] bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="relative z-10 flex justify-center items-center h-full">
                    <SectionHeading subTitle={'BLOOD OWNER'} title={'We Are Blood Donor Group'} titleColor={'text-white'} />
                </div>
            </div>
            <div className="max-w p-10 gap-5 flex lg:flex-row md:flex-row flex-col  ">
                <div className="flex-1  bg-white shadow-xl min-h-full ">
                <RequestList></RequestList>
                </div>
                <div className="lg:w-1/2 md:w-1/2 bg-white shadow-xl h-full ">
                <RequestForm></RequestForm>

                </div>
            </div>
        </div>
    );
};

export default BloodRequest;
