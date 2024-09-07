
import Swal from 'sweetalert2';
import useAxios from '../../../../CustomHocks/useAxiosSecure';
import usePhotoHost from '../../../../CustomHocks/usePhotoHost';
import useUser from '../../../../CustomHocks/useUser';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Loader from 'react-js-loader';

const PhotoForm = ({closeModal}) => {
  const { handelHost } = usePhotoHost()
  const AxiosSecure=useAxios()
  const {user,setReLoad}=useUser()
  const [photoLoading,setPhotoLoading]=useState(false)

  const handlePhotoForm = async (e) => {
    setPhotoLoading(true)
    e.preventDefault();
    const photo = e.target.photo.files[0];

    if (!photo) {
      console.error('No file selected');
      return;
    }
    const photoResult = await handelHost(photo)
  
    if(photoResult.url){
      const updateProfilePhoto=await AxiosSecure.patch(`/user/updateUserProfilePhoto/${user.email}`,{photoURL:photoResult.url})
      console.log(updateProfilePhoto);
     if(updateProfilePhoto?.data?.matchedCount>0){
      setPhotoLoading(false)
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
        <button className="btn btn-neutral w-full" type="submit">
        {
          photoLoading?<Loader  type='bubble-scale' bgColor={'#ffff'}  size={40} />:  '  Upload'
        }
          </button>
      </form>
    </div>
  );
};

export default PhotoForm;
PhotoForm.propTypes = {
  closeModal: PropTypes.func
};


