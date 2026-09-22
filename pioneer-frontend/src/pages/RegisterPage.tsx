import { Link, useNavigate, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "motion/react";

type Details = {
  email: string;
  password: string;
}

export default function RegisterPage() {

  const [userDetails, setUserDetails] = useState<Details>({ email: "", password: ""});

  const [passShowing, setPassShowing] = useState<boolean>(false);

  const [passwordMust, setPasswordMust] = useState<string>("");
  const [emailMust, setEmailMust] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!userDetails.email || !userDetails.password) {
      toast.error("Inputs cannot be empty")
      return;
    }

    const regUrl = `${import.meta.env.VITE_BACKEND_URL}/auth/register`;

    setLoading(true);
    
    try {
      
      const response = await axios.post(regUrl, userDetails);

      if(!response) {
        throw new Error("Failed to log in");
      }

      setLoading(false);

      toast.success("Account successfully created");

      navigate("/login");

    } catch (error) {

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }

      setLoading(false);

    }

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

    const { name, value } = e.target;

    if (name === "email") {

      if (!/[@]/.test(value)) {

        e.target.style.borderColor = "red";
        setEmailMust("Please enter a valid email address");

      } else {
        setEmailMust("");

        e.target.style.borderColor = "var(--main-color)";

      }
    } else if (name === "password") {
      const parent = e.target.parentElement;
      if (value.length < 8) {

        if (!parent) return

        parent.style.borderColor = "red";
        setPasswordMust("Password must be at least 8 characters long");

      } else if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {

        if (!parent) return

        parent.style.borderColor = "red";
        setPasswordMust("Password must contain at least one uppercase letter, one lowercase letter, and one number");

      } else {

        if (!parent) return

        parent.style.borderColor = "var(--main-color)";
        setPasswordMust("");

      }
    }

  }

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

    const { name, value } = event.target;

    setUserDetails(prevDetails => ({...prevDetails, [name]: value}));

    handleInputChange(event);

  }


  return (
    <AnimatePresence mode="wait">
      <motion.div key={ location.pathname } initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: "easeInOut" }}
       className="min-h-dvh flex flex-col bg-gray-100">

      <Helmet>

        <title>Pioneer | Sign Up</title>

        <meta name="description" content="Get started with Pioneer by creating an account" />

        <link rel="canonical" href="actual home page link" />

      </Helmet>

      <Navbar />

      <div className="text-[var(--deep-blue)] text-2xl font-[family-name:var(--sora)] flex items-center justify-center mt-15">
        Create an Account
      </div>

      <form onSubmit={handleRegisterSubmit} className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">

        <div className="flex flex-col justify-center gap-0.5 mt-10 min-w-70">

          <label htmlFor="email-input" className="font-[family-name:var(--sora)] text-[var(--deep-blue)]">Email</label>

          <input name="email" id="email-input" value={userDetails.email} type="email" onChange={handleLoginChange} tabIndex={0} className="p-4 outline-0 border border-gray-500 hover:border-[var(--main-color)] focus:border-[var(--main-color)] rounded-md w-full h-10 bg-white font-[family-name:var(--sora)]" placeholder="johndoe@email.com" autoComplete="email" required/>

          { emailMust && <div className="text-red-500 text-sm mt-1">{emailMust}</div> }

        </div>

        <div className="flex flex-col justify-center gap-0.5 mt-10 w-70">

          <label htmlFor="pass-input" className="font-[family-name:var(--sora)] text-[var(--deep-blue)]">Password</label>

          <div className="flex items-center justify-between gap-0.5 px-2 w-full outline-0 border border-gray-500 hover:border-[var(--main-color)] bg-white h-max rounded-md focus-within:border-[var(--main-color)] ">

            <input name="password" id="pass-input" value={userDetails.password} type={passShowing ? "text" : "password"} onChange={handleLoginChange} tabIndex={0} className=" outline-0 border-0  rounded-md w-full h-10 bg-white font-[family-name:var(--sora)]" placeholder="*********" autoComplete="new-password"/>

            {passShowing ? <FiEye className="text-[var(--main-color)] cursor-pointer transition" onClick={() => {setPassShowing(!passShowing)}}/> : <FiEyeOff className="text-[var(--main-color)] cursor-pointer transition" onClick={() => {setPassShowing((prev) => !prev)}}/>}

          </div>

          { passwordMust && <div className="text-red-500 text-sm mt-1">{passwordMust}</div> }
          

        </div>

        <button type="submit" disabled={loading} className={`flex items-center justify-center rounded-4xl mt-10 min-w-70 h-15 bg-[var(--main-color)] text-white font-[family-name:var(--sora)] hover:opacity-75 transition ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}>{ loading ? "Creating Account..." : "Create Account"}</button>

      </form>

      <div className="mt-5 text-sm font-[family-name:var(--sora)] flex items-center justify-center">
        Already have an account? <Link to="/login" className="text-md text-[var(--main-color)] font-semibold hover:opacity-75 transition cursor-pointer"> &nbsp; Login</Link>
      </div>

      <Footer />
        
    </motion.div>
    </AnimatePresence>
  )
}
