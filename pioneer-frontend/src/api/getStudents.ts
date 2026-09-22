import axios from "axios";

export async function getStudents() {
    
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/students/all`, { withCredentials: true });

    return response.data.students;
}