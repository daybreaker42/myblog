import cloudinary from 'cloudinary';

cloudinary.v2.config({
	cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
	api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
	secure: true,
});

export const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || '');
  
    const response = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
		{
			method: 'POST', 
			body: formData,
		}
    );
  
    if (!response.ok) {
		throw new Error('이미지 업로드에 실패했습니다.');
    }
  
    const data = await response.json();
    return data.secure_url;
}; 
