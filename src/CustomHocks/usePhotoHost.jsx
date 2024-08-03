import axios from "axios";




const usePhotoHost = () => {
    


    const handelHost = async (imageFile) => {
        const formData = new FormData();
    formData.append('file', imageFile);
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
    
      return res.data
    
    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error.message);
    }
    }
    return {handelHost}
};

export default usePhotoHost;