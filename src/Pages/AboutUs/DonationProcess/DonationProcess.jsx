import { useEffect, useState } from "react";
import SectionHeading from "../../../Components/SectionHeading";
import ProcessCard from "./Component/ProcessCard";

const DonationProcess = () => {
    const [position, setPosition] = useState('right');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setPosition('left');
            } else {
                setPosition('right');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="max-w">
            <SectionHeading title={'Donation Process'} subTitle={'WHAT WE DO'} />
            <div className="grid grid-cols-7 grid-rows-4 gap-4 p-10 relative">
                <div className="lg:col-span-3 md:col-span-3 col-span-7 col-start-1 row-span-1">
                    <ProcessCard index={1} position={position} title={donationProcess[0].title} description={donationProcess[0].description} />
                </div>
                <div className="lg:col-span-3 md:col-span-3 col-span-7 lg:col-start-5 md:col-start-5 col-start-1 row-span-1 row-start-2">
                    <ProcessCard index={2} title={donationProcess[1].title} description={donationProcess[1].description} />
                </div>
                <div className="lg:col-span-3 md:col-span-3 col-span-7 col-start-1 row-span-1 row-start-3">
                    <ProcessCard index={3} position={position} title={donationProcess[2].title} description={donationProcess[2].description} />
                </div>
                <div className="lg:col-span-3 md:col-span-3 col-span-7 lg:col-start-5 md:col-start-5 col-start-1 row-span-1 row-start-4">
                    <ProcessCard index={4} title={donationProcess[3].title} description={donationProcess[3].description} />
                </div>
                
                {/* Line in the middle */}
                <div className=" absolute left-1/2 transform -translate-x-1/2 top-32 bottom-32 lg:flex md:flex hidden flex-col items-center">
           
                    <div className="bg-white p-2 rounded-full border-4 border-red-500 -mt-1"></div>
                    <div className="flex-grow border-l-4 border-dashed border-red-500"></div>
                    <div className="bg-white p-2 rounded-full border-4 border-red-500 -mt-1"></div>
                    <div className="flex-grow border-l-4 border-dashed border-red-500"></div>
                    <div className="bg-white p-2 rounded-full border-4 border-red-500 -mt-1"></div>
                    <div className="flex-grow border-l-4 border-dashed border-red-500"></div>
                    <div className="bg-white p-2 rounded-full border-4 border-red-500 -mt-1"></div>
                </div>
            </div>
        </div>
    );
};

export default DonationProcess;

const donationProcess = [
    {
        title: "Registration",
        description: "Donors provide their personal information and consent to the donation process, ensuring safety and maintaining accurate donor records for future reference."
    },
    {
        title: "Screening Test",
        description: "Before donating, donors undergo a health questionnaire and mini-physical examination to ensure they are eligible and that their blood is safe for transfusion."
    },
    {
        title: "Donation",
        description: "During the donation process, a small amount of blood is drawn from the donor, typically taking about 10-15 minutes while closely monitoring their well-being."
    },
    {
        title: "Rest & Refresh",
        description: "After donating, donors are given time to rest and provided with refreshments to help replenish their energy and ensure they feel well before leaving the center."
    }
];
