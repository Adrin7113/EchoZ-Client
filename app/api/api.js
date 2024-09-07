import axios from "axios";

const API_URL = "http://192.168.1.92:8000";

const genereate_music = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/generate`, {
      prompt: data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { genereate_music };
