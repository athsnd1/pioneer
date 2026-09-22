import toast from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";


export default function ProvideEmail() {

    const [email, setEmail] = useState<string>("");

    const navigate = useNavigate();

    async function sendEmail (e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        if (!email) return;

        try {
            
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`, { email });
            console.log(response);
            if (!response) return;

            toast.success("Email sent successfully. Check you mail to update your password");

            navigate("/reset-password");

        } catch (error) {
            
            if(axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                console.error(error.response?.data.message)
            } else if (error instanceof Error) {
                toast.error(error.message);
                console.error(error.message)
            } else {
                toast.error("An unexpected error occurred");
            }
        }

    }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-dvh">

        <Navbar />

        <div className="max-w-120 text-3xl font-bric text-main text-center mt-15">Enter the email associated with your account to create a new password</div>

        <form onSubmit={sendEmail} className="flex flex-col items-center justify-center">
            <input type="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your email" className="max-w-80 h-12 p-2 rounded-md outline-0 border-1 border-gray-400 hover:border-main focus:border-main font-sora text-lg text-main bg-white mt-10" required/>

            <button type="submit" className="mt-10 border-0 bg-main text-white cursor-pointer hover:opacity-85 rounded-full p-2 text-xl font-bric flex items-center justify-center w-50 h-15">Send Email</button>
        </form>

        <Footer />
    </div>
  )
}
