import { BsHouseDoor, BsPerson } from 'react-icons/bs';
import { TbAddressBook } from 'react-icons/tb';
import { BiEditAlt, BiPhoneCall } from 'react-icons/bi';
import { HiTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router';

type Props = {
    name: string;
    address: string;
    phone: string;
    onDelete: () => void;
    onShow: () => void;
    studentId: string;
};

export default function StudentCard({ name = "Student", address = "1 House Rd", phone = "+123-456-7890", onDelete, onShow, studentId }: Props) {

    const navigate = useNavigate();

  return (
    <div className="rounded-xl bg-[var(--card-color)] p-2 py-4 font-sora flex flex-col sm:flex-row items-center gap-5 h-max w-full border-1 boder-gray-300 pl-6 cursor-pointer hover:bg-gray-100 hover:opacity-65 hover:border-gray-300 transition-all" onClick={onShow}>

        <BsPerson className="text-4xl text-gray-400 w-[80px] h-[80px] p-2 border-1 border-gray-300 rounded-xl"/>

        <div className='flex items-center gap-5'>
             <div className='border-right-1 border-gray-300'>
                <div className="flex items-center gap-1 text-md">
                    <TbAddressBook className="text-orange-500"/>
                    <span className="text-orange-700">{name.length > 15 ? name.slice(0, 14) + "..." : name}</span>
                </div>

                <div className="flex items-center gap-1 text-md">
                    <BsHouseDoor className="text-emerald-500"/>
                    <span className="text-emerald-700">{address.length > 15 ? address.slice(0, 14) + "..." : address}</span>
                </div>

                <div className="flex items-center gap-1 text-md">
                    <BiPhoneCall className="text-indigo-500"/>
                    <span className="text-indigo-700">{phone}</span>
                </div>
            </div>

            <div className="border-l-1 border-gray-300 h-full pl-4 flex flex-col items-center gap-3">

                <HiTrash className="text-red-700 text-xl w-[24px] h-[24px] cursor-pointer hover:opacity-85 hover:scale-95" onClick={(e) => {e.stopPropagation(); onDelete();}}/>

                <BiEditAlt className="text-green-700 text-xl w-[24px] h-[24px] cursor-pointer hover:opacity-85 hover:scale-95" onClick={(e) => {e.stopPropagation(); navigate(`/edit-student/${studentId}`)}}/>

            </div>
        </div>

    </div>
  )
}
