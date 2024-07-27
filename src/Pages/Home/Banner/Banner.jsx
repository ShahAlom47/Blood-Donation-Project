import { useState, useEffect } from 'react';
import banner from '../../../assets/banner/banner.jpg';
import banner2 from '../../../assets/banner/blood-donate-banner-2.jpg';
import banner3 from '../../../assets/banner/BANNER-3.jpg';
import { BsPlayBtnFill } from 'react-icons/bs';
import { Zoom } from 'react-awesome-reveal';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.min.css';
import { BiSolidDonateHeart } from 'react-icons/bi';
import { LuLogIn } from 'react-icons/lu';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Banner.css'; 

const Banner = () => {
    const [isOpen, setOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: 'Donate Blood And Inspire Others.',
            subtitle: 'Donate Blood, Save Life!',
            text: 'Donate Blood, Save Life!',
            img: banner,
        },
        {
            id: 2,
            title: 'Share the Gift of Life, Donate Blood',
            subtitle: 'Donate Blood, Save Life!',
            text: 'Share the Gift of Life, Donate Blood',
            img: banner2,
        },
        {
            id: 3,
            title: 'Become a Lifesaver, Donate Blood',
            subtitle: 'Donate Blood, Save Life!',
            text: 'Become a Lifesaver, Donate Blood',
            img: banner3,
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 4000);

        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative">
            <div className="lg:min-h-[600px] min-h-[500px] relative border-b-2 bg-cover" style={{ backgroundImage: `url(${slides[currentSlide].img})` }}>
                <div className="h-full absolute inset-0 bg-gradient-to-r from-white to-transparent p-8">
                    <div className='max-w flex flex-col justify-center items-center relative h-full pb-16'>
                        <div className="carousel w-full h-full lg:my-16 my-6 overflow-hidden">
                            <div className="relative w-full h-full pt-6">
                                <TransitionGroup className="transition-group">
                                    <CSSTransition
                                        key={slides[currentSlide].id}
                                        timeout={500}
                                        classNames="fade"
                                    >
                                        <div className="flex flex-col justify-center items-start h-full pl-8 mb-1 w-full space-y-3">
                                            <div className='flex gap-3 items-center'>
                                                <Zoom>
                                                    <button onClick={() => setOpen(true)} className='zoom-btn hover:bg-transparent text-color-p text-5xl'>
                                                        <BsPlayBtnFill />
                                                    </button>
                                                </Zoom>
                                                <p className='text-3xl'>Intro Video</p>
                                            </div>
                                            <p className='text-xl font-semibold '>{slides[currentSlide].subtitle}</p>
                                            <h1 className='lg:text-5xl text-3xl font-bold text-color-tex pb-8'>
                                                {slides[currentSlide].title}
                                            </h1>
                                            <button className='btn-p '>Explore</button>
                                        </div>
                                    </CSSTransition>
                                </TransitionGroup>
                                <div className="absolute left-5 right-1 bottom-0 flex gap-4 lg:justify-center md:justify-center justify-end">
                                    <button onClick={handlePrevSlide} className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❮</button>
                                    <button onClick={handleNextSlide} className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <ModalVideo
                    channel='youtube'
                    isOpen={isOpen}
                    videoId='YHxdhI5ZrHc'
                    onClose={() => setOpen(false)}
                />
            </div>
            <div className="max-w bg-gray-200 lg:relative md:relative border-4 p-3">
                <div className='lg:absolute md:absolute -top-[200%]'>
                    <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center lg:w-10/12 md:w-10/12 w-11/12 m-auto">
                        <div className='bg-color-p min-h-40 lg:w-6/12 w-full text-white lg:flex items-center justify-between p-4'>
                            <div className="">
                                <h1 className="text-xl font-bold text-white p-3 flex gap-4 items-center ">
                                    Register Now
                                </h1>
                                <p className="">
                                    Register now to join our lifesaving community. Your pledge helps ensure quick responses in emergencies. Join us today
                                </p>
                            </div>
                            <div className='w-3/12'>
                                <button className='btn btn-ghost hover:bg-transparent'>
                                    <LuLogIn className='hover:text-black text-4xl' />
                                </button>
                            </div>
                        </div>
                        <div className='bg-black lg:w-6/12 w-full min-h-40 text-white lg:flex items-center justify-between p-4'>
                            <div className="">
                                <h1 className="text-xl font-bold text-white p-3 flex gap-4 items-center ">
                                    Donate Now
                                </h1  >                          
                                    <p className="">
                                    Donate now to save lives. Your blood donation provides hope and critical support for patients in need. Be a hero today.
                                </p>
                            </div>
                            <div className='w-3/12'>
                                <button className='btn btn-ghost hover:bg-transparent'>
                                    <BiSolidDonateHeart className='hover:text-color-p text-4xl' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
