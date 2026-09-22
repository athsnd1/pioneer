import { BiEditAlt, BiTrash } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { HiOutlineBookOpen, HiOutlineClock, HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlineCalendarDays, HiOutlinePlayCircle } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { formatDate } from "../utils/formatDate";

type Props = {
    id: string;
    hours: number;
    visits: number;
    studies: number;
    videos: number;
    books: number;
    date: string;
    onDelete: () => void;
    onShow: () => void;
}

export default function ReportCard({id, hours = 0, visits = 0, studies = 0, videos = 0, books = 0, date = "1/1/26", onDelete, onShow }: Props) {

    const navigate = useNavigate();

  return (
    <div className=" rounded-xl bg-[var(--card-color)] font-[family-name:var(--sora)] flex sm:items-center md:flex-col md:items-center  justify-between w-full h-max border-1 border-gray-300 cursor-pointer hover:bg-gray-100  overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-none transition-all" onClick={onShow}>

        <div className="flex flex-col md:flex-row items-start gap-3 w-full justify-between p-3">

            <div className="text-amber-600 font-normal flex items-center gap-0.5"> 
                <span className="text-amber-500 text-3xl"> <HiOutlineClock /> </span>{ hours }hrs
            </div>

            <div className="text-indigo-600 font-normal flex items-center gap-0.5"> 
                <span className="text-indigo-500 text-3xl"> <BsPeople /> </span>{ visits }RVs
            </div>

            <div className="text-emerald-600 font-normal flex items-center gap-0.5"> 
                <span className="text-emerald-500 text-3xl"> <HiOutlineBookOpen /> </span>{ studies }BSts
            </div>

        </div>

        <div className="flex flex-col md:flex-row items-start gap-3 w-full justify-between p-3">

            <div className="text-sky-600 font-normal flex items-center gap-0.5"> 
                <span className="text-sky-500 text-3xl"> <HiOutlinePlayCircle /> </span>{ videos }Vids
            </div>

            <div className="text-purple-600 font-normal flex items-center gap-0.5"> 
                <span className="text-purple-500 text-3xl"> <HiOutlineDocumentText /> </span>{ books } books
            </div>

            <div className="text-slate-600 font-normal flex items-center gap-0.5"> 
                <span className="text-slate-500 text-3xl"> <HiOutlineCalendarDays /> </span>{ formatDate(date) }
            </div>

        </div>

        <div className="hover:opacity-85 transition-all flex flex-col md:flex-row items-center justify-center gap-5 w-full md:border-t-1 border-gray-300 md:p-3" >
            <BiTrash className="text-2xl text-red-700 hover:scale-101" onClick={(e) => { e.stopPropagation(); onDelete(); }}/>
            <BiEditAlt className="text-2xl text-orange-600 hover:scale-101" onClick={(e) => { e.stopPropagation(); navigate(`/edit/${id}`);}}/>
        </div>

    </div>
  )
}
