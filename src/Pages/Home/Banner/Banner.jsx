import banner from '../../../assets/banner/banner.jpg';
import { BsPlayBtnFill } from 'react-icons/bs';
import { Zoom } from 'react-awesome-reveal';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.min.css';
import { useState } from 'react';
import { BiSolidDonateHeart } from 'react-icons/bi';
import { LuLogIn } from 'react-icons/lu';

const Banner = () => {
    const [isOpen, setOpen] = useState(false);


    return (
        <div className="relative ">
            <div className="lg:min-h-[600px] min-h-[500px] relative border-b-2 bg-cover" style={{ backgroundImage: `url(${banner})` }}>
                <div className="h-full absolute inset-0 bg-gradient-to-r from-white to-transparent p-8">
                    <div className='max-w flex flex-col justify-center items-center relative h-full pb-16'>
                        <div className="carousel w-full h-full lg:my-12 my-6 overflow-hidden">
                            <div id="slide1" className="carousel-item relative h-full w-full">
                                <div className='flex flex-col justify-center items-start h-full pl-8 mb-1 w-full space-y-3'>
                                    <div className='flex gap-2 items-center'>
                                        <Zoom>
                                            <button onClick={() => setOpen(true)} className='zoom-btn hover:bg-transparent text-color-p text-5xl'>
                                                <BsPlayBtnFill />
                                            </button>
                                        </Zoom>
                                        <p className='text-3xl'>Intro Video</p>
                                    </div>
                                    <p className='text-xl font-semibold'>Donate Blood, Save Life!</p>
                                    <h1 className='lg:text-5xl text-3xl font-bold text-color-text'>Donate Blood And <br /> Inspire Others.</h1>
                                    <button className='btn-p mt-6'>Explore</button>
                                </div>
                                <div className="absolute left-5 right-1 bottom-0 flex gap-4 lg:justify-center md:justify-center justify-end">
                                    <a href="#slide3" className="btn btn-circle  bg-color-p border-none text-white hover:bg-black">❮</a>
                                    <a href="#slide2" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❯</a>
                                </div>
                            </div>
                            <div id="slide2" className="carousel-item relative w-full">
                                <div className='flex flex-col justify-center items-start h-full pl-8 w-full space-y-3'>
                                    <div className='flex gap-2 items-center'>
                                        <Zoom>
                                            <button onClick={() => setOpen(true)} className='zoom-btn hover:bg-transparent text-color-p text-5xl'>
                                                <BsPlayBtnFill />
                                            </button>
                                        </Zoom>
                                        <p className='text-3xl'>Intro Video</p>
                                    </div>
                                    <p className='text-xl font-semibold'>Donate Blood, Save Life!</p>
                                    <h1 className='lg:text-5xl text-3xl font-bold text-color-text'>
                                        Share the Gift of <br /> Life, Donate Blood
                                    </h1>
                                    <button className='btn-p mt-6'>Explore</button>
                                </div>
                                <div className="absolute left-5 right-1 bottom-0 flex gap-4 lg:justify-center md:justify-center justify-end">
                                    <a href="#slide1" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❮</a>
                                    <a href="#slide3" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❯</a>
                                </div>
                            </div>
                            <div id="slide3" className="carousel-item relative w-full h-full">
                                <div className='flex flex-col justify-center items-start h-full pl-8 w-full space-y-3'>
                                    <div className='flex gap-2 items-center'>
                                        <Zoom>
                                            <button onClick={() => setOpen(true)} className='zoom-btn hover:bg-transparent text-color-p text-5xl'>
                                                <BsPlayBtnFill />
                                            </button>
                                        </Zoom>
                                        <p className='text-3xl'>Intro Video</p>
                                    </div>
                                    <p className='text-xl font-semibold'>Donate Blood, Save Life!</p>
                                    <h1 className='lg:text-5xl text-3xl font-bold text-color-text'>
                                        Become a Lifesaver, <br /> Donate Blood
                                    </h1>
                                    <button className='btn-p mt-6'>Explore</button>
                                </div>
                                <div className="absolute left-5 right-1 bottom-0 flex gap-4 lg:justify-center md:justify-center justify-end">
                                    <a href="#slide2" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❮</a>
                                    <a href="#slide1" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❯</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>




                {/* modal */}

                <ModalVideo
                    channel='youtube'
                    isOpen={isOpen}
                    videoId='YHxdhI5ZrHc'
                    onClose={() => setOpen(false)}
                />

            </div>
            <div className="max-w bg-gray-200 lg:relative  md:relative  border-4 p-3 ">
                <div className='  lg:absolute md:absolute -top-[200%]   '>
                    <div className="flex lg:flex-row flex-col  items-center justify-center lg:w-10/12 md:w-10/12 w-11/12  m-auto ">
                        <div className='bg-color-p min-h-40 lg:w-6/12 w-full  text-white lg:flex items-center justify-between p-4'>
                            <div className="">
                                <h1 className="text-xl font-bold text-white p-3 flex gap-4 items-center ">
                                    Register Now
                                </h1>
                                <p className="">
                                    Register now to join our lifesaving community. Your pledge helps ensure quick responses in emergencies. Join us today
                                </p>
                            </div>
                            <div className='w-3/12 '>
                                <button className='btn btn-ghost hover:bg-transparent '>  <LuLogIn className=' hover:text-black  text-4xl ' /></button>
                            </div>
                        </div>
                        <div className='bg-black lg:w-6/12 w-full min-h-40 text-white lg:flex items-center justify-between p-4'>
                            <div className="">
                                <h1 className="text-xl font-bold text-white p-3 flex gap-4 items-center ">
                                    Donate Now
                                </h1>
                                <p className="">
                                    Donate now to save lives. Your blood donation provides hope and critical support for patients in need. Be a hero today.
                                </p>
                            </div>
                            <div className='w-3/12 '>
                                <button className='btn btn-ghost hover:bg-transparent '>  <BiSolidDonateHeart className=' hover:text-color-p  text-4xl ' /></button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;


{/* <div className="carousel w-full h-full lg:my-12 my-6 overflow-hidden">
<div id="slide1" className="carousel-item relative w-full">
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
        <h1 className='lg:text-5xl text-3xl font-bold text-color-text'>Donate Blood And <br /> Inspire Others.</h1>
        <button className='btn-p mt-6'>Explore</button>
    </div>
    <div className="absolute left-5 right-5 bottom-5 flex gap-4 justify-center">
        <a href="#slide3" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❮</a>
        <a href="#slide2" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❯</a>
    </div>
</div>
<div id="slide2" className="carousel-item relative w-full">
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
        <h1 className='lg:text-5xl text-3xl font-bold text-color-text'>
            Share the Gift of <br /> Life, Donate Blood
        </h1>
        <button className='btn-p mt-6'>Explore</button>
    </div>
    <div className="absolute left-5 right-5 bottom-5 flex gap-4 justify-center">
        <a href="#slide1" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❮</a>
        <a href="#slide3" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❯</a>
    </div>
</div>
<div id="slide3" className="carousel-item relative w-full h-full">
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
        <h1 className='lg:text-5xl text-3xl font-bold text-color-text'>
            Become a Lifesaver, <br /> Donate Blood
        </h1>
        <button className='btn-p mt-6'>Explore</button>
    </div>
    <div className="absolute  bottom-5 flex gap-4 right-  w-[200px]  justify-start">
        <a href="#slide2" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❮</a>
        <a href="#slide1" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❯</a>
    </div>
</div>
</div> */}