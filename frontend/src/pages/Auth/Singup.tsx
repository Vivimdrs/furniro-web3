import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { signUpSchema, type SignUpFormData } from "../../validations/auth.schema";
import { signUpService } from "../../services/auth.service";
import AuthLayout from "../../components/AuthLayout";
import AuthInput from "../../components/AuthInput";

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            setLoading(true);
            await signUpService(data);
            toast.success("Conta criada com sucesso! Faça login.");
            navigate("/login");
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Erro ao criar conta.");
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

                <AuthInput
                    type="password"
                    placeholder="confirm password"
                    iconSrc="../../../public/Icons/eye.svg"
                    registration={register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded text-xs font-semibold tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 mt-2"
                >
                    {loading ? "CADASTRANDO..." : "Sign up"}
                </button>
            </form>

            <p className="text-center text-xs text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-black font-bold underline">
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
};

export default SignUp;