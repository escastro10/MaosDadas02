import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

import { z } from "zod";

export async function createAnaliseCritica(app: FastifyInstance) {

    const schema = z.object({
        indicadorId: z.string(),
    })

    app.post('/analisesCriticas', async (req, res) => {

        const { indicadorId } = schema.parse(req.body)

        const autoavaliacao = await prisma.analiseCritica.create({
            data: {
                indicadorId
            }
        })

        return res.status(201).send(autoavaliacao)
    })

}