import { Link, useNavigate, useNavigation, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "motion/react";

type Details = {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {

  const [userDetails, setUserDetails] = useState<Details>({ email: "", password: "", rememberMe: false });

  const [loading, setLoading] = useState<boolean>(false);

  const [passShowing, setPassShowing] = useState<boolean>(false);

  const { login } = useAuth();

  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setUserDetails(prevDetails => ({...prevDetails, [name]: value}));

  }

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!userDetails.email || !userDetails.password) {
      toast.error("Inputs cannot be empty")
      return;
    }

    const loginUrl = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;

    setLoading(true);
    
    try {
      
      const response = await axios.post(loginUrl, userDetails, {
        withCredentials: true
      });

      if(!response) {
        throw new Error("Failed to log in");
      }

      login({ id: response.data?.id, email: response.data?.email });

      setLoading(false);

      navigate("/dashboard");
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }

      console.error(error);

      setLoading(false);
    }

  }

  if (navigation.state === "loading") {
    return (
      <Loading />
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: "easeInOut" }} 
      key={location.pathname} className="min-h-dvh flex flex-col bg-gray-100">

      <Helmet>

        <title>Pioneer | Login</title>

        <meta name="description" content="Sign in to continue using Pioneer" />

        <link rel="canonical" href="actual home page link" />

      </Helmet>

      <Navbar />

      <div className="text-[var(--deep-blue)] text-2xl font-[family-name:var(--sora)] flex items-center justify-center mt-15">
        Login to Continue
      </div>

      <form onSubmit={handleLoginSubmit} className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      
              <div className="flex flex-col justify-center gap-0.5 mt-10 min-w-70">
      
                <label htmlFor="email-input" className="font-[family-name:var(--sora)] text-[var(--deep-blue)]">Email</label>
      
                <input name="email" id="email-input" value={userDetails.email} type="email" onChange={handleLoginChange} tabIndex={0} className="p-4 outline-0 border border-gray-500 hover:border-[var(--main-color)] focus:border-[var(--main-color)] rounded-md w-full h-10 bg-white font-[family-name:var(--sora)]" placeholder="johndoe@email.com" autoComplete="email" required/>
      
              </div>
      
              <div className="flex flex-col justify-center gap-0.5 mt-10 min-w-70">
      
                <label htmlFor="pass-input" className="font-[family-name:var(--sora)] text-[var(--deep-blue)]">Password</label>
      
                <div className="flex items-center justify-between gap-0.5 px-2 w-full outline-0 border border-gray-500 hover:border-[var(--main-color)] focus-within:border-[var(--main-color)] bg-white h-max rounded-md">
      
                  <input name="password" id="pass-input" value={userDetails.password} type={passShowing ? "text" : "password"} onChange={handleLoginChange} tabIndex={0} className=" outline-0 border-0  rounded-md w-full h-10 bg-white font-[family-name:var(--sora)]" placeholder="*********" autoComplete="current-password"/>
      
                  {passShowing ? <FiEye className="text-[var(--main-color)] cursor-pointer transition" onClick={() => {setPassShowing(!passShowing)}}/> : <FiEyeOff className="text-[var(--main-color)] cursor-pointer transition" onClick={() => {setPassShowing((prev) => !prev)}}/>}
      
                </div>
                
      
              </div>

              <div className="flex items-center justify-between gap-6 mt-3">
                <div className="text-sm font-[family-name:var(--sora)] flex items-center gap-1">
                  <input type="checkbox" id="remember-me" name="rememberMe" checked={userDetails.rememberMe} className="accent-[var(--main-color)] cursor-pointer" onChange={() => {setUserDetails((prev) => ({...prev, rememberMe: !prev.rememberMe}))}}/>
                  <label htmlFor="remember-me" className="text-md font-medium ml-0.5 font-[family-name:var(--sora)] text-[var(--deep-blue)]">Remember Me</label>
                </div>

                {/* <Link to="/forgot-password" className="text-blue font-sora hover:underline hover:underline-offset-2 hover:underline-blue text-sm font-medium">Forgot Password?</Link> */}
              </div>
      
              <button type="submit" disabled={loading} className={`flex items-center justify-center rounded-4xl mt-10 min-w-70 h-15 bg-[var(--main-color)] text-white font-[family-name:var(--sora)] hover:opacity-75 transition ${ loading ? "cursor-not-allowed" : "cursor-pointer"}`}>{ loading ? "Logging in..." : "Sign In"}</button>
      
            </form>

      <div className="mt-5 text-sm font-[family-name:var(--sora)] flex items-center justify-center">
        Don't have an account? <Link to="/register" className="text-md text-[var(--main-color)] font-semibold hover:opacity-75 transition cursor-pointer"> &nbsp; Register</Link>
      </div>

      <Footer />
        
    </motion.div>
    </AnimatePresence>
  )
}
