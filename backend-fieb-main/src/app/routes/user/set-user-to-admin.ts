import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function setUserToAdmin(app: FastifyInstance) {

    const params = z.object({
        userId: z.string(),
    })

    const body = z.object({
        state: z.boolean()
    })

    app.put('/user/:userId/admin', async (req, res) => {

        const { userId } = params.parse(req.params);
        const { state } = body.parse(req.body);

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                isAdmin: state
            }
        })

        return res.send(user);

    })
}