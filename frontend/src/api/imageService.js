import axios from 'axios';

const REMOVE_BG_API_URL = 'https://api.remove.bg/v1.0/removebg';

/**
 * Service to remove background from an image using remove.bg API.
 * Requires VITE_REMOVE_BG_KEY in .env
 */
export const removeBackground = async (imageFile) => {
  const apiKey = import.meta.env.VITE_REMOVE_BG_KEY;
  
  if (!apiKey) {
    console.warn('REMOVE_BG_KEY is missing. Returning original file.');
    return URL.createObjectURL(imageFile);
  }

  const formData = new FormData();
  formData.append('image_file', imageFile);
  formData.append('size', 'auto');

  try {
    const response = await axios.post(REMOVE_BG_API_URL, formData, {
      headers: {
        'X-Api-Key': apiKey,
      },
      responseType: 'blob',
    });

    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};
