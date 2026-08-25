// src/services/auth.service.ts
import api from "./api"; // Seu arquivo axios configurado
import { type LoginFormData, type SignUpFormData } from "../validations/auth.schema";

export async function loginService(data: LoginFormData) {
    const response = await api.post("/login", data);
    if (response.data.token || response.data.userId) {
        localStorage.setItem("@Furniro:token", response.data.token || "authenticated");
    }
    return response.data;
}

export async function signUpService(data: SignUpFormData) {
    const response = await api.post("/signup", {
        email: data.email,
        password: data.password,
    });
    return response.data;
}

export function isAuthenticated(): boolean {
    const token = localStorage.getItem("@Furniro:token");
    return !!token;
}