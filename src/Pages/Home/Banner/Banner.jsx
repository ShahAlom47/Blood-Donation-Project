import banner from '../../../assets/banner/banner.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { BsPlayBtnFill } from 'react-icons/bs';
import { Zoom } from 'react-awesome-reveal';

const Banner = () => {
    return (
        <div className="min-h-[500px] relative bg-cover" style={{ backgroundImage: `url(${banner})` }}>
            <div className="h-full absolute inset-0 bg-gradient-to-r from-white to-transparent p-8">
                <div className='max-w flex items-center h-full'>
                    <div className='lg:w-6/12 flex items-center justify-start h-full'>
                        <div className='my-auto h-full'>
                            <Swiper navigation={true} modules={[Navigation]} className="mySwiper h-full">
                                <SwiperSlide className='h-full flex items-center justify-center'>
                                    <div className='flex flex-col justify-center items-start h-full pl-8 w-full space-y-3'>
                                        <div className='flex gap-2 items-center'>
                                            <Zoom>
                                                <button className='zoom-btn hover:bg-transparent text-color-p text-5xl'>
                                                    <BsPlayBtnFill />
                                                </button>
                                            </Zoom>
                                            <p className='text-3xl'>Intro Video</p>
                                        </div>
                                        <p className='text-xl font-semibold'>Donate Blood, Save Life!</p>
                                        <h1 className='text-5xl font-bold text-color-text'>Donate Blood And <br /> Inspire Others.</h1>
                                        <button className='btn-p mt-6'>Explore</button>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
