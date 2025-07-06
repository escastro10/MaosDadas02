import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function updateProfile(app: FastifyInstance) {
    const params = z.object({
        id: z.string()
    })

    const body = z.object({
        name: z.string(),
        email: z.string().email()
    })

    app.put("/user/:id", async (req, res) => {
        const { id } = params.parse(req.params)
        const { name, email } = body.parse(req.body)

        const update = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email
            }
        })

        return res.send(update)
    })
}