import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function getUsers(app: FastifyInstance) {
    app.get('/users', async (req, res) => {
        const users = await prisma.user.findMany();
        return res.send(users);
    })
}