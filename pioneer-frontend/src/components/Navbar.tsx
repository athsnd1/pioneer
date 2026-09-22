import { useAuth } from "../hooks/useAuth";
import { NavLink } from "react-router";
import type { IconObj } from "../types/iconObj";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { HiEllipsisVertical } from "react-icons/hi2";
import Menu from "./Menu";
import { useState } from "react";

interface Props {
  icons?: IconObj[];
}

export default function Navbar({ icons = [] }: Props) {

  const { user } = useAuth();

  const [menuShowing, setMenuShowing] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 z-50 w-screen py-4 px-3 border-b border-gray-300 flex items-center bg-white">

        <div className="text-2xl font-[family-name:var(--bric)] font-medium text-[var(--main-color)] flex items-center gap-0.5">
          <HiOutlineClipboardDocumentCheck className="text-3xl"/>

          <span className={`${!user ? "block" : "hidden"} sm:block`}> Pioneer</span>
         
        </div>

        { user && 
          <div className="ml-auto mr-2 flex items-center gap-1 sm:gap-4">

            { icons.map(({ label, icon: Icon, link }, index) => (
              
              <NavLink key={index} to={ link ? link : "/" } 
              className={({ isActive }) => `h-max flex flex-col gap-0.5 items-center hover:opacity-75 
              hover:scale-95 transition cursor-pointer px-1.5 py-1 ${isActive ? "bg-[var(--main-color)] rounded-md text-white" : ""}`} >

                {({ isActive }) => (
                  <>
                    <Icon className={`text-lg mt-0.25 ${isActive ? "text-white" : "var(--main-color)"}`} 
                    style={{  color: isActive ? "white" :  "var(--main-color)" }}/>

                    <label className={` text-xs text-[var(--main-color)] font-[family-name:var(--sora)] font-medium cursor-pointer ${isActive ? "text-white" : "var(--main-color)"}`} style={{
                      color: isActive ? "white" : "var(--main-color)"}}>
                      {label}
                    </label>
                  </>
                )}
                
              </NavLink>

            )) }

            <button className="flex flex-col items-center gap-0.5 cursor-pointer hover:opacity-75 
              hover:scale-95 transition-all ml-0.5 mr-2" onClick={() => {setMenuShowing(!menuShowing)}}>
              <HiEllipsisVertical /> <span className="text-xs text-[var(--main-color)] font-[family-name:var(--sora)] font-medium cursor-pointer">More</span>
            </button>

          </div>
        }

        { menuShowing && <Menu closeMenu={() => setMenuShowing(false)}/> }

    </nav>
  )
}
