import type { ReactNode } from "react";
import Logo from "../Logo";

type AuthLayoutProps = {
    children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
            <div className="hidden md:block relative bg-[#FAF4ED]">
                <img
                    src="../../../public/Images/Hero.jpg"
                    alt="Interior Design"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col justify-center items-center p-8 md:p-12">
                <div className="w-full max-w-[320px] space-y-6">
                    <div className="flex flex-col items-center">
                        <Logo />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;