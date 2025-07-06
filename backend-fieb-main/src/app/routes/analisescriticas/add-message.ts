import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function addMessage(app: FastifyInstance) {

    const params = z.object({
        analiseCriticaId: z.string(),
    })
    const body = z.object({
        userId: z.string(),
        message: z.string(),
    })

    app.post('/analisescriticas/:analiseCriticaId/message', async (req, res) => {

        const { analiseCriticaId } = params.parse(req.params)
        const { userId, message } = body.parse(req.body)

        const addMessage = await prisma.message.create({
            data: {
                analisecriticaId: analiseCriticaId,
                userId,
                message
            }
        })

        return res.status(201).send(addMessage)

    })
}