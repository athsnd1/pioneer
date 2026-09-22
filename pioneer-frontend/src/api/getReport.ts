import axios from "axios";

export async function getReport (id: string) {
    
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/report/edit/${id}`, { withCredentials: true });

    return response.data.report;
}