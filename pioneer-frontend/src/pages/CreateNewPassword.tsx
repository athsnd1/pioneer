import { useEffect, useState } from "react"
import PasswordField from "../components/PasswordField";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export default function CreateNewPassword() {

    const [pass, setPass] = useState<string>("");
    const [mainPass, setMainPass] = useState<string>("");
    const [notMatching, setNotMatching] = useState<boolean>(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    useEffect(() => {

        const setPassword = () => {
            if (pass !== mainPass) {
                setNotMatching(true);
            } else {
                setNotMatching(false);
            }
        };

        setPassword();

    }, [pass, mainPass]);

    const passwordMutation = useMutation({
        mutationFn: async () => {
            console.log("Token: ", token);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/reset-password`, { token, password: mainPass });
            return response.data;
        }, 
        onSuccess: () => {
            toast.success("Password update successfully");
            navigate("/login");
        },
        onError: (error) => {
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
    })

    async function saveNewPassword (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        passwordMutation.mutate();
    }

  return (
    <div className="w-screen h-dvh flex flex-col items-center justify-center">
        <Navbar />

        <div className="text-2xl font-bric text-main mt-15 mb-10">Create a New Password</div>

        <form onSubmit={saveNewPassword} className="flex flex-col items-start gap-6">
            <div className="flex flex-col items-start gap-0.5">
                <div className="font-sora text-blue text-md">New Password</div>
                <PasswordField onChange={(password) => {setPass(password)}}/>
            </div>

            <div className="flex flex-col items-start gap-0.5">
                <div className="font-sora text-blue text-md">Confirm Password</div>
                <PasswordField onChange={(password) => {setMainPass(password)}}/>
            </div>

            { notMatching && <div className="font-sora text-red-700 text-md text-left mt-1">Passwords must match </div>}

            <button type="submit" disabled={passwordMutation.isPending} className={`bg-main text-white border-0 rounded-full p-2 px-4 h-15 max-w-50 flex items-center justify-center self-center font-bric ${passwordMutation.isPending ? "cursor-not-allowed" : "cursor-pointer"} hover:opacity-85 transition-opacity`}>{ passwordMutation.isPending ? "Saving New Password..." : "Save New Password"}</button>
        </form>

        <Footer />

    </div>
  )
}
