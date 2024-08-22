
const ModalVideo = ({isOpenModal,setOpenModal,videoId}) => {
    return (
        <div>

           

               {/* Modal */}
               <ModalVideo
                    channel='youtube'
                    isOpenModal={isOpenModal}
                    videoId={videoId}
                    onClose={() => setOpenModal(false)}
                />

        </div>
    );
};

export default ModalVideo;