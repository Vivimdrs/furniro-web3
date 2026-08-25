import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
    iconSrc: string;
    error?: string;
    registration: UseFormRegisterReturn;
};

const AuthInput = ({ iconSrc, error, registration, placeholder, type = "text" }: AuthInputProps) => {
    return (
        <div>
            <div className="relative flex items-center">
                <input
                    type={type}
                    placeholder={placeholder}
                    {...registration}
                    className="w-full bg-[#F4F5F7] border border-transparent rounded px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300"
                />
                <img src={iconSrc} alt="Ícone do campo" className="absolute right-4 text-gray-400 text-base w-4" />
            </div>
            {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
        </div>
    );
};

export default AuthInput;