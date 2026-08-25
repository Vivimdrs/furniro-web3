import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { PrismaUserRepository } from '../repositories/prisma.user.repository.js';

export class AuthService {
    constructor(private userRepository: PrismaUserRepository) {}

    async login(email: string, pass: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("E-mail ou senha inválidos.");
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password);

        if (!isPasswordValid) {
            throw new Error("E-mail ou senha inválidos.");
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || "segredo-super-secreto",
            { expiresIn: "1d" }
        );

        return { token, user: { id: user.id, email: user.email } };
    }

    async signUp(email: string, pass: string) {
        const userExists = await this.userRepository.findByEmail(email);
        
        if (userExists) {
            throw new Error("E-mail já cadastrado.");
        }

        const hashedPassword = await bcrypt.hash(pass, 10);

        const newUser = await this.userRepository.create({
            email,
            password: hashedPassword,
        });

        return { message: "Usuário criado com sucesso!", userId: newUser.id };
    }
}