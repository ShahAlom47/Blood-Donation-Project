import axios from 'axios';

const PhotoForm = () => {
  const handlePhotoForm = async (e) => {
    e.preventDefault();
    const photo = e.target.photo.files[0];

    if (!photo) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', 'red_love_blood_donation_img'); // আপলোড প্রিসেট সঠিক কিনা নিশ্চিত করুন

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dezv4qhaf/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error.message);
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
