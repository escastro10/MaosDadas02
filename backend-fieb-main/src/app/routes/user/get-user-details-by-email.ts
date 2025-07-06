import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getUserDetailsByEmail(app: FastifyInstance) {

    const params = z.object({
        email: z.string(),
    })

    app.get('/user/:email', async (req, res) => {

        const { email } = params.parse(req.params);

        const user = await prisma.user.findFirst({
            where: {
                email
            },
        })

        return res.send(user);

    })

}