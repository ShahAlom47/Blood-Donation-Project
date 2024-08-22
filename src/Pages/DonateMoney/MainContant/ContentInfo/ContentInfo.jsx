import { useState } from "react";
import ModalVideo from "../../../../SharedComponent/ModalVideo";
import { Zoom } from "react-awesome-reveal";
import { BsPlayBtnFill } from "react-icons/bs";


const ContentInfo = () => {
    const [isOpenModal, setOpenModal] = useState(false)


    return (
        <div>
            <div className='flex gap-3 items-center'>
                <Zoom>
                    <button onClick={() => setOpenModal(true)} className='zoom-btn hover:bg-transparent text-color-p text-5xl'>
                        <BsPlayBtnFill />
                    </button>
                </Zoom>
                <p className='text-3xl'>Intro Video</p>
                <ModalVideo isOpenModal={isOpenModal} setOpenModal={setOpenModal} videoId={'YHxdhI5ZrHc'} ></ModalVideo>
            </div>
            <h1 className="text-2xl mb-4 font-bold">Support Our Lifesaving Efforts and Make a Difference</h1>
            <p className="">Your generous donations are the driving force behind our lifesaving efforts. Every contribution helps us organize critical blood donation camps, conduct health checkup campaigns, and extend essential services to those in need. With your support, we can continue to ensure that no one is left without the care they deserve. Whether it`s providing blood to save lives or offering medical aid to the underprivileged, your donations enable us to create real, lasting change in our community. Stand with us in this vital cause and be a part of something truly meaningful</p>

        </div>
    );
};

export default ContentInfo;