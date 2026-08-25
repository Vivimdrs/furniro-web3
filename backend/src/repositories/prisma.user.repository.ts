import { PrismaClient } from '@prisma/client';

export class PrismaUserRepository {
    constructor(private prisma: PrismaClient) {}

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }

    async create(data: { email: string; password: string }) {
        return await this.prisma.user.create({
            data,
        });
    }
}