import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
    constructor(private authService: AuthService) {}

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message || "Erro ao realizar login." });
        }
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.signUp(email, password);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message || "Erro ao criar usuário." });
        }
    }
}