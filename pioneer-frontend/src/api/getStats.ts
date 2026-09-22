import axios from "axios";

export async function getStats() {

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/report/stats`, { withCredentials: true });

    return response.data;
}