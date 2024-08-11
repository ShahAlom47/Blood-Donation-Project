
import Swal from 'sweetalert2';
import useAxios from '../../../../CustomHocks/useAxiosSecure';
import usePhotoHost from '../../../../CustomHocks/usePhotoHost';
import useUser from '../../../../CustomHocks/useUser';
import PropTypes from 'prop-types';

const PhotoForm = ({closeModal}) => {
  const { handelHost } = usePhotoHost()
  const AxiosSecure=useAxios()
  const {user,setReLoad}=useUser()

  const handlePhotoForm = async (e) => {
    e.preventDefault();
    const photo = e.target.photo.files[0];

    if (!photo) {
      console.error('No file selected');
      return;
    }
    const photoResult = await handelHost(photo)
    if(photoResult.url){
      const updateProfilePhoto=await AxiosSecure.patch(`/user/updateUserProfilePhoto/${user.email}`,{photoURL:photoResult.url})
     if(updateProfilePhoto?.data?.matchedCount>0){
      Swal.fire('Completed')
      e.target.reset();
      closeModal();
      setReLoad(true)

     }
    
    }
  

  };

  return (
    <div>
      <form className="space-y-3" onSubmit={handlePhotoForm}>
        <input className="input input-bordered flex items-center w-full" type="file" name="photo" />
        <input className="btn btn-neutral w-full" type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default PhotoForm;
PhotoForm.propTypes = {
  closeModal: PropTypes.func
};
