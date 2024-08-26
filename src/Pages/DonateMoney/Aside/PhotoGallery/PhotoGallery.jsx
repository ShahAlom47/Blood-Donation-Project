import { useState } from "react";
import Gallery from "react-photo-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ReactModal from "../../../../Components/Modal/ReactModal";

const photos = [
    {
        src: "https://via.placeholder.com/600x400",
        width: 4,
        height: 3,
        title: "Blood Donation Camp",
        description: "Our latest blood donation camp helped over 100 people in need."
    },
    {
        src: "https://via.placeholder.com/400x600",
        width: 3,
        height: 4,
        title: "Health Check-Up Campaign",
        description: "We organized a free health check-up campaign for the local community."
    }
];

const PhotoGallery = () => {

    const [openModal, setOpenModal] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const openLightbox = (event, { photo, index }) => {
        setPhotoIndex(index);
        setOpenModal(true);
        console.log(photo);

    };

    return (
        <div className=" p-3 m-3 mb-0">

            <h2 className="text-2xl font-bold text-center mb-4">
                Our Latest Work
            </h2>


            {/* Image Gallery */}
            <Gallery photos={photos} onClick={openLightbox} />

            {/* Modal */}

            <ReactModal label={'photoGalleryModal'} openModal={openModal} setOpenModal={setOpenModal}>
                slied here 

            </ReactModal>

        </div>
    );
};

export default PhotoGallery;
