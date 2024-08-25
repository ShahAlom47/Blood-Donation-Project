import { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { BsPlayBtnFill } from 'react-icons/bs';
import ModalVideo from 'react-modal-video';
// eslint-disable-next-line react/prop-types
const VideoModal = ({title}) => {

    
    const [isOpenModal, setOpenModal] = useState(false)


    return (
        <div>
            <div className='flex gap-3 items-center'>
                <Zoom>
                    <button onClick={() => setOpenModal(!isOpenModal)} className='zoom-btn hover:bg-transparent hover:border border-black text-color-p text-5xl'>
                        <BsPlayBtnFill />
                    </button>
                </Zoom>
                <p className='lg:text-3xl md:text-3xl text-xl'>{title}</p>
            </div>
               <ModalVideo
                    channel='youtube'
                    isOpen={isOpenModal}
                    videoId='YHxdhI5ZrHc'
                    onClose={() => setOpenModal(false)}
                />

        </div>
    );
};

export default VideoModal;