import { HiOutlineChatBubbleLeft, HiXMark } from "react-icons/hi2";
import type { Student } from "@/types/Student";
import { BsHouseDoor } from 'react-icons/bs';
import { TbAddressBook } from 'react-icons/tb';
import { BiPhoneCall } from 'react-icons/bi';

type Props = {
    onClose: () => void;
    student: Student | null;
}

export default function StudentInfoModal({ student, onClose }: Props) {



  return (
    <div className="fixed bg-black/10 backdrop-blur-sm top-0 bottom-0 left-0 right-0">

        <div className="h-max max-h-200 w-full max-w-75 sm:max-w-sm rounded-xl border-1 border-gray-400 shadow-sm fixed top-1/2 left-1/2 -translate-1/2 bg-white">
            <div className="flex items-center justify-between p-3 border-b-1 border-gray-400">
                <div className="text-lg text-main font-[family-name:var(--bric)] font-medium">Student Information</div>
                <div className="hover:bg-gray-100 hover:scale-95 p-1 cursor-pointer transition-all rounded-md" onClick={onClose}>
                    <HiXMark className="text-xl text-blue"/>
                </div>
            </div>

            <div className="flex flex-col gap-2 p-3 overflow-y-auto">

                <div className="w-full flex items-center justify-between">

                    <div className="flex items-center gap-1">
                        <TbAddressBook className="text-lg text-orange-500"/>
                        <span className="text-md font-sora text-orange-700 whitespace-nowrap">Name</span>
                    </div>

                    <hr className="border-gray-400 w-full mx-4"/>

                    <span className="text-md text-orange-700 font-bric whitespace-nowrap">{student!.name.length > 15 ? student!.name.slice(0, 14) + "..." : student!.name ?? "Name not found"}</span>

                </div>

                <div className="w-full flex items-center justify-between">

                    <div className="flex items-center gap-1">
                        <BsHouseDoor className="text-lg text-emerald-500"/>
                        <span className="text-md font-sora text-emerald-700 whitespace-nowrap">Address</span>
                    </div>

                    <hr className="border-gray-400 w-full mx-4"/>

                    <span className="text-md text-emerald-700 font-bric whitespace-nowrap">{student!.address.length > 15 ? student!.address.slice(0, 14) + "..." : student!.address ?? "Address not found"}</span>

                </div>

                <div className="w-full flex items-center justify-between">

                    <div className="flex items-center gap-1">
                        <BiPhoneCall className="text-lg text-indigo-500"/>
                        <span className="text-md font-sora text-indigo-700 whitespace-nowrap">Number</span>
                    </div>

                    <hr className="border-gray-400 w-full mx-4"/>

                    <span className="text-md text-indigo-700 font-bric whitespace-nowrap">{student?.phone}</span>

                </div>

                <div className="w-full flex flex-col gap-1 items-start">

                    <div className="flex items-center gap-1">
                        <HiOutlineChatBubbleLeft className="text-lg text-orange-500"/>
                        <span className="text-md font-sora text-orange-600">Details:</span>
                        {/* <hr className="border-gray-400 w-full mx-4"/> */}
                    </div>

                    <span className="text-sm text-blue font-sora">{student?.details}</span>

                </div>

            </div>

        </div>

    </div>
  )
}
