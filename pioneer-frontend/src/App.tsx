import { RouterProvider } from "react-router"
import router from './routes/Routes';
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { color: "var(--main-color)", fontFamily: "var(--sora)"}}}/>
        <RouterProvider router={router}/>
    </>
  )
}
