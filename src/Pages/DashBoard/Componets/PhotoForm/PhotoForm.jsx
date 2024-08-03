
import usePhotoHost from '../../../../CustomHocks/usePhotoHost';

const PhotoForm = () => {
  const { handelHost } = usePhotoHost()

  const handlePhotoForm = async (e) => {
    e.preventDefault();
    const photo = e.target.photo.files[0];

    if (!photo) {
      console.error('No file selected');
      return;
    }
    const photoResult = await handelHost(photo)
    if(photoResult.url){
      console.log(photoResult.url);
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
