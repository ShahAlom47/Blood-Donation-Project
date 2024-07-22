
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import img from '../../../assets/image/total-sec.jpg';
import medal from '../../../assets/png/medal.png'
import client from '../../../assets/png/costumer.png'
import donar from '../../../assets/png/stethoscope.png'
import award from '../../../assets/png/trophy.png'

const TotalSummary = () => {
    const { ref, inView } = useInView({
        // triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <div
            ref={ref}
            className="relative flex items-center justify-center py-12 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
        >
            <div className="absolute inset-0 bg-black opacity-90"></div>
            <div className="relative text-center text-white max-w">
                <div className="flex justify-around flex-wrap gap-8 mt-8">
                    <div className=' flex flex-col items-center justify-center gap-5'>
                       <img src={medal} alt="" className="w-20 bg-color-p p-4 rounded-b-full" />
                        {inView && <CountUp end={5} duration={3} className="text-5xl font-bold " />}
                        <h3 className="text-xl font-semibold">YEAR EXPERIENCE</h3>
                    </div>
                    <div className=' flex flex-col items-center justify-center gap-5'>
                       <img src={award} alt="" className="w-20 bg-color-p p-4 rounded-b-full" />
                        {inView && <CountUp end={5} duration={3} className="text-5xl font-bold " />}
                        <h3 className="text-xl font-semibold">TOTAL AWARDS</h3>
                    </div>
                    <div className=' flex flex-col items-center justify-center gap-5'>
                       <img src={donar} alt="" className="w-20 bg-color-p p-4 rounded-b-full" />
                        {inView && <CountUp end={300} duration={3} className="text-5xl font-bold " />}
                        <h3 className="text-xl font-semibold">HAPPY DONORS</h3>
                    </div>
                    <div className=' flex flex-col items-center justify-center gap-5'>
                       <img src={client} alt="" className="w-20 bg-color-p p-4 rounded-b-full" />
                        {inView && <CountUp end={450} duration={3} className="text-5xl font-bold " />}
                        <h3 className="text-xl font-semibold">HAPPY RECIPIENT</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalSummary;
