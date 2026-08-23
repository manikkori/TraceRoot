import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const investigateBug = async (repoUrl, errorLog) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/investigate`, {
      repoUrl,
      errorLog,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error || "Backend failed to process request",
      );
    }
    throw new Error("Network error. Is the backend running?");
  }
};
