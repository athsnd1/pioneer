import { Outlet, useNavigation, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import {  BiHome } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { TbListCheck } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
import Loading from "#components/Loading";


export default function DashboardLayout() {

  const navigation = useNavigation();
  const location = useLocation();

  const icons = [
    { label: "Home", icon: BiHome, link: "/" },
    { label: "Logs", icon: TbListCheck, link: "logs" },
    { label: "Add", icon: CgAdd, link: "create" },
  ]

  if (navigation.state === "loading") {
      return (
        <Loading />
      )
  }

  return (
    <div>
        <Navbar icons={icons}/>
        <AnimatePresence mode="wait">
          <motion.div key={ location.pathname } initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
    </div>
  )
}
