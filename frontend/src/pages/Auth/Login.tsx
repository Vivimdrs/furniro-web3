import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { loginSchema, type LoginFormData } from "../../validations/auth.schema";
import { loginService } from "../../services/auth.service";
import AuthLayout from "../../components/AuthLayout";
import AuthInput from "../../components/AuthInput";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const from = (location.state as any)?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setLoading(true);
            await loginService(data);
            toast.success("Login realizado com sucesso!");
            navigate(from, { replace: true });
        } catch (err: any) {
            toast.error(err.response?.data?.error || "E-mail ou senha inválidos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <AuthInput
                    type="email"
                    placeholder="email"
                    iconSrc="../../../public/Icons/icon.svg"
                    registration={register("email")}
                    error={errors.email?.message}
                />

                <AuthInput
                    type="password"
                    placeholder="password"
                    iconSrc="../../../public/Icons/eye.svg"
                    registration={register("password")}
                    error={errors.password?.message}
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded text-xs font-semibold tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 mt-2"
                >
                    {loading ? "CADASTRANDO..." : "Login"}
                </button>
            </form>

            <p className="text-center text-xs text-gray-500">
                Already have an account?{" "}
                <Link to="/signup" className="text-black font-bold underline">
                    Sing up
                </Link>
            </p>
        </AuthLayout>
    );
};

export default Login;