import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import img from '../../../assets/image/total-sec.jpg';
import { HiOutlineCheckBadge } from 'react-icons/hi2';

const TotalSummary = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <div
            ref={ref}
            className="relative flex items-center justify-center py-12 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
        >
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="relative text-center text-white max-w">
                <div className="flex justify-around gap-8 mt-8">
                    <div>
                        <HiOutlineCheckBadge />
                        {inView && <CountUp end={5} duration={3} className="text-xl" />}
                        <h3 className="text-xl font-semibold">YEAR EXPERIENCE</h3>
                    </div>
                    <div>
                        {inView && <CountUp end={500} duration={3} className="text-xl" />}
                        <h3 className="text-xl font-semibold">HAPPY DONORS</h3>
                    </div>
                    <div>
                        {inView && <CountUp end={20} duration={3} className="text-xl" />}
                        <h3 className="text-xl font-semibold">TOTAL AWARDS</h3>
                    </div>
                    <div>
                        {inView && <CountUp end={400} duration={3} className="text-xl" />}
                        <h3 className="text-xl font-semibold">HAPPY RECIPIENT</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalSummary;
