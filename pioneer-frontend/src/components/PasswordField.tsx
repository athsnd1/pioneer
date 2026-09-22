import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
    onChange: (password: string) => void;
}

export default function PasswordField({ onChange }: Props) {

    const [password, setPassword] = useState<string>("");
    const [passShowing, setPassShowing] = useState<boolean>(false);
    const [passwordMust, setPasswordMust] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

    const { value } = e.target;

      const parent = e.target.parentElement;

      if (value.length < 8) {

        if (!parent) return

        parent.style.borderColor = "red";
        setPasswordMust("Password must be at least 8 characters long");

      } else if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {

        if (!parent) return

        parent.style.borderColor = "red";
        setPasswordMust("Password must contain at least one uppercase letter, one lowercase letter, and one number");

      } else {

        if (!parent) return

        parent.style.borderColor = "var(--main-color)";
        setPasswordMust("");

      }
    }

  useEffect(() => {
    onChange(password);
  }, [password, onChange]);

  return (
    <div>
        <div className="flex items-center justify-between gap-0.5 px-2 max-w-70 outline-0 border border-gray-500 hover:border-[var(--main-color)] focus-within:border-[var(--main-color)] bg-white h-max rounded-md">
          
            <input name="password" value={password} type={passShowing ? "text" : "password"} onChange={(e) => { setPassword(e.target.value); handleInputChange(e)}} tabIndex={0} className=" outline-0 border-0  rounded-md w-75 h-10 bg-white font-[family-name:var(--sora)]" placeholder="*********" autoComplete="current-password"/>

            {passShowing ? <FiEye className="text-[var(--main-color)] cursor-pointer transition" onClick={() => {setPassShowing(!passShowing)}}/> : <FiEyeOff className="text-[var(--main-color)] cursor-pointer transition" onClick={() => {setPassShowing((prev) => !prev)}}/>}

        </div>

        { passwordMust && <div className="text-red-500 text-sm mt-1 w-75">{passwordMust}</div> }
    </div>
  )
}
