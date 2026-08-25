import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const signUpSchema = z.object({
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;