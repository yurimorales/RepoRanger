import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const importRepositories = async (file: File) => {
  const formData = new FormData();
  formData.append("filename", file);

  const response = await axios.post(`${API_URL}/import`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const fetchImportedRepositories = async () => {
  const response = await axios.get(`${API_URL}/repositories`);
  return response.data;
};
