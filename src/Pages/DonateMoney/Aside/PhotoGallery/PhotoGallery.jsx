import { useState } from "react";
import Gallery from "react-photo-gallery";
import { motion, AnimatePresence } from "framer-motion";
import "react-image-lightbox/style.css";
import ReactModal from "../../../../Components/Modal/ReactModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const photos = [
   
  
    {
        src: "https://ntrtrust.org/wp-content/uploads/2022/03/275928051_1960786190796304_153000678166209493_n-1024x768.jpg",
        width: 2,
        height: 4,
        title: "Blood Donation Camp",
        description: "Our latest blood donation camp helped over 100 people in need."
    },
    {
        src: "https://jghdelhi.net/wp-content/uploads/2021/08/WhatsApp-Image-2021-08-12-at-3.42.07-PM-1-1568x883.jpeg",
        width: 3,
        height: 4,
        title: "Blood Donation Camp",
        description: "Our latest blood donation camp helped over 100 people in need."
    },
    {
        src: "https://thecsrjournal.in/wp-content/uploads/2019/04/Amway-Health-Camp.jpg",
        width: 3,
        height: 4,
        title: "Blood Donation Camp",
        description: "Our latest blood donation camp helped over 100 people in need."
    },
    {
        src: "https://www.manuski.in/wp-content/uploads/2021/04/Free-Blood-Test-Camp-Haryana02.jpg",
        width: 2,
        height: 4,
        title: "Health Check-Up Campaign",
        description: "We organized a free health check-up campaign for the local community."
    },

];

const PhotoGallery = () => {
    const [openModal, setOpenModal] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const openLightbox = (event, { index }) => {
        setPhotoIndex(index);
        setOpenModal(true);
    };
console.log(photoIndex);
    const nextSlide = () => {
        setPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const prevSlide = () => {
        setPhotoIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
    };

    return (
        <div className="p-3 m-3 bg-gray-500 bg-opacity-10 mb-0">
            <h2 className="text-2xl font-bold text-center mb-4">
                Our Latest Work
            </h2>

          
            <Gallery photos={photos} onClick={openLightbox} />

            
            <ReactModal label={'photoGalleryModal'} openModal={openModal} setOpenModal={setOpenModal}>
                <div className="relative flex flex-col justify-center items-center">
                    <button className="absolute left-0 z-10 p-2 text-4xl hover:bg-slate-300 rounded-full text-color-p " onClick={prevSlide}>
                    <IoIosArrowBack />

                    </button>

                    <div className="relative w-full h-full flex flex-col items-center">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.img
                                key={photoIndex}
                                src={photos[photoIndex].src}
                                alt={photos[photoIndex].title}
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="max-w-full max-h-[80vh] object-contain"
                            />
                        </AnimatePresence>

                        {/* Photo Details */}
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-bold">{photos[photoIndex].title}</h3>
                            <p className="mt-2 text-sm">{photos[photoIndex].description}</p>
                        </div>
                    </div>

                    <button className="absolute right-0 z-10 p-2  text-color-p text-4xl hover:bg-slate-300 rounded-full" onClick={nextSlide}>
                    <IoIosArrowForward />
                    </button>
                </div>
            </ReactModal>
        </div>
    );
};

export default PhotoGallery;
