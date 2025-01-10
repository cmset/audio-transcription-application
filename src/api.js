import axios from 'axios';

const API_BASE_URL = 'https://transcript.test';

export const uploadAudio = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(`${API_BASE_URL}/transcribe/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getTranscriptionStatus = async (taskId) => {
  const response = await axios.get(`${API_BASE_URL}/status/${taskId}`);
  return response.data;
};
