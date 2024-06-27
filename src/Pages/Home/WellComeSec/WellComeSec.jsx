import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import img1 from '../../../assets/image/help1.png'
import img2 from '../../../assets/image/help2.png'

const WellComeSec = () => {
    return (
        <div className='max-w'>

            <div className="flex gap-4  w-full my-16 ">
                <div className="w-6/12  relative">
                    <img src={img1} alt="help-img" className="" />
                    <img src={img2} alt="help-image" className=" absolute right-20 bottom-1/2" />
                </div>
                <div className=" flex-1">
                    <p className='text-color-p'>HELP THE PEOPLE IN NEED</p>
                    <h1 className='text-4xl font-bold my-4'>Welcome to Blood Donors Organization</h1>
                    <p className="">
                        The Blood Donors Organization is a dedicated non-profit committed to saving lives through the promotion and facilitation of blood donation. Our mission is to ensure a steady and safe supply of blood for patients in need by creating a community of voluntary blood donors. We strive to raise awareness about the importance of blood donation, organize regular blood drives, and provide support and resources to both donors and recipients.
                    </p>
                    <div className=" flex justify-between my-5 font-bold">
                        <div className='space-y-3'>
                            <p className="flex items-center"><MdKeyboardDoubleArrowRight className='text-color-p' /> Good Service</p>
                            <p className="flex items-center"><MdKeyboardDoubleArrowRight className='text-color-p' />Help People</p>
                            <p className="flex items-center"><MdKeyboardDoubleArrowRight className='text-color-p' /> Hugine Tools</p>

                        </div>
                        <div className='space-y-3'>
                            <p className="flex items-center"><MdKeyboardDoubleArrowRight className='text-color-p' />24h Service</p>
                            <p className="flex items-center"><MdKeyboardDoubleArrowRight className='text-color-p' />Health Check</p>
                            <p className="flex items-center"><MdKeyboardDoubleArrowRight className='text-color-p' />Blood Bank</p>

                        </div>
                    </div>
                    <button className='btn-p mt-5'>Explore Now</button>
                </div>
            </div>

        </div>
    );
};

export default WellComeSec;