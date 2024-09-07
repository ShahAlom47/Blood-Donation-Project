import axios from "axios";




const usePhotoHost = () => {
    


  const handelHost = async (imageFile) => {
    const maxSizeInMB = 5; // 5MB সীমা ধরলাম
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (imageFile.size / 1024 / 1024 > maxSizeInMB) {
        console.error('Image size exceeds limit.');
        return { error: 'Image size exceeds limit.' };
    }

    if (!allowedTypes.includes(imageFile.type)) {
        console.error('Unsupported image type.');
        return { error: 'Unsupported image type.' };
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'red_love_blood_donation_img');

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

        return res.data;
    } catch (error) {
        console.error('Error uploading image:', error.response?.data || error.message);
        return { error: 'Image upload failed.' };
    }
};


    return {handelHost}
};

export default usePhotoHost;