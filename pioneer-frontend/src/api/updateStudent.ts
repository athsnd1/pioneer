import axios from "axios";
import type { Student } from '@/types/Student';

type Props = {
  studentId: string;
  studentData: Student;
};

export async function updateStudent ({ studentData, studentId}: Props) {

    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/students/edit/${studentId}`, studentData, { withCredentials: true });

    return response.data.student;

};