import { type UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    registration: UseFormRegisterReturn;
    error?: string;
    rows?: number; 
}

export const InputField = ({
    label,
    type = "text",
    placeholder,
    registration,
    error,
    rows,
}: InputFieldProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-black">{label}</label>
            
            {rows ? (
                <textarea
                    rows={rows}
                    placeholder={placeholder}
                    {...registration}
                    className={`w-full border rounded-lg p-3 text-sm outline-none resize-none transition-colors ${
                        error ? "border-red-500" : "border-gray-300 focus:border-black"
                    }`}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    {...registration}
                    className={`w-full border rounded-lg p-3 text-sm outline-none transition-colors ${
                        error ? "border-red-500" : "border-gray-300 focus:border-black"
                    }`}
                />
            )}

            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};