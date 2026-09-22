import { BsPeople, BsPlusCircle } from "react-icons/bs";
import { HiOutlineCalendarDays, HiXMark } from "react-icons/hi2";
import { CgChevronRight } from "react-icons/cg";
import { TbArrowRightFromArc } from "react-icons/tb";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

type Props = {
    closeMenu: () => void;
}

export default function Menu({ closeMenu }: Props) {

    const { logout } = useAuth();

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const navigate = useNavigate();

    const [logoutPressed, setLogoutPressed] = useState<boolean>(false);

  return (
    <div className="bg-white border-1 border-gray-300 rounded-lg shadow-sm w-[200px] h-max fixed top-18 right-1 text-sm transition-all">

        <div className="flex items-center justify-between w-full border-b-1 border-gray-300 py-2 pl-4 pr-4">
            <div className="text-blue font-sora text-md  ">More Actions</div>
            <HiXMark className="hover:bg-gray-100 hover:scale-95 cursor-pointer rounded-md transition-all w-[32px] h-[32px] p-2" onClick={closeMenu}/>
        </div>

        <div className="flex flex-col items-start gap-0.5 text-sm w-full">

            <div className="flex flex-col items-start  w-full cursor-pointer pl-4 pt-2.5 pb-2 pr-4 hover:bg-gray-50">

                <div className="flex items-center gap-1 justify-between w-full pr-2.25 text-blue-500 transition-all" 
                onClick={() => { setCollapsed(!collapsed); }}> 
                    <BsPeople /> 
                    <span>Students</span> 
                    <CgChevronRight className={`ml-auto ${collapsed ? "rotate-90" : ""} transition-all -mt-0.5 text-black`}/> 
                </div> 

                { collapsed && 
                <div className="relative before:absolute before-content-[''] before:h-full before:w-[1px] before:bg-gray-300 before:-left-2 ml-4 flex flex-col items-start pt-1.5 transition-all">

                    <div className="flex items-center gap-1 text-sm hover:bg-gray-100 p-2 rounded-lg text-emerald-600" onClick={() => { navigate("/add-student"); closeMenu(); }}> <BsPlusCircle /> <span>Add Student</span> </div>

                    <div className="flex items-center gap-1 text-sm hover:bg-gray-100 p-2 rounded-lg text-violet-600" onClick={() => { navigate("/students"); closeMenu();}}> <FiEye /> <span>View Students</span> </div>
                </div>}

            </div>

            <div className="flex items-center gap-1 cursor-pointer pl-4 pb-2 pt-2 border-b-1 w-full border-gray-300 hover:bg-gray-50 transition-all text-amber-600" onClick={() => { navigate("/monthly-stats"); closeMenu(); }}> <HiOutlineCalendarDays /> <span>Monthly Stats</span> </div>
        </div>

        <div className="text-red-700 text-sm flex items-center gap-1 font-sora p-4 pl-4 cursor-pointer rounded-b-lg hover:bg-red-50 transition-all" onClick={() => { setLogoutPressed(true) }}>
            <TbArrowRightFromArc className="rotate-180"/> <span>Leave</span>
        </div>

        { logoutPressed && <ConfirmDeleteModal onClose={() => { setLogoutPressed(false)}} onRemoveReport={() => { logout(); navigate("/login"); closeMenu();}} text="Are you sure you want to sign out?" btnText="Sign Out"/> }

    </div>
  )
}
