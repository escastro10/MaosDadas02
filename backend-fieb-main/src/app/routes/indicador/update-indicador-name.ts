import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function updateIndicadorName(app: FastifyInstance) {

    const params = z.object({
        id: z.string()
    })

    const body = z.object({
        pergunta: z.string()
    })

    app.put('/indicador/:id/name', async (req, res) => {

        const { id } = params.parse(req.params)
        const { pergunta } = body.parse(req.body)

        const indicador = await prisma.indicador.update({
            where: { id },
            data: { pergunta }
        })

        res.send(indicador)
    })

}