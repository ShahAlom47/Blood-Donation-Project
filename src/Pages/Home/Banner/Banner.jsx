import banner from '../../../assets/banner/banner.jpg';
import { BsPlayBtnFill } from 'react-icons/bs';
import { Zoom } from 'react-awesome-reveal';

const Banner = () => {
    return (
        <div className="lg:min-h-[500px] min-h-[400px] relative bg-cover" style={{ backgroundImage: `url(${banner})` }}>
            <div className="h-full absolute inset-0 bg-gradient-to-r from-white to-transparent p-8">
                <div className='max-w flex items-center relative h-full'>
                    <div className="carousel w-full h-full lg:my-12 my-6 overflow-hidden">
                        <div id="slide1" className="carousel-item relative h-full w-full">
                            <div className='flex flex-col justify-center items-start h-full pl-8 mb-1 w-full space-y-3'>
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
                            <div className="absolute left-5 right-1 bottom-0 flex gap-4 lg:justify-center md:justify-center justify-end">
                                <a href="#slide3" className="btn btn-circle  bg-color-p border-none text-white hover:bg-black">❮</a>
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
                            <div className="absolute left-5 right-1 bottom-0 flex gap-4 lg:justify-center md:justify-center justify-end">
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
                            <div className="absolute left-5 right-1 bottom-0 flex gap-4 lg:justify-center md:justify-center justify-end">
                                <a href="#slide2" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❮</a>
                                <a href="#slide1" className="btn btn-circle bg-color-p border-none text-white hover:bg-black">❯</a>
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