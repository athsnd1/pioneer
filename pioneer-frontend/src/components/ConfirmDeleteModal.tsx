import { HiXMark } from "react-icons/hi2";

type Props = {
    onClose: () => void;
    onRemoveReport: () => void;
    text?: string;
    btnText?: string;
}

export default function ConfirmDeleteModal({ onClose, onRemoveReport, text, btnText }: Props) {


  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/10 backdrop-blur-sm z-100">

        <div className="h-max w-full max-w-75 sm:max-w-100 rounded-2xl border-1 border-gray-400 shadow-sm fixed top-1/2 left-1/2 -translate-1/2 bg-white">
            <div className="flex items-center justify-between p-3 border-b-1 border-gray-400">
                <div className="text-md text-main font-[family-name:var(--bric)]">Confirm Action</div>
                <div className="hover:bg-gray-100 hover:scale-95 p-1 cursor-pointer transition-all rounded-md">
                    <HiXMark className="text-xl text-blue" onClick={onClose}/>
                </div>
            </div>

            <div className="text-lg text-main p-3 text-center font-sora">{text ? text : "Are you sure you want to delete this report?"}</div>
            
            <div className="w-full flex items-center justify-center gap-4 pb-4">
                <button className="bg-red-700 text-white font-sora h-10 w-max p-2 border-0 rounded-lg cursor-pointer hover:opacity-85" onClick={() => {onClose(); onRemoveReport();}}>{ btnText ? btnText : "Delete" }</button>
                <button className="bg-gray-300 text-stone-900 font-sora h-10 w-max p-2 border-0 rounded-lg cursor-pointer hover:opacity-85" onClick={onClose}>Cancel</button>
            </div>
        </div>

    </div>
  )
}
