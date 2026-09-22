import { HiOutlineCalendarDays, HiOutlineChatBubbleLeft, HiOutlinePlayCircle, HiXMark } from "react-icons/hi2";
import type { Report } from "../types/Report";
import { HiOutlineBookOpen, HiOutlineClock, HiOutlineDocumentText } from "react-icons/hi";
import { BsPeople } from "react-icons/bs";
import { formatDate } from "../utils/formatDate";

type Props = {
    onClose: () => void;
    report: Report | null;
}

export default function ReportInfoModal({ report, onClose }: Props) {



  return (
    <div className="fixed bg-black/10 backdrop-blur-sm top-0 bottom-0 left-0 right-0">

        <div className="h-max max-h-200 w-full max-w-75 sm:max-w-sm rounded-xl border-1 border-gray-400 shadow-sm fixed top-1/2 left-1/2 -translate-1/2 bg-white">
            <div className="flex items-center justify-between p-3 border-b-1 border-gray-400">
                <div className="text-lg text-main font-[family-name:var(--bric)] font-medium">Report Information</div>
                <div className="hover:bg-gray-100 hover:scale-95 p-1 cursor-pointer transition-all rounded-md" onClick={onClose}>
                    <HiXMark className="text-xl text-blue"/>
                </div>
            </div>

            <div className="flex flex-col gap-2 p-3 overflow-y-auto">

                <div className="w-full flex items-center justify-between">

                    <div className="flex items-center gap-1">
                        <HiOutlineCalendarDays className="text-lg text-slate-500"/>
                        <span className="text-md font-sora text-slate-600">Date</span>
                    </div>

                    <hr className="border-gray-400 w-full mx-4"/>

                    <span className="text-sm text-center text-slate-600 font-bric">{formatDate(report!.date)}</span>

                </div>

                <div className="w-full flex items-center justify-between">

                    <div className="flex items-center gap-1">
                        <HiOutlineClock className="text-lg text-amber-500"/>
                        <span className="text-md font-sora text-amber-600">Hours</span>
                    </div>

                    <hr className="border-gray-400 w-full mx-4"/>

                    <span className="text-2xl text-amber-600 font-bric">{report!.hours}</span>

                </div>

                <div className="w-full flex items-center justify-between">

                    <div className="flex items-center gap-1">
                        <BsPeople className="text-lg text-indigo-500"/>
                        <span className="text-md font-sora text-indigo-600">Visits</span>
                    </div>

                    <hr className="border-gray-400 w-full mx-4"/>

                    <span className="text-2xl text-indigo-600 font-bric">{report!.visits}</span>

                </div>

                <div className="w-full flex items-center justify-between">

                    <div className="flex items-center gap-1">
                        <HiOutlineBookOpen className="text-lg text-emerald-500"/>
                        <span className="text-md font-sora text-emerald-600">Studies</span>
                    </div>

                    <hr className="border-gray-400 w-full mx-4"/>

                    <span className="text-2xl text-emerald-600 font-bric">{report!.studies}</span>

                </div>

                <div className="w-full flex items-center justify-between">

                    <div className="flex items-center gap-1">
                        <HiOutlinePlayCircle className="text-lg text-sky-500"/>
                        <span className="text-md font-sora text-sky-600">Videos</span>
                    </div>

                    <hr className="border-gray-400 w-full mx-4"/>

                    <span className="text-2xl text-sky-600 font-bric">{report!.videos}</span>

                </div>

                <div className="w-full flex items-center justify-between">

                    <div className="flex items-center gap-1">
                        <HiOutlineDocumentText className="text-lg text-purple-500"/>
                        <span className="text-md font-sora text-purple-600">Books</span>
                    </div>

                    <hr className="border-gray-400 w-full mx-4"/>

                    <span className="text-2xl text-purple-600 font-bric">{report!.books}</span>

                </div>

                <div className="w-full flex flex-col gap-1 items-start">

                    <div className="flex items-center gap-1">
                        <HiOutlineChatBubbleLeft className="text-lg text-orange-500"/>
                        <span className="text-md font-sora text-orange-600">Comment:</span>
                        {/* <hr className="border-gray-400 w-full mx-4"/> */}
                    </div>

                    <span className="text-sm text-blue font-sora">{report!.comment}</span>

                </div>

            </div>

        </div>

    </div>
  )
}
