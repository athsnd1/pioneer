import type { Report } from "../types/Report";
import axios from "axios";

export async function getReports(): Promise<Report[]> {

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/report/`, { withCredentials: true });

    return response.data.reports;
}